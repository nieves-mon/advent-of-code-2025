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

const calculateArea = (cornerOne: Corner, cornerTwo: Corner): number => {
  const yDiff = Math.abs(cornerOne.y - cornerTwo.y) + 1;
  const xDiff = Math.abs(cornerOne.x - cornerTwo.x) + 1;

  return yDiff * xDiff;
};

const partOne = (corners: Corner[]) => {
  let largestArea: number = 0;

  for (let i = 0; i < corners.length; i++) {
    const cornerOne = corners[i]!;

    for (let j = i + 1; j < corners.length; j++) {
      const cornerTwo = corners[j]!;

      const area = calculateArea(cornerOne, cornerTwo);

      if (largestArea < area) largestArea = area;
    }
  }

  return largestArea;
};
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
