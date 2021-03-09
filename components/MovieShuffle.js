export default function MovieShuffle(array) {
  let newArray = [];
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    const num = Math.floor(Math.random() * (array.length));
    if (newArray.includes(array[num])) {
      i--;
    } else {
      newArray.push(array[num]);
    }
  }
  return newArray;
}