import { useCallback, useState } from "react";
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

  const timer = () => new Promise((resolve) => setTimeout(resolve, LOOP_DELAY));

  const sortByDistance = (flatGrid: NodeService[]) =>
    flatGrid.sort((a, b) => a.distance - b.distance);

  const startDijkstra = useCallback(async () => {
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
        return visitedNodes;
      }
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      if (closestNode.isEnd) {
        setStatus("finished");
        console.log(visitedNodes);
        return visitedNodes;
      }
      closestNode.updateDistanceOfUnvisitedNeighbors(grid, closestNode);
      setGrid([...grid]);
      if (loopDelay !== 0) {
        await timer();
      }
    }
  }, [grid, loopDelay, setGrid, setStatus]);

  return { startDijkstra };
};
