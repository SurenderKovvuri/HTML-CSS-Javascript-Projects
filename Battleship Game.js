const squares = document.querySelectorAll('.square');
let clickCount = 0;
let shipCount = 0;
const totalShips = 5;
const maxClicks = 8;

squares.forEach(square => {
  square.addEventListener('click', function() {
    const img = square.querySelector('img');

    if (img.classList.contains('no-reveal')) {
      img.classList.remove('no-reveal');
      clickCount++;

      if (img.alt === 'Ship') {
        shipCount++;
      }

      if (shipCount === totalShips) {
        alert('You win! You found all the ships!');
      } else if (clickCount >= maxClicks) {
        alert('You lose! You did not find all ships within 8 clicks.');
        resetGame();
      }
    }
  });
});

document.getElementById('reset-button').addEventListener('click', resetGame);

function resetGame() {
  clickCount = 0;
  shipCount = 0;
  squares.forEach(square => {
    const img = square.querySelector('img');
    img.classList.add('no-reveal');
  });
}
