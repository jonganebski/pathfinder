import { useEffect, useState } from "react";
import { NodeProps } from "../Components/Node";
import { ROWS, COLS, START, END } from "../constants";
import { TStatus } from "./useStatus";

const getInitialField = () => {
  const cellObj: NodeProps = {
    distance: Infinity,
    isChecked: false,
    isBlocked: false,
    isStartPoint: false,
    isEndPoint: false,
    isTrack: false,
    before: [],
  };
  const baseArr: number[][] = Array(ROWS).fill(Array(COLS).fill(0));

  const initialField: NodeProps[][] = baseArr.map((row) =>
    row.map(() => ({ ...cellObj }))
  );
  initialField[START[0]][START[1]].isStartPoint = true;
  initialField[END[0]][END[1]].isEndPoint = true;

  return initialField;
};

export const useField = (
  status: TStatus
): [NodeProps[][], React.Dispatch<React.SetStateAction<NodeProps[][]>>] => {
  const [field, setField] = useState<NodeProps[][]>([]);

  useEffect(() => {
    if (status === "initialized") {
      setField(getInitialField);
    }
  }, [status]);

  return [field, setField];
};
