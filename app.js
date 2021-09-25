document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let width = 10;
  let bombAmount = 20;
  let flags = 0;
  let squares = [];
  let isGameOver = false;

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

      // Ctrl & Left Click
      square.oncontextmenu = (e) => {
        e.preventDefault();
        addFlag(square);
      };
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
    let currentId = square.id;

    // Break if game is over
    if (isGameOver) return;

    // Break if already checked or flagged square
    if (square.classList.contains("checked") || square.classList.contains("flag")) return;

    if (square.classList.contains("bomb")) {
      gameOver(square);
    } else {
      let total = square.getAttribute("data");
      if (total != 0) {
        square.classList.add("checked");
        square.innerHTML = total;
        return;
      }
      checkSquare(square, currentId);
    }
    square.classList.add("checked");
  }

  // Check neighboring squares once square is clicked
  function checkSquare(square, currentId) {
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;

    setTimeout(() => {
      // top
      if (currentId > width) {
        const newId = squares[parseInt(currentId) - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // top-right
      if (currentId > width - 1 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // right
      if (currentId < squares.length && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // bottom-right
      if (currentId < squares.length - width - 1 && !isRightEdge) {
        const newId = squares[parseInt(currentId) + 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // bottom
      if (currentId < squares.length - width - 1) {
        const newId = squares[parseInt(currentId) + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // bottom-left
      if (currentId < squares.length - width && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 + width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // left
      if (currentId > 0 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
      // top-left
      if (currentId > width + 1 && !isLeftEdge) {
        const newId = squares[parseInt(currentId) - 1 - width].id;
        const newSquare = document.getElementById(newId);
        click(newSquare);
      }
    }, 10);
  }

  // Add Flag to square
  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains("checked") && flags < bombAmount) {
      if (!square.classList.contains("flag")) {
        square.classList.add("flag");
        square.innerHTML = "🚩";
        flags++;
      } else {
        square.classList.remove("flag");
        square.innerHTML = "";
        flags--;
      }
    }
  }

  // Game over
  function gameOver(square) {
    console.log("BOOM! Game Over!");
    square.innerHTML = "💥";
    isGameOver = true;

    // Show all the bombs
    squares.forEach((square) => {
      if (square.classList.contains("bomb")) {
        square.innerHTML = "💣";
      }
    });
  }

  // Init game
  createBoard();
});
