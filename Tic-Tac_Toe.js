const squares = document.querySelectorAll(".square");
const statusDisplay = document.getElementById("status");
const resetButton = document.querySelector("button");

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;

const handleCellClick = (event) => {
  const clickedCell = event.target;
  const clickedIndex = parseInt(clickedCell.getAttribute("index"));

  if (gameState[clickedIndex] !== "" || !gameActive)  {
     return;
  }

  gameState[clickedIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer === "X" 
    ? '<i class="fa-solid fa-x" style="color: #000000;"></i>' 
    : '<i class="fa-solid fa-o" style="color: #000000;"></i>';

  checkResult();
};

const checkResult = () => {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      roundWon = true;
      condition.forEach(index => squares[index].style.backgroundColor = "lightgreen");
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    statusDisplay.innerHTML = `Game ended in a draw!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
};

const resetGame = () => {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
  squares.forEach(square => {
    square.innerHTML = "";
    square.style.backgroundColor = "";
  });
};

squares.forEach(square => square.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
