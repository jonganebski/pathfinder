import { NodeService } from "./useNode";

export const useManhattanDistance = (
  NodeA: NodeService,
  NodeB: NodeService
) => {
  const distance =
    Math.abs(NodeA.rowIdx - NodeB.rowIdx) +
    Math.abs(NodeB.colIdx - NodeB.colIdx);

  return distance;
};
