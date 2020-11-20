import { LOOP_DELAY } from "../constants";
import { timer } from "../utils";
import { NodeService } from "./useNode";
import { Status } from "./useStatus";

export const useMaze = (
  setStatus: React.Dispatch<React.SetStateAction<Status>>,
  grid: NodeService[][],
  setGrid: React.Dispatch<React.SetStateAction<NodeService[][]>>,
  isLoopDelay: boolean
) => {
  const replaceEndNode = (endNode: NodeService, grid: NodeService[][]) => {
    const neighbors = endNode.getNeighbors(grid, 1);
    for (const node of neighbors) {
      if (!node.isBlocked && !node.isStart) {
        endNode.isEnd = false;
        node.isEnd = true;
        return;
      }
    }
    for (const node of neighbors) {
      replaceEndNode(node, grid);
    }
  };

  const generateMaze = async () => {
    if (grid.length === 0) {
      return;
    }
    setStatus("running");
    grid.forEach((row) =>
      row.forEach((node) => {
        node.isBlocked = true;
        node.isPath = false;
        node.isVisited = false;
        node.distance = Infinity;
        node.heuristicDistance = Infinity;
      })
    );
    const flatGrid = grid.flat();
    let currentNode = flatGrid.find((node) => node.isStart);
    if (!currentNode) {
      console.error("There is no starting point on the grid");
      return;
    }
    currentNode.isBlocked = false;
    let passedNodes: NodeService[] = [currentNode];
    while (passedNodes.length !== 0) {
      if (!currentNode) {
        console.error("There is no starting point on the grid");
        return;
      }
      const remoteNeighbors: NodeService[] = currentNode.getNeighbors(grid, 2);
      const blockedRemoteNeighbors = remoteNeighbors.filter((node) => {
        if (!node) {
          return true;
        }
        return node.isBlocked;
      });
      const len = blockedRemoteNeighbors.length;
      if (len === 0) {
        if (passedNodes.length !== 0) {
          const prevNode = passedNodes[passedNodes.length - 1];
          passedNodes.pop();
          currentNode = prevNode!;
          continue;
        } else {
          break;
        }
      }
      let randIdx: number;
      randIdx = Math.floor(Math.random() * len);
      const remoteNeighbor = blockedRemoteNeighbors[randIdx];
      remoteNeighbor.isBlocked = false;
      currentNode.unblockNodeBetween(grid, remoteNeighbor);
      currentNode = remoteNeighbor;
      passedNodes.push(currentNode);
      setGrid([...grid]);
      if (isLoopDelay) {
        await timer(LOOP_DELAY);
      }
    }
    const endNode = flatGrid.find((node) => node.isEnd);
    if (endNode?.isBlocked) {
      replaceEndNode(endNode, grid);
      setGrid([...grid]);
    }
    setStatus("initialized");
  };

  return { generateMaze };
};
