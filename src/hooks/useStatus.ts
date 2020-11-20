import { useEffect, useState } from "react";
import { NodeService } from "./useNode";

export type Status = "initialized" | "running" | "finished";

export const useStatus = (
  grid: NodeService[][],
  setGrid: React.Dispatch<React.SetStateAction<NodeService[][]>>,
  initializeGrid: () => void
) => {
  const [status, setStatus] = useState<Status>("initialized");

  useEffect(() => {
    setStatus("initialized");
  }, []);

  const onClickStart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    algorithmFn: (() => Promise<void>) | undefined
  ) => {
    if (algorithmFn === undefined) {
      alert("Please choose an algorithm.");
      return;
    }
    e.preventDefault();
    setStatus((prev) => {
      if (prev === "initialized") {
        algorithmFn();
        return "running";
      }
      if (prev === "finished") {
        grid.flat().forEach((node) => {
          node.isPath = false;
          node.isVisited = false;
          node.previousNode = null;
          node.distance = Infinity;
          node.heuristicDistance = Infinity;
        });
        return "initialized";
      }
      return prev;
    });
  };

  const onClickInitialize = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    initializeGrid();
    setStatus("initialized");
  };

  return { status, setStatus, onClickStart, onClickInitialize };
};
