function calculatePosition(squaresArray, prevSquaresArray) {
  const squareCoord = {
    player: '',
    col: 1,
    row: 1,
  };

  for (let i = 0; i < squaresArray.length; i++) {
    if (squaresArray[i] !== prevSquaresArray[i]) {
      squareCoord.player = squaresArray[i];
      squareCoord.col += i%3;
      squareCoord.row += Math.floor(i/3);
      return squareCoord;
    }
  }
  return null;
}

export default calculatePosition;
