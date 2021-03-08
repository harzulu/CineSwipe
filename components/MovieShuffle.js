export default function MovieShuffle(array) {
  let currI = array.length, tempVal, randI;

  while (0 !== currI) {

    randI = Math.floor(Math.random() * currI);
    currI -= 1;

    tempVal = array[currI];
    array[currI] = array[randI];
    array[randI] = tempVal;
  }

  return array;
}