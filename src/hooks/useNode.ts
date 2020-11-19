import { Status } from "./useStatus";

export class NodeService {
  rowIdx: number;
  colIdx: number;
  constructor(rowIdx: number, colIdx: number) {
    this.rowIdx = rowIdx;
    this.colIdx = colIdx;
  }
  private startValue = "🐮";
  private endValue = "💧";
  isStart = false;
  isEnd = false;
  isBlocked = false;
  isVisited = false;
  distance = Infinity;
  heuristicDistance = Infinity;
  previousNode: NodeService | null = null;
  isPath = false;

  getValue() {
    if (this.isStart) {
      return this.startValue;
    }
    if (this.isEnd) {
      return this.endValue;
    }
    return null;
  }

  getUnvisitedNeighbors(grid: NodeService[][]) {
    const neighbors = [];
    if (0 < this.rowIdx) {
      const neighbor = grid[this.rowIdx - 1][this.colIdx];
      neighbors.push(neighbor);
    }
    if (this.rowIdx < grid.length - 1) {
      const neighbor = grid[this.rowIdx + 1][this.colIdx];
      neighbors.push(neighbor);
    }
    if (0 < this.colIdx) {
      const neighbor = grid[this.rowIdx][this.colIdx - 1];
      neighbors.push(neighbor);
    }
    if (this.colIdx < grid[this.rowIdx].length - 1) {
      const neighbor = grid[this.rowIdx][this.colIdx + 1];
      neighbors.push(neighbor);
    }
    const unvisitedNeighbors = neighbors.filter(
      (node) => !node.isBlocked && !node.isVisited
    );
    return unvisitedNeighbors;
  }
}

export const useNode = (
  grid: NodeService[][],
  NodeService: NodeService,
  movingStartPoint: boolean,
  setMovingStartPoint: React.Dispatch<React.SetStateAction<boolean>>,
  movingEndPoint: boolean,
  setMovingEndPoint: React.Dispatch<React.SetStateAction<boolean>>,
  setGrid: React.Dispatch<React.SetStateAction<NodeService[][]>>,
  lastStartNode: React.MutableRefObject<NodeService | undefined>,
  lastEndNode: React.MutableRefObject<NodeService | undefined>,
  status: Status,
  startDijkstra: () => Promise<void>
) => {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const { isStart, isEnd } = NodeService;
    if (e.button === 0) {
      if (isStart) {
        setMovingStartPoint(true);
        lastStartNode.current = NodeService;
      } else if (isEnd) {
        setMovingEndPoint(true);
        lastEndNode.current = NodeService;
      } else {
        NodeService.isBlocked = true;
      }
    } else if (e.button === 2) {
      NodeService.isBlocked = false;
    }
    setGrid((prev) => [...prev!]);
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setMovingStartPoint(false);
    setMovingEndPoint(false);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.buttons === 1) {
      if (
        movingStartPoint &&
        lastStartNode.current &&
        !NodeService.isEnd &&
        !NodeService.isBlocked
      ) {
        NodeService.isStart = true;
        lastStartNode.current.isStart = false;
        lastStartNode.current = NodeService;
      } else if (
        movingEndPoint &&
        lastEndNode.current &&
        !NodeService.isStart &&
        !NodeService.isBlocked
      ) {
        NodeService.isEnd = true;
        lastEndNode.current.isEnd = false;
        lastEndNode.current = NodeService;
      } else if (!NodeService.isStart && !NodeService.isEnd) {
        NodeService.isBlocked = true;
      }
      if (status === "finished" && (movingStartPoint || movingEndPoint)) {
        grid.forEach((row) =>
          row.forEach((node) => {
            node.isPath = false;
            node.isVisited = false;
            node.previousNode = null;
            node.distance = Infinity;
            node.heuristicDistance = Infinity;
          })
        );
        startDijkstra();
      }
      setGrid((prev) => [...prev!]);
    }
  };

  return { onMouseDown, onMouseUp, onMouseEnter };
};
