import { useState } from "react";

export type Algorithm = "Dijkstra" | "AStar" | null;

export const useChooseAlgorithm = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>(null);

  return { algorithm, setAlgorithm };
};
