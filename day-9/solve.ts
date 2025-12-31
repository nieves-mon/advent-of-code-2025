import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-9/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

interface Corner {
  x: number;
  y: number;
}

const partOne = (corners: Corner[]) => {};
const partTwo = (corners: Corner[]) => {};

const main = () => {
  const puzzleInput = getInput();
  const lines = puzzleInput.split("\n");
  const corners: Corner[] = lines.map((line) => {
    const [x, y] = line.split(",");
    return { x: Number(x)!, y: Number(y)! };
  });

  console.table({
    partOne: partOne(corners),
    partTwo: partTwo(corners),
  });
};

main();
