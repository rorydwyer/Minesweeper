document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let width = 10;
  let bombAmount = 20;
  let squares = [];

  // Create Board
  function createBoard() {
    // Get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill("bomb");
    const emptyArray = Array(width * width - bombAmount).fill("valid");
    const gameArray = emptyArray.concat(bombsArray);
    const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      square.classList.add(shuffledArray[i]);

      grid.appendChild(square);
      squares.push(square);
    }

    // Add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === -1;

      if (squares[i].classList.contains("valid")) {
        // check if left square is a bomb
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb")) total++;
        // Check if top-right square is a bomb
        if (i > width - 1 && !isRightEdge && squares[i + 1 - width].classList.contains("bomb")) total++;
      }

      // const isTopEdge = (0 < i < width);
      // const isBottomEdge = (squares.length - width < i < squares.length);
    }
  }

  createBoard();
});
