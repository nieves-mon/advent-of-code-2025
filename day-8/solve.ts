import * as fs from "fs";
import { join } from "path";

interface BoxCoordinates {
  x: number;
  y: number;
  z: number;
}

const getInput = () => {
  const puzzleInput = fs
    .readFileSync("day-8/puzzle-input.txt", { encoding: "utf8" })
    .trim();
  return puzzleInput;
};

const calculateDistance = (
  boxOne: BoxCoordinates,
  boxTwo: BoxCoordinates
): number => {
  const xDiff = Math.abs(boxOne.x - boxTwo.x);
  const yDiff = Math.abs(boxOne.y - boxTwo.y);
  const zDiff = Math.abs(boxOne.z - boxTwo.z);

  const xSquareDiff = Math.pow(xDiff, 2);
  const ySquareDiff = Math.pow(yDiff, 2);
  const zSquareDiff = Math.pow(zDiff, 2);

  const distance = Math.sqrt(xSquareDiff + ySquareDiff + zSquareDiff);

  return distance;
};

const partOne = (boxes: BoxCoordinates[]) => {
  const distances: { boxOne: number; boxTwo: number; distance: number }[] = [];

  for (let i = 0; i < boxes.length; i++) {
    const boxOne = boxes[i]!;

    for (let j = i + 1; j < boxes.length; j++) {
      const boxTwo = boxes[j]!;
      const distance = calculateDistance(boxOne, boxTwo);

      distances.push({
        boxOne: i,
        boxTwo: j,
        distance,
      });
    }
  }

  distances.sort((a, b) => a.distance - b.distance);

  const circuits: Set<number>[] = [];

  const numConnections = boxes.length < 1000 ? 10 : 1000;

  let connections = 0;
  for (let i = 0; i < distances.length && connections < numConnections; i++) {
    const distObj = distances[i]!;
    let circuitFound: number | undefined;

    for (let j = 0; j < circuits.length; j++) {
      const circuit = circuits[j]!;

      const foundBoxOne = circuit.has(distObj.boxOne);
      const foundBoxTwo = circuit.has(distObj.boxTwo);

      if (foundBoxOne && foundBoxTwo) {
        connections++;
        circuitFound = j;
        break;
      }

      if (!foundBoxOne && foundBoxTwo) {
        if (circuitFound) {
          const firstCircuit = circuits[circuitFound]!;
          circuit.forEach((num) => {
            if (!firstCircuit.has(num)) firstCircuit.add(num);
          });
          circuit.clear();
          break;
        }

        connections++;
        circuit.add(distObj.boxOne);
        circuitFound = j;
      } else if (foundBoxOne && !foundBoxTwo) {
        if (circuitFound) {
          const firstCircuit = circuits[circuitFound]!;
          circuit.forEach((num) => {
            if (!firstCircuit.has(num)) firstCircuit.add(num);
          });
          circuit.clear();
          break;
        }

        connections++;
        circuit.add(distObj.boxTwo);
        circuitFound = j;
      }
    }

    if (circuitFound === undefined) {
      connections++;
      circuits.push(new Set([distObj.boxOne, distObj.boxTwo]));
    }
  }

  circuits.sort((a, b) => b.size - a.size);

  return circuits
    .slice(0, 3)
    .reduce((product, curr) => (product *= curr.size), 1);
};
const partTwo = (boxes: BoxCoordinates[]) => {};

const main = () => {
  const puzzleInput = getInput();
  const lines = puzzleInput.split("\n");
  const boxes: BoxCoordinates[] = lines.map((line) => {
    const [x, y, z] = line.split(",");
    return { x: Number(x), y: Number(y), z: Number(z) };
  });

  console.table({
    partOne: partOne(boxes),
    partTwo: partTwo(boxes),
  });
};

main();
