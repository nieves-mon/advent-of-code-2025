import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-7/puzzle-input.txt", { encoding: "utf8" })
    .trim()
    .split("\n");
  return puzzleInput;
};

const partOne = (lines: string[]) => {
  const currBeamIdxs = new Set<number>();
  let numSplit = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    if (i === 0) {
      currBeamIdxs.add(line.indexOf("S"));
      continue;
    }

    const splitters = Array.from(line.matchAll(/\^/g));
    if (!splitters.length) {
      continue;
    }

    for (const splitter of splitters) {
      const splitLoc = splitter.index;
      if (!currBeamIdxs.has(splitLoc)) continue;

      currBeamIdxs.delete(splitLoc);
      currBeamIdxs.add(splitLoc - 1);
      currBeamIdxs.add(splitLoc + 1);

      numSplit++;
    }
  }

  return numSplit;
};
const partTwo = (lines: string[]) => {};

const main = () => {
  const puzzleInput = getInput();

  console.table({
    partOne: partOne(puzzleInput),
    partTwo: partTwo(puzzleInput),
  });
};

main();
