import { useState, useEffect } from "react";
import { LOOP_DELAY } from "../constants";
import { Status } from "./useStatus";

export const useTimer = (status: Status) => {
  const [loopDelay, setLoopDelay] = useState(LOOP_DELAY);

  useEffect(() => {
    if (status === "finished") {
      setLoopDelay(0);
    }
    if (status === "initialized") {
      setLoopDelay(LOOP_DELAY);
    }
  }, [status]);

  const timer = () => new Promise((resolve) => setTimeout(resolve, loopDelay));

  return { timer };
};
