import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

const partOne = () => {
  const puzzleInput = getInput();
};
const partTwo = () => {
  const puzzleInput = getInput();
};

partOne();
partTwo();
