export function getRandomNumber(max: number) {
  return Math.floor(Math.random() * (max - 1) + 1);
}

export function getRandomNumbersArray(max: number, howMany: number) {
  let randomNumbersArray = [];
  for (let i = 0; i < howMany; i++) {
    randomNumbersArray.push(getRandomNumber(max));
  }
  return randomNumbersArray;
}
