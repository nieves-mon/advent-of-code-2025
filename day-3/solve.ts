import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-3/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

const solve = (banks: string[], numDigits = 2) => {
  let totalJoltage = 0;

  for (const bank of banks) {
    const digits = new Array(numDigits);

    let start = 0;

    for (let i = 0; i < numDigits; i++) {
      for (let j = start; j + (numDigits - i) <= bank.length; j++) {
        const currNum = parseInt(bank[j]!);

        if (!digits[i] || currNum > digits[i]) {
          digits[i] = currNum;
          start = j + 1;
        }
      }
    }

    const joltage = parseInt(digits.join(""));
    totalJoltage += joltage;
  }

  return totalJoltage;
};

const main = () => {
  const puzzleInput = getInput();
  const banks = puzzleInput.split("\n");

  console.table({
    partOne: solve(banks),
    partTwo: solve(banks, 12),
  });
};

main();
