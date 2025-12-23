import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-2/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};
const puzzleInput = getInput();

const partOne = (idRanges: number[][]) => {
  let sumInvalidIDs = 0;
  for (const range of idRanges) {
    const start = range[0]!;
    const end = range[1]!;

    for (let id = start; id <= end; id++) {
      const idString = id.toString();

      if (idString.length % 2 !== 0) continue;

      const firstDigit = idString.slice(0, idString.length / 2);
      const secondDigit = idString.slice(idString.length / 2);

      if (firstDigit === secondDigit) sumInvalidIDs += id;
    }
  }

  return sumInvalidIDs;
};
const partTwo = (idRanges: number[][]) => {};

const main = () => {
  const idRanges = puzzleInput
    .split(",")
    .map((range) => range.split("-").map((num) => parseInt(num)));

  console.table({
    partOne: partOne(idRanges),
    partTwo: partTwo(idRanges),
  });
};

main();
