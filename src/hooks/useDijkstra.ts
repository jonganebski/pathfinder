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

  const trackDown = (cell: TCell) => {
    for (let i = 0; i < field.flat().length; i++) {
      const cellBefore = field[cell.before[0]][cell.before[1]];
      cell.isTrack = true;
      console.log(cellBefore);
      setField([...field]);
      if (cellBefore.isStartPoint) {
        return true;
      }
      const isFinished = trackDown(cellBefore);
      if (isFinished) {
        return true;
      }
    }
  };

  const startDijkstra = async () => {
    for (let i = 0; i < field.flat().length; i++) {
      console.log("for loop");
      const checked: number[][] = [];
      for (let j = 0; j < borderCoords.length; j++) {
        const borderCoord = borderCoords[j];
        const uncheckedCoords = getUncheckedCells(borderCoord);
        for (let k = 0; k < uncheckedCoords.length; k++) {
          const coord = uncheckedCoords[k];
          const cell = field[coord[0]][coord[1]];
          if (cell.isBlocked) continue;
          cell.isChecked = true;
          cell.before = borderCoord;
          setField([...field]);
          if (cell.isEndPoint) {
            trackDown(cell);
            return;
          }
          checked.push(coord);
          await timer(LOOP_DELAY);
        }
      }
      borderCoords = checked;
    }
  };

  return [startDijkstra];
};
