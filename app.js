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

      // Normal click
      square.addEventListener("click", (e) => {
        click(square);
      });
    }

    // Add numbers
    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      // Check if nearby squares are bombs.
      if (squares[i].classList.contains("valid")) {
        // top
        if (i > width && squares[i - width].classList.contains("bomb")) total++;
        // top-right
        if (i > width - 1 && !isRightEdge && squares[i + 1 - width].classList.contains("bomb")) total++;
        // right
        if (i < squares.length && !isRightEdge && squares[i + 1].classList.contains("bomb")) total++;
        // bottom-right
        if (i < squares.length - width - 1 && !isRightEdge && squares[i + 1 + width].classList.contains("bomb")) total++;
        // bottom
        if (i < squares.length - width - 1 && squares[i + width].classList.contains("bomb")) total++;
        // bottom-left
        if (i < squares.length - width && !isLeftEdge && squares[i - 1 + width].classList.contains("bomb")) total++;
        // left
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb")) total++;
        // top-left
        if (i > width + 1 && !isLeftEdge && squares[i - 1 - width].classList.contains("bomb")) total++;

        squares[i].setAttribute("data", total);
        // squares[i].innerHTML = total;
        // console.log(squares[i]);
      }
    }
  }

  // Click on square actions
  function click(square) {
    // Break if game is over
    if (isGameOver) return;

    // Break if already checked or flagged square
    if (square.classList.contains("checked") || square.classList.contains("flag")) return;

    if (square.classList.contains("bomb")) {
      //   alert("Game Over!");
      console.log("Game Over!");
    } else {
      let total = square.getAttribute("data");
      if (total != 0) {
        square.classList.add("checked");
        square.innerHTML = total;
        return;
      }
      square.classList.add("checked");
    }
  }

  createBoard();
});
