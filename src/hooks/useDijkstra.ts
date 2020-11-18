import { useEffect, useState } from "react";
import { LOOP_DELAY } from "../constants";
import { NodeService } from "./useNode";
import { Status } from "./useStatus";

export const useDijkstra = (
  grid: NodeService[][],
  setGrid: React.Dispatch<React.SetStateAction<NodeService[][]>>,
  status: Status,
  setStatus: React.Dispatch<React.SetStateAction<Status>>
) => {
  const [loopDelay, setLoopDelay] = useState(LOOP_DELAY);

  useEffect(() => {
    if (status === "finished") {
      setLoopDelay(0);
    }
    if (status === "initialized") {
      setLoopDelay(LOOP_DELAY);
    }
  }, [status]);

  const timer = () => new Promise((resolve) => setTimeout(resolve, loopDelay));

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
      if (loopDelay !== 0) {
        await timer();
      }
    }
    return;
  };

  const startDijkstra = async () => {
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
      closestNode.updateDistanceOfUnvisitedNeighbors(grid, closestNode);
      setGrid([...grid]);
      if (loopDelay !== 0) {
        await timer();
      }
    }
  };

  return { startDijkstra };
};
