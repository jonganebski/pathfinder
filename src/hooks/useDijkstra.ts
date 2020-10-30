import { ICellProps } from "../Components/Home";
import { COLS, LOOP_DELAY, ROWS } from "../constants";
import { TCell } from "./useField";

export const useDijkstra = (
  startCoord: number[],
  endCoord: number[],
  field: TCell[][],
  setField: React.Dispatch<React.SetStateAction<ICellProps[][]>>
): [() => void] => {
  let borderCoords: number[][] = [[startCoord[0], startCoord[1]]];

  const timer = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const isInside = (coord: number[]) => {
    const isInsideRows = 0 <= coord[0] && coord[0] < ROWS;
    const isInsideCols = 0 <= coord[1] && coord[1] < COLS;
    return isInsideRows && isInsideCols;
  };

  const getUncheckedCells = (coord: number[]) => {
    const aroundCoords: number[][] = [];
    aroundCoords.push([coord[0] - 1, coord[1]]);
    aroundCoords.push([coord[0], coord[1] + 1]);
    aroundCoords.push([coord[0] + 1, coord[1]]);
    aroundCoords.push([coord[0], coord[1] - 1]);
    return aroundCoords.filter((coord) => {
      if (isInside(coord)) {
        const cell = field[coord[0]][coord[1]];
        return cell.isChecked === false;
      } else {
        return false;
      }
    });
  };

  const startDijkstra = async () => {
    for (let i = 0; i < 18; i++) {
      console.log("for loop");
      const checked: number[][] = [];
      console.log(borderCoords);
      for (let j = 0; j < borderCoords.length; j++) {
        const uncheckedCoords = getUncheckedCells(borderCoords[j]);
        for (let k = 0; k < uncheckedCoords.length; k++) {
          const coord = uncheckedCoords[k];
          field[coord[0]][coord[1]].isChecked = true;
          setField([...field]);
          checked.push(coord);
          await timer(LOOP_DELAY);
        }
      }
      borderCoords = checked;
    }
  };

  return [startDijkstra];
};
