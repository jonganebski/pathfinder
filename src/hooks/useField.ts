import { useEffect, useState } from "react";
import { ICellProps } from "../Components/Home";
import { ROWS, COLS, START, END } from "../constants";

export type TCell = ICellProps;

const getInitialField = () => {
  const cellObj = {
    isChecked: false,
    isBlocked: false,
    isStartPoint: false,
    isEndPoint: false,
    isTrack: false,
    before: [],
  };
  const baseArr: number[][] = Array(ROWS).fill(Array(COLS).fill(0));

  const initialField: TCell[][] = baseArr.map((row) =>
    row.map(() => ({ ...cellObj }))
  );
  initialField[START[0]][START[1]].isStartPoint = true;
  initialField[END[0]][END[1]].isEndPoint = true;

  return initialField;
};

export const useField = (): [
  TCell[][],
  React.Dispatch<React.SetStateAction<ICellProps[][]>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [field, setField] = useState<ICellProps[][]>([]);
  const [isInitialized, SetIsInitialized] = useState(true);

  useEffect(() => {
    if (isInitialized) {
      setField(getInitialField);
    }
  }, [isInitialized]);

  return [field, setField, isInitialized, SetIsInitialized];
};
