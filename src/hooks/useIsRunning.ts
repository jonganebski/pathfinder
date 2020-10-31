import { useState } from "react";

export const useIsRunning = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [isRunning, setIsRunning] = useState(false);

  return [isRunning, setIsRunning];
};
