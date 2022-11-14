const PLAYER1 = "✖";
const PLAYER2 = "◯";
let round = 1;
const winningConditions = [
  [0, 1, 2],
  [2, 1, 0],
  [3, 4, 5],
  [5, 4, 3],
  [6, 7, 8],
  [8, 7, 6],
  [0, 4, 8],
  [8, 4, 0],
  [6, 4, 2],
  [2, 4, 6],
  [0, 3, 6],
  [6, 3, 0],
  [1, 4, 7],
  [7, 4, 1],
  [2, 5, 8],
  [8, 5, 2],
];

const PL1 = [];
const PL2 = [];
const board__fields = document.querySelectorAll(".board__field");
const resetButton = document.querySelector(".reset");

window.onload= setGame();

function setGame(){
board__fields.forEach((div, index) => {
  div.addEventListener("click", (event) => {
    const item = event.target;

    if (item.innerHTML !== "") {
      return;
    }

    if (round % 2 === 0) {
      item.innerHTML = PLAYER1;
      PL1.push(index);
    } else if (round % 2 !== 0) {
      item.innerHTML = PLAYER2;
      PL2.push(index);
    }
    round++;
    isWinning();
    
  });
  displayWinner();
});
}




function isWinning() {
  let winner=''
 

  const p1Choices=winningConditions.some((combination) => {
   
    return combination.every((cell) => PL1.includes(cell));
    
  });
  const p2Choices=winningConditions.some((combination) => {
   
    return combination.every((cell) => PL2.includes(cell));
    
  
  });
  if(p1Choices===true){
    winner='Player 1'
    
  }
  else if(p2Choices===true){
    winner='Player 2'
  }

  if(winner==='Player 1'){
    return winner;
    
  }
  else if(winner==='Player 2'){
  return winner;
  }
  
 
 
}





function displayWinner(){
const wrapper= document.querySelector('.wrapper');
const resultBox=document.createElement('div');
resultBox.classList.add('resultBox')
wrapper.appendChild(resultBox);
resultBox.innerHTML= isWinning();
return;
}


const resetGame = () => {
  PL1.splice(0, PL1.length);
  PL2.splice(0, PL2.length);

  board__fields.forEach((div) => {
    div.innerHTML = "";
  });
};

resetButton.addEventListener("click", resetGame);
