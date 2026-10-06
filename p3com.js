const heading = document.querySelector(".heading");

const boxes =document.querySelectorAll(".box");

const newGame = document.querySelector(".new-game");

let currentPlayer;
let gameGrid;
let answer ="";


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

function getRdnIntgr(max,min){
    return Math.round(Math.random()*(max-min))+min
}

function initgame(){

    currentPlayer = "O",
    gameGrid = ["" , "" , "" , "" , "" , "" , "" , "" , "" ],
    answer="",

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

    if(answer===""){

        if(currentPlayer==="O" ){
            currentPlayer="X";
            heading.innerText = `CURRENT PLAYER- ${currentPlayer} `;
            setTimeout(bot,500);
        }
    
        else{
            currentPlayer="O";
            heading.innerText = `CURRENT PLAYER- ${currentPlayer} `;
        }
    }

    
}

function bot(){

    let a = 0 , b=0;

    for(let i=0;i<8;i++){

        let position=winner[i];

        if(gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[0]]==='X'){

            if(gameGrid[position[2]]===""){
                gameGrid[position[2]]= currentPlayer;
                boxes[position[2]].innerText = currentPlayer;
                a++;
                b++;
                break;
                
            }

            else{
                continue;
            }
            
        }

        else if( gameGrid[position[1]]===gameGrid[position[2]]  && gameGrid[position[1]]==='X'){

            if(gameGrid[position[0]]===""){
                gameGrid[position[0]]=currentPlayer;
                boxes[position[0]].innerText = currentPlayer;
                a++;
                b++;
                break;

            }

            else{
                continue;
            }
            
        }

        else if( gameGrid[position[2]]===gameGrid[position[0]]  && gameGrid[position[2]]==='X'){

            if(gameGrid[position[1]] === ""){
                gameGrid[position[1]]=currentPlayer;
                boxes[position[1]].innerText = currentPlayer;
                a++;
                b++;
                break;
            }

            else{
                continue;
            }
            
        }

    }
    
    if(a===0){
        for(let i=0;i<8;i++){
    
            let position=winner[i];
    
            if(gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[0]]==="O" ){

            if(gameGrid[position[2]]===""){
                gameGrid[position[2]]= currentPlayer;
                boxes[position[2]].innerText = currentPlayer;
                b++;
                break;
                
            }

            else{
                continue;
            }
            
            }
    
            else if( gameGrid[position[1]]===gameGrid[position[2]] && gameGrid[position[1]]==="O" ){

            if(gameGrid[position[0]]===""){
                gameGrid[position[0]]=currentPlayer;
                boxes[position[0]].innerText = currentPlayer;
                b++;
                break;

            }

            else{
                continue;
            }
            
            }
    
            else if( gameGrid[position[2]]===gameGrid[position[0]] && gameGrid[position[2]]==="O" ){

            if(gameGrid[position[1]] === ""){
                gameGrid[position[1]]=currentPlayer;
                boxes[position[1]].innerText = currentPlayer;
                b++;
                break;
            }

            else{
                continue;
            }
            
            }
    
        }
    }  

    if(b===0){
        assignrdn()
    }

    checkGameOver();
    swapturn();
    
}

function assignrdn(){

    let x=getRdnIntgr(8,0);

        if(gameGrid[x] === ""){
            gameGrid[x]=currentPlayer;
            boxes[x].innerText = currentPlayer;
        }

        else{
            assignrdn()
        }


}

function handleclick(index){

    if(gameGrid[index]===""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.cursor = "default";
        checkGameOver();
        swapturn();
        
    }
}


function checkGameOver(){

    

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
            answer='DRAW'
            heading.innerText=`DRAW`;
            newGame.classList.add("startnewgame");
        }
    }

   
}


newGame.addEventListener("click" , ()=>{
    initgame();
}
)

console.log("bbf")

