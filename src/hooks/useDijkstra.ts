import { LOOP_DELAY } from "../constants";
import { timer } from "../utils";
import { NodeService } from "./useNode";
import { Status } from "./useStatus";

export const useDijkstra = (
  grid: NodeService[][],
  setGrid: React.Dispatch<React.SetStateAction<NodeService[][]>>,
  status: Status,
  setStatus: React.Dispatch<React.SetStateAction<Status>>,
  isLoopDelay: boolean
) => {
  const sortByDistance = (flatGrid: NodeService[]) =>
    flatGrid.sort((a, b) => a.distance - b.distance);

  const getShortestPath = async (endNode: NodeService) => {
    const pathNodes: NodeService[] = [];
    let currentNode = endNode;
    while (currentNode.previousNode !== null) {
      pathNodes.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    for (let i = 0; i < pathNodes.length; i++) {
      pathNodes[i].isPath = true;
      setGrid([...grid]);
      if (isLoopDelay && status !== "finished") {
        await timer(LOOP_DELAY);
      }
    }
    return;
  };

  const runDijkstra = async () => {
    const visitedNodes: NodeService[] = [];
    const unvisitedNodes = grid.flat();
    const startNode = unvisitedNodes.find((node) => node.isStart);
    if (!startNode) {
      console.error("Cannot find starting point");
      return;
    }
    startNode!.distance = 0;
    while (unvisitedNodes.length !== 0) {
      sortByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (!closestNode) {
        console.error("The closest node doesn't exist");
        return;
      }
      if (closestNode.isBlocked) {
        continue;
      }
      if (closestNode.distance === Infinity) {
        setStatus("finished");
        return;
      }
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      if (closestNode.isEnd) {
        await getShortestPath(closestNode);
        setStatus("finished");
        return;
      }
      const unvisitedNeighbors = closestNode.getUnvisitedNeighbors(grid);
      unvisitedNeighbors.forEach((node) => {
        node.distance = closestNode.distance + 1;
        node.previousNode = closestNode;
      });
      setGrid([...grid]);
      if (isLoopDelay && status !== "finished") {
        await timer(LOOP_DELAY);
      }
    }
  };

  return { runDijkstra };
};
