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
      let currentNode = grid[10][10];
      currentNode.isBlocked = false;
      for (let i = 0; i < 300; i++) {
        const remoteNeighbors = currentNode.getNeighbors(grid, 2);
        const blockedRemoteNeighbors = remoteNeighbors.filter(
          (node) => node.isBlocked
        );
        const len = blockedRemoteNeighbors.length;
        if (len === 0) {
          break;
        }
        let randIdx: number;
        randIdx = Math.floor(Math.random() * len);
        const remoteNeighbor = blockedRemoteNeighbors[randIdx];
        remoteNeighbor.isBlocked = false;
        currentNode.unblockNodeBetween(grid, remoteNeighbor);
        currentNode = remoteNeighbor;
        setGrid([...grid]);
        await timer();
      }
    }
  };

  return { generateMaze };
};
