import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-10/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

const partOne = (puzzleInput: string) => {};
const partTwo = (puzzleInput: string) => {};

const main = () => {
  const puzzleInput = getInput();

  console.table({
    partOne: partOne(puzzleInput),
    partTwo: partTwo(puzzleInput),
  });
};

main();
