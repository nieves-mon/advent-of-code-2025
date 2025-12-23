import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-3/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};
const puzzleInput = getInput();

const partOne = (puzzleInput: string) => {};
const partTwo = (puzzleInput: string) => {};

const main = () => {
  console.table({
    partOne: partOne(puzzleInput),
    partTwo: partTwo(puzzleInput),
  });
};

main();
