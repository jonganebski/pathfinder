import { useState } from "react";
import { END } from "../constants";

export const useEndPoint = (): [number[]] => {
  const [endCoord, setEndCoord] = useState(END);

  return [endCoord];
};
