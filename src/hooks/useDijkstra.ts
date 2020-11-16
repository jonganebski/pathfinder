import { useEffect, useState } from "react";
import { NodeProps } from "../Components/Node";
import { COLS, LOOP_DELAY, ROWS } from "../constants";
import { TStatus } from "./useStatus";

export const useDijkstra = (
  startCoord: number[],
  endCoord: number[],
  field: NodeProps[][],
  setField: React.Dispatch<React.SetStateAction<NodeProps[][]>>,
  status: TStatus,
  setStatus: React.Dispatch<React.SetStateAction<TStatus>>
): [() => void] => {
  const [loopDelay, setLoopDelay] = useState<number>(0);

  useEffect(() => {
    if (status === "finished") {
      setLoopDelay(0);
    } else if (status === "initialized") {
      setLoopDelay(LOOP_DELAY);
    }
  }, [status]);

  // ------------ SUB FUCTIONS ------------

  const timer = () => new Promise((resolve) => setTimeout(resolve, loopDelay));

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
        const node = field[coord[0]][coord[1]];
        return node.isChecked === false;
      } else {
        return false;
      }
    });
  };

  const trackDown = (node: NodeProps) => {
    // This is back tracking function
    for (let i = 0; i < field.flat().length; i++) {
      const cellBefore = field[node.before[0]][node.before[1]];
      node.isTrack = true;
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
    if (status !== "finished") {
      setStatus("running");
    }
    let borderCoords: number[][] = [[startCoord[0], startCoord[1]]];
    for (let i = 0; i < field.flat().length; i++) {
      console.log("for loop");
      const checked: number[][] = [];
      for (let j = 0; j < borderCoords.length; j++) {
        // Loop for cells on the border.
        const borderCoord = borderCoords[j];
        const uncheckedCoords = getUncheckedCells(borderCoord);
        for (let k = 0; k < uncheckedCoords.length; k++) {
          // Loop for unchecked cells around each border node.
          const coord = uncheckedCoords[k];
          const uncheckedCell = field[coord[0]][coord[1]];
          if (uncheckedCell.isBlocked) continue;
          uncheckedCell.isChecked = true;
          uncheckedCell.before = borderCoord;
          setField([...field]);
          if (uncheckedCell.isEndPoint) {
            trackDown(uncheckedCell);
            setStatus("finished");
            return;
          }
          checked.push(coord);
          if (loopDelay !== 0) {
            await timer();
          }
        }
      }
      // Update border cells
      borderCoords = checked;
    }
  };

  return [startDijkstra];
};
