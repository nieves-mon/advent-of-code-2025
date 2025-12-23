import * as fs from "fs";

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-3/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

const partOne = (banks: string[]) => {
  let totalJoltage = 0;

  for (const bank of banks) {
    let firstDigit = 0;
    let firstIdx = 0;

    for (let j = 0; j < bank.length - 1; j++) {
      const num = parseInt(bank[j]!);

      if (num > firstDigit) {
        firstDigit = num;
        firstIdx = j;
      }
    }

    let secondDigit = 0;
    for (let j = firstIdx + 1; j < bank.length; j++) {
      const num = parseInt(bank[j]!);

      if (num > secondDigit) {
        secondDigit = num;
      }
    }

    const joltage = parseInt(`${firstDigit}${secondDigit}`);
    console.log(bank, joltage);
    totalJoltage += joltage;
  }

  return totalJoltage;
};

const partTwo = (banks: string[]) => {};

const main = () => {
  const puzzleInput = getInput();
  const banks = puzzleInput.split("\n");

  console.table({
    partOne: partOne(banks),
    partTwo: partTwo(banks),
  });
};

main();
