import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-5/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

const partOne = (ranges: string[], availableIDs: number[]) => {
  const rangesObj: { min: number; max: number }[] = [];

  for (const range of ranges) {
    const nums = range.split("-").map((num) => parseInt(num));
    const min = nums[0]!;
    const max = nums[1]!;

    rangesObj.push({ min, max });
  }

  let numFresh = 0;
  for (const id of availableIDs) {
    for (const { min, max } of rangesObj) {
      if (id < min || id > max) continue;

      numFresh++;
      break;
    }
  }

  return numFresh;
};
const partTwo = (ranges: string[], availableIDs: number[]) => {};

const main = () => {
  const puzzleInput = getInput();
  const lines = puzzleInput.split("\n");

  const ranges = [];
  const availableIDs = [];

  let breakFound = false;
  for (const line of lines) {
    if (breakFound) {
      availableIDs.push(parseInt(line));
      continue;
    }

    if (!line.trim().length) {
      breakFound = true;
      continue;
    }

    ranges.push(line);
  }

  console.table({
    partOne: partOne(ranges, availableIDs),
    partTwo: partTwo(ranges, availableIDs),
  });
};

main();
