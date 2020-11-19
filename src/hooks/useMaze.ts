import { NodeService } from "./useNode";
import { Status } from "./useStatus";
import { useTimer } from "./useTimer";

export const useMaze = (
  status: Status,
  grid: NodeService[][],
  setGrid: React.Dispatch<React.SetStateAction<NodeService[][]>>,
  runDijkstra: () => Promise<void>
) => {
  const { timer } = useTimer(status);

  const getBorderNodes = () => {
    const borderNodes: NodeService[] = [];
    grid.forEach((row, rowIdx) =>
      row.forEach((node, colIdx) => {
        if (rowIdx === 0 || rowIdx === grid.length - 1) {
          borderNodes.push(node);
        } else {
          if (colIdx === 0 || colIdx === row.length - 1) {
            borderNodes.push(node);
          }
        }
      })
    );
    return borderNodes;
  };

  const generateMaze = async () => {
    if (grid.length !== 0) {
      grid.forEach((row) => row.forEach((node) => (node.isBlocked = true)));
      setGrid([...grid]);
      let currentNode = grid.flat().find((node) => node.isStart);
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
        const remoteNeighbors: NodeService[] = currentNode.getNeighbors(
          grid,
          2
        );
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
        console.log(randIdx);
        const remoteNeighbor = blockedRemoteNeighbors[randIdx];
        console.log(blockedRemoteNeighbors);
        remoteNeighbor.isBlocked = false;
        currentNode.unblockNodeBetween(grid, remoteNeighbor);
        currentNode = remoteNeighbor;
        passedNodes.push(currentNode);
        setGrid([...grid]);
        await timer();
      }
    }
    console.log("done!");
  };

  return { generateMaze };
};
