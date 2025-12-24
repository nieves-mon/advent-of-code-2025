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

const partTwo = (ranges: string[]) => {
  const rangesObj: { min: number; max: number }[] = ranges.map((range) => {
    const nums = range.split("-").map((num) => parseInt(num));
    const min = nums[0]!;
    const max = nums[1]!;

    return { min, max };
  });

  const newRangesObj: { min: number; max: number }[] = [];

  let rewritten = true;
  while (rewritten) {
    rewritten = false;

    for (const { min, max } of rangesObj) {
      let overlapFound = false;

      for (const newRange of newRangesObj) {
        const compMin = newRange.min;
        const compMax = newRange.max;

        // whole range already counted
        if (min >= compMin && max <= compMax) {
          overlapFound = true;
          break;
        }

        // counted range is completely within current range
        if (min <= compMin && max >= compMax) {
          overlapFound = true;

          newRange.max = max;
          newRange.min = min;
          break;
        }

        // current range overlaps existing range's left
        if (min < compMin && max < compMax && max >= compMin) {
          overlapFound = true;

          newRange.min = min;
          break;
        }

        // current range overlaps existing range's right
        if (max > compMax && min > compMin && min <= compMax) {
          overlapFound = true;

          newRange.max = max;
          break;
        }
      }

      if (overlapFound) {
        rewritten = true;
        continue;
      }

      newRangesObj.push({ min, max });
    }

    if (rewritten) {
      rangesObj.length = 0;
      newRangesObj.forEach(({ min, max }) => rangesObj.push({ min, max }));
      newRangesObj.length = 0;
    }
  }

  let numAvailableIds = 0;
  rangesObj.forEach(({ min, max }) => (numAvailableIds += max - min + 1));

  return numAvailableIds;
};

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
    partTwo: partTwo(ranges),
  });
};

main();
