const heading = document.querySelector(".heading");

const boxes =document.querySelectorAll(".box");

const newGame = document.querySelector(".new-game");

let currentPlayer;
let gameGrid;


const winner=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function initgame(){

    currentPlayer = "O",
    gameGrid = ["" , "" , "" , "" , "" , "" , "" , "" , "" ],

    boxes.forEach((box)=>{
        box.style.backgroundColor="transparent";
        box.style.pointerEvents = "auto";
        box.style.cursor="pointer";
        box.innerText="";
    })

    heading.innerText = `CURRENT PLAYER- ${currentPlayer} `;
    newGame.classList.remove("startnewgame");

    

}

initgame()

boxes.forEach((box , index) => {

    box.addEventListener("click" , ()=>
    handleclick(index)
    )
});

function swapturn(){

    if(currentPlayer==="O"){
        currentPlayer="X";
    }

    else{
        currentPlayer="O";
    }

    heading.innerText = `CURRENT PLAYER- ${currentPlayer} `;
}

function handleclick(index){

    if(gameGrid[index]===""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.cursor = "default";
        swapturn();
        checkGameOver();
    }
}


function checkGameOver(){

    let answer =""

    winner.forEach((position) => {

        if(gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="" && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]) ){
            boxes[position[0]].style.backgroundColor = "Green";
            boxes[position[1]].style.backgroundColor = "Green";
            boxes[position[2]].style.backgroundColor = "Green";

            boxes.forEach(box => {
                box.style.pointerEvents = "none";
            })

            if(gameGrid[position[0]]=="X"){
            answer ="X" ;
            }

            else{
                answer = "O"
            }

            
        }
    })

    if(answer!==""){

        heading.innerText=`WINNER - ${answer}`;
        newGame.classList.add("startnewgame");
    }

    else{

        let fillCount = 0;
    
        gameGrid.forEach((box) => {
            if(box!==""){
                fillCount++;
            }
        })
    
        if(fillCount===9){
            heading.innerText=`DRAW`;
            newGame.classList.add("startnewgame");
        }
    }

   
}


newGame.addEventListener("click" , ()=>{
    initgame();
}
)

