const PLAYER1 = '✖';
const PLAYER2 = '◯';
let round =1;
const gameFields= document.querySelectorAll('.gameFields');
gameFields.forEach((div)=>{
div.addEventListener('click',pick)
});

function pick(event){
    const item= event.target;
    console.log(item);

    if(round%2===0){
        item.innerHTML=PLAYER1;
    }
    else if(round%2!==0){
        item.innerHTML=PLAYER2;
    }
    round++
}