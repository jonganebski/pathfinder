import { NodeService } from "./useNode";
import { Status } from "./useStatus";
import { timer } from "../utils";
import { LOOP_DELAY } from "../constants";

export const useAStar = (
  grid: NodeService[][],
  setGrid: React.Dispatch<React.SetStateAction<NodeService[][]>>,
  status: Status,
  setStatus: React.Dispatch<React.SetStateAction<Status>>,
  isLoopDelay: boolean
) => {
  const sortByDistance = (flatGrid: NodeService[]) =>
    flatGrid.sort((a, b) => {
      let compare;
      compare = a.heuristicDistance - b.heuristicDistance;
      if (compare === 0) {
        compare = a.distance - b.distance;
      }
      return compare;
    });

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

  const getManhattanDistance = (NodeA: NodeService, NodeB: NodeService) => {
    const row = Math.abs(NodeA.rowIdx - NodeB.rowIdx);
    const col = Math.abs(NodeA.colIdx - NodeB.colIdx);

    return Math.sqrt(Math.pow(row, 2) + Math.pow(col, 2));
  };

  const runAStar = async () => {
    const unvisitedNodes = grid.flat();
    const visitedNodes: NodeService[] = [];
    const startNode = unvisitedNodes.find((node) => node.isStart);
    const endNode = unvisitedNodes.find((node) => node.isEnd);
    if (!startNode) {
      console.error("Cannot find starting point");
      return;
    }
    if (!endNode) {
      console.error("Caanot find end point");
      return;
    }
    startNode.distance = 0;
    startNode.heuristicDistance = 0;
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
        const heuristic = getManhattanDistance(node, endNode);
        node.distance = closestNode.distance + 1 + heuristic;
        node.heuristicDistance = heuristic;
        node.previousNode = closestNode;
      });
      setGrid([...grid]);
      if (isLoopDelay && status !== "finished") {
        await timer(LOOP_DELAY);
      }
    }
  };

  return { runAStar };
};
