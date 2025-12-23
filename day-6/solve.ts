import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-6/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

const partOne = (lines: string[]) => {
  const nums: number[][] = [];
  const operators: string[] = [];

  for (const line of lines) {
    const groupedChars = Array.from(line.matchAll(/[\S]+/g)).map(
      (group) => group[0]
    );

    if (isNaN(Number(groupedChars[0]))) {
      groupedChars.forEach((char) => operators.push(char.toString()));
      continue;
    }

    nums.push(groupedChars.map((char) => Number(char)));
  }

  let finalSum = 0;
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const numbers = nums.map((numArr) => numArr[i]!);

    let answer = 0;
    switch (operator) {
      case "+": {
        answer = numbers.reduce((accum, currNum) => accum + currNum, 0);
        break;
      }

      case "*": {
        answer = numbers.reduce((accum, currNum) => accum * currNum, 1);
      }
    }

    finalSum += answer;
  }

  return finalSum;
};
const partTwo = (lines: string[]) => {};

const main = () => {
  const puzzleInput = getInput();
  const lines = puzzleInput.split("\n");

  console.table({
    partOne: partOne(lines),
    partTwo: partTwo(lines),
  });
};

main();
