import { TCell } from "./useField";

export const useDijkstra = (
  startCoord: number[],
  endCoord: number[],
  field: TCell[][]
): [string] => {
  let borderCells: number[][] = [[startCoord[0], startCoord[1]]];

  const getUncheckedCells = (coord: number[]) => {
    const aroundCells: number[][] = [];
    aroundCells.push([coord[0] + 1, coord[1]]);
    aroundCells.push([coord[0] - 1, coord[1]]);
    aroundCells.push([coord[0], coord[1] + 1]);
    aroundCells.push([coord[0], coord[1] - 1]);
    return aroundCells.filter(
      ([row, col]) => field[row][col].isChecked === false
    );
  };

  for (let i = 0; i < 6; i++) {
    const checked: number[][] = [];
    borderCells.forEach((coord) =>
      getUncheckedCells(coord).forEach((coord) => {
        field[coord[0]][coord[1]].isChecked = true;
        checked.push(coord);
      })
    );
    borderCells = checked;
  }

  return ["foo"];
};
