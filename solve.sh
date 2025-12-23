day=$1

if [ ! -d "$day" ]; then
  echo "Directory $day not found"
  exit 1
fi

if [ ! -f "$day/solve.ts" ]; then
  echo "$day/solve.ts not found"
  exit 1
fi

if [ ! -f "$day/puzzle-input.txt" ]; then
  echo "$day/puzzle-input.txt not found"
  exit 1
fi

npx ts-node $day/solve.ts
