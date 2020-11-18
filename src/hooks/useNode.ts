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
  previousNode: NodeService | null = null;

  getValue() {
    if (this.isStart) {
      return this.startValue;
    }
    if (this.isEnd) {
      return this.endValue;
    }
    return null;
  }

  private getUnvisitedNeighbors(grid: NodeService[][]) {
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

  updateDistanceOfUnvisitedNeighbors(
    grid: NodeService[][],
    previousNode: NodeService
  ) {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(grid);
    unvisitedNeighbors.forEach((node) => {
      node.distance = previousNode.distance + 1;
      node.previousNode = previousNode;
    });
  }
}

export const useNode = (
  NodeService: NodeService,
  movingStartPoint: boolean,
  setMovingStartPoint: React.Dispatch<React.SetStateAction<boolean>>,
  movingEndPoint: boolean,
  setMovingEndPoint: React.Dispatch<React.SetStateAction<boolean>>,
  setGrid: React.Dispatch<React.SetStateAction<NodeService[][]>>,
  lastStartNode: React.MutableRefObject<NodeService | undefined>,
  lastEndNode: React.MutableRefObject<NodeService | undefined>
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

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.buttons === 1) {
    }
    setGrid((prev) => [...prev!]);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (e.buttons === 1) {
      if (movingStartPoint && lastStartNode.current) {
        NodeService.isStart = true;
        lastStartNode.current.isStart = false;
        lastStartNode.current = NodeService;
      } else if (movingEndPoint && lastEndNode.current) {
        NodeService.isEnd = true;
        lastEndNode.current.isEnd = false;
        lastEndNode.current = NodeService;
      } else {
        NodeService.isBlocked = true;
      }
    }
    setGrid((prev) => [...prev!]);
  };

  return { onMouseDown, onMouseUp, onMouseLeave, onMouseEnter };
};
