// npm run solve -- day-1

import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

const partOne = () => {
  const puzzleInput = getInput();
  const rotations = puzzleInput.split("\n");

  let currentPosition = 50;
  let numZeroes = 0;

  rotations.forEach((rotation) => {
    const normalizedRotation = rotation.toLowerCase();
    const direction = normalizedRotation[0];
    const num = parseInt(normalizedRotation.slice(1));

    if (direction === "r") {
      currentPosition += num;
      if (currentPosition > 99) currentPosition = currentPosition % 100;
    } else if (direction === "l") {
      currentPosition -= num;

      if (currentPosition < 0) currentPosition = (currentPosition + 100) % 100;
    }

    if (currentPosition === 0) numZeroes++;
  });

  console.log(`Num. of times place landed on 0: ${numZeroes}`);
  return;
};

const partTwo = () => {
  const puzzleInput = getInput();
};

partOne();
partTwo();
