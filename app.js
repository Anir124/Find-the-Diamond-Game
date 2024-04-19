let diamondIndex;
let attempts = 5;
let gameOver = false;
const win = document.getElementById('ifwin');

function initializeGame(){
  attempts = 5;
  gameOver = false;
  diamondIndex = Math.floor(Math.random() * 20);
  if(win.classList.contains("block")){
    win.classList.remove("block");
  }
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.dataset.index = i;
    tile.addEventListener('click', handleClick);
    grid.appendChild(tile);
  }
  updateResult();
}

function handleClick(event) {
  if (gameOver) return;
  const clickedIndex = parseInt(event.target.dataset.index);
  const tile = event.target;
  if (tile.classList.contains('clicked')) return;
  if (clickedIndex === diamondIndex){
    tile.classList.add('green');
    tile.classList.add('diamond');
    displayResult('Congratulations! You found the diamond!');
    win.className="block";
    gameOver = true;
  } else {
    tile.classList.add('clicked');
    attempts--;
    updateResult();
    if (attempts === 0) {
      revealDiamondTile()
      displayResult('Game over! You ran out of attempts.');
      gameOver = true;
    } else if (attempts === 3) {
      const row = Math.floor(diamondIndex / 5);
      const tiles = document.querySelectorAll('.tile');
      tiles.forEach((tile, index) => {
        if (Math.floor(index / 5) === row) {
          tile.classList.add('highlight');
        }
      });
    }
  }
}

function updateResult() {
  const result = document.getElementById('result');
  result.textContent = `Attempts left: ${attempts}`;
}

function displayResult(message) {
  const result = document.getElementById('result');
  result.textContent = message;
}
function revealDiamondTile() {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach((tile, index) => {
    if (index === diamondIndex) {
      tile.classList.add('diamond');
      tile.classList.add('red');
    }
  });
}
window.onload = initializeGame;