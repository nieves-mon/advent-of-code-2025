// npm run solve -- day-1

import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-1/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

const STARTING_POINT = 50;
const NUM_POINTS = 100;

const partOne = (rotations: string[]) => {
  let currentPosition = STARTING_POINT;
  let numZeroes = 0;

  rotations.forEach((rotation) => {
    const normalizedRotation = rotation.toLowerCase();
    const direction = normalizedRotation[0];
    const num = parseInt(normalizedRotation.slice(1));

    if (direction === "r") {
      currentPosition += num;

      if (currentPosition >= NUM_POINTS) {
        currentPosition = currentPosition % NUM_POINTS;
      }
    } else if (direction === "l") {
      currentPosition -= num;

      if (currentPosition < 0) {
        currentPosition = (currentPosition + NUM_POINTS) % NUM_POINTS;
      }
    }

    if (currentPosition === 0) numZeroes++;
  });

  return numZeroes;
};

const partTwo = (rotations: string[]) => {
  let currentPosition = 50;
  let numZeroes = 0;

  rotations.forEach((rotation) => {
    const normalizedRotation = rotation.toLowerCase();
    const direction = normalizedRotation[0];
    const num = parseInt(normalizedRotation.slice(1));

    if (direction === "r") {
      for (let i = 0; i < num; i++) {
        currentPosition++;

        if (currentPosition === NUM_POINTS) currentPosition = 0;

        if (currentPosition === 0) numZeroes++;
      }
    } else if (direction === "l") {
      for (let i = 0; i < num; i++) {
        currentPosition--;

        if (currentPosition === -1) currentPosition = 99;

        if (currentPosition === 0) numZeroes++;
      }
    }
  });

  return numZeroes;
};

const main = () => {
  const puzzleInput = getInput();
  const rotations = puzzleInput.split("\n");
  console.table({ partOne: partOne(rotations), partTwo: partTwo(rotations) });
};

main();
