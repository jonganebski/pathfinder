import { useState } from "react";

export type TStatus = "initialized" | "running" | "finished";

export const useStatus = (): [
  TStatus,
  React.Dispatch<React.SetStateAction<TStatus>>
] => {
  const [status, setStatus] = useState<TStatus>("initialized");

  return [status, setStatus];
};
