import { ICellProps } from "../Components/Home";
import { COLS, LOOP_DELAY, ROWS } from "../constants";
import { TCell } from "./useField";

export const useDijkstra = (
  startCoord: number[],
  endCoord: number[],
  field: TCell[][],
  setField: React.Dispatch<React.SetStateAction<ICellProps[][]>>
): [() => void] => {
  // ------------ SUB FUCTIONS ------------

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
    // This back tracking function
    for (let i = 0; i < field.flat().length; i++) {
      const cellBefore = field[cell.before[0]][cell.before[1]];
      cell.isTrack = true;
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

  // ------------ MAIN FUCTION ------------

  const startDijkstra = async () => {
    let borderCoords: number[][] = [[startCoord[0], startCoord[1]]];
    for (let i = 0; i < field.flat().length; i++) {
      console.log("for loop");
      const checked: number[][] = [];
      for (let j = 0; j < borderCoords.length; j++) {
        // Loop for cells on the border.
        const borderCoord = borderCoords[j];
        const uncheckedCoords = getUncheckedCells(borderCoord);
        for (let k = 0; k < uncheckedCoords.length; k++) {
          // Loop for unchecked cells around each border cell.
          const coord = uncheckedCoords[k];
          const uncheckedCell = field[coord[0]][coord[1]];
          if (uncheckedCell.isBlocked) continue;
          uncheckedCell.isChecked = true;
          uncheckedCell.before = borderCoord;
          setField([...field]);
          if (uncheckedCell.isEndPoint) {
            trackDown(uncheckedCell);
            return;
          }
          checked.push(coord);
          await timer(LOOP_DELAY);
        }
      }
      // Update border cells
      borderCoords = checked;
    }
  };

  return [startDijkstra];
};
