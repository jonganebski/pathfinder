import { useState } from "react";
import { NodeService } from "./useNode";

export type Status = "initialized" | "running" | "finished";

export const useStatus = (generateGrid: () => void) => {
  const [status, setStatus] = useState<Status>("initialized");

  const onClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    algorithmFn: () => Promise<NodeService[] | undefined>
  ) => {
    e.preventDefault();
    setStatus((prev) => {
      if (prev === "initialized") {
        algorithmFn().then((c) => console.log(c));

        return "running";
      } else if (prev === "finished") {
        generateGrid();
        return "initialized";
      } else {
        return prev;
      }
    });
  };

  return { status, setStatus, onClick };
};
