import { useState } from "react";
import { START } from "../constants";

export const useStartPoint = (): [number[]] => {
  const [startCoord, setStartCoord] = useState(START);

  return [startCoord];
};
