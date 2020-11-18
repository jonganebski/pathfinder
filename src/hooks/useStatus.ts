import { useEffect, useState } from "react";

export type Status = "initialized" | "running" | "finished";

export const useStatus = (generateGrid: () => void) => {
  const [status, setStatus] = useState<Status>("initialized");

  useEffect(() => {
    setStatus("initialized");
  }, []);

  const onClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    algorithmFn: () => Promise<void>
  ) => {
    e.preventDefault();
    setStatus((prev) => {
      if (prev === "initialized") {
        algorithmFn();
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
