import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-4/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

const partOne = (rows: string[]) => {
  let numAccessibleRolls = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!;
    const rowLen = row.length;

    for (let j = 0; j < rowLen; j++) {
      if (row[j] !== "@") continue;

      let numAdjacentRolls = 0;

      const upperRow = rows[i - 1];
      const lowerRow = rows[i + 1];
      const rightIdx = j + 1;
      const leftIdx = j - 1;

      const isRightEdge = rightIdx === rowLen;
      const isLeftEdge = j === 0;

      // left
      if (!isLeftEdge && row[leftIdx] === "@") numAdjacentRolls++;

      // right
      if (!isRightEdge && row[rightIdx] === "@") numAdjacentRolls++;

      if (upperRow) {
        // upper
        if (upperRow[j] === "@") numAdjacentRolls++;

        // upperleft
        if (!isLeftEdge && upperRow[leftIdx] === "@") numAdjacentRolls++;

        // upperright
        if (!isRightEdge && upperRow[rightIdx] === "@") numAdjacentRolls++;
      }

      if (lowerRow) {
        // lower
        if (lowerRow[j] === "@") numAdjacentRolls++;

        // lowerleft
        if (!isLeftEdge && lowerRow[leftIdx] === "@") numAdjacentRolls++;

        // lowerright
        if (!isRightEdge && lowerRow[rightIdx] === "@") numAdjacentRolls++;
      }

      if (numAdjacentRolls < 4) numAccessibleRolls++;
    }
  }

  return numAccessibleRolls;
};

const partTwo = (rows: string[]) => {
  let numAccessibleRolls = 0;
  let hasRemoved = true;

  while (hasRemoved) {
    hasRemoved = false;

    for (let i = 0; i < rows.length; i++) {
      let row = rows[i]!;
      const rowLen = row.length;

      for (let j = 0; j < rowLen; j++) {
        if (row[j] !== "@") continue;

        let numAdjacentRolls = 0;

        const upperRow = rows[i - 1];
        const lowerRow = rows[i + 1];
        const rightIdx = j + 1;
        const leftIdx = j - 1;

        const isRightEdge = rightIdx === rowLen;
        const isLeftEdge = j === 0;

        // left
        if (!isLeftEdge && row[leftIdx] === "@") numAdjacentRolls++;

        // right
        if (!isRightEdge && row[rightIdx] === "@") numAdjacentRolls++;

        if (upperRow) {
          // upper
          if (upperRow[j] === "@") numAdjacentRolls++;

          // upperleft
          if (!isLeftEdge && upperRow[leftIdx] === "@") numAdjacentRolls++;

          // upperright
          if (!isRightEdge && upperRow[rightIdx] === "@") numAdjacentRolls++;
        }

        if (lowerRow) {
          // lower
          if (lowerRow[j] === "@") numAdjacentRolls++;

          // lowerleft
          if (!isLeftEdge && lowerRow[leftIdx] === "@") numAdjacentRolls++;

          // lowerright
          if (!isRightEdge && lowerRow[rightIdx] === "@") numAdjacentRolls++;
        }

        if (numAdjacentRolls < 4) {
          numAccessibleRolls++;
          rows[i] = row.slice(0, j) + "x" + row.slice(j + 1);
          row = rows[i]!;
          hasRemoved = true;
        }
      }
    }
  }

  return numAccessibleRolls;
};

const main = () => {
  const puzzleInput = getInput();
  const rows = puzzleInput.split("\n");

  console.table({
    partOne: partOne(rows),
    partTwo: partTwo(rows),
  });
};

main();
