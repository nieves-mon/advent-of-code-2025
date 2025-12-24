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

const partTwo = (lines: string[]) => {
  const nums: number[][] = [];
  const operators: string[] = [];
  const numLines = lines.length;
  const lineLen = lines[0]!.length;

  let numArr: number[];
  for (let i = 0; i < lineLen; i++) {
    let numStr = "";
    for (let j = numLines - 1; j >= 0; j--) {
      const char = lines[j]![i];

      if (!char?.length) continue;

      if (j === numLines - 1) {
        if (char.trim().length) {
          nums.push([]);
          numArr = nums[nums.length - 1]!;
          operators.push(char);
        }

        continue;
      }

      numStr = (char + numStr).trim();
    }

    if (numStr.length) numArr!.push(Number(numStr));
  }

  console.log(nums, operators);

  let finalSum = 0;
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i];
    const numbers = nums[i]!;

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

const main = () => {
  const puzzleInput = getInput();
  const lines = puzzleInput.split("\n");

  console.table({
    partOne: partOne(lines),
    partTwo: partTwo(lines),
  });
};

main();
