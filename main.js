const PLAYER1 = "✖";
const PLAYER2 = "◯";
let round = 1;

const PL1 = [0,1,2];
const PL2 = [];
const board__fields = document.querySelectorAll(".board__field");
const resetButton = document.querySelector(".reset");
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
  });
});

const winningConditions = [ [0, 1, 2],[2, 1, 0],[3, 4, 5],[5, 4, 3],[6, 7, 8],
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

function check(arr){
  let result = arr.every((element)=>{
    return(element===winningConditions[element])
  })
  console.log(element)
}

const resetGame = () => {

  
  PL1.splice(0, PL1.length);
  PL2.splice(0, PL2.length);

  board__fields.forEach((div) => {
    div.innerHTML = "";
  });
};

resetButton.addEventListener("click", resetGame);




function doesIcludes(){
// const a= PL1.toString();
  winningConditions.forEach(function(item){

item.filter(function(element){
  element.includes(PL1);
})
  
  })


}




  // const a= PL1.toString();
    
  
  // const filter=winningConditions.filter(function(element,index,array){
  //    array[index]===PL1;
    
  // })
  // console.log(filter)
  
  const arr1d=[].concat(...winningConditions)
  
    const mapowanie = arr1d.map(function(element,index,array){
 return array[index];
  
})
    
    console.log(mapowanie)
  
  const filterNewMapedArray=mapowanie.filter(function(element){
    
  })
  console.log(filterNewMapedArray);




// const winningConditions = [ [0, 1, 2],[2, 1, 0],[3, 4, 5],[5, 4, 3],[6, 7, 8],
//   [8, 7, 6],
//   [0, 4, 8],
//   [8, 4, 0],
//   [6, 4, 2],
//   [2, 4, 6],
//   [0, 3, 6],
//   [6, 3, 0],
//   [1, 4, 7],
//   [7, 4, 1],
//   [2, 5, 8],
//   [8, 5, 2],
// ];