
const random= document.querySelector("#random");
const chooseEnd= document.querySelector("#chooseEnd");
const Travil= document.querySelector("#Travil");
const Clear= document.querySelector("#Clear");
const boardContainer = document.querySelector("#board");
const Status= document.querySelector('#status');


let count=1;
let startCell= null;
let endCell=null;

random.addEventListener("click", randomClick);
chooseEnd.addEventListener("click", chooseEndClick);
Travil.addEventListener("click", travilClick);
Clear.addEventListener("click", clearClick );

const endIcon= document.createElement('img');
endIcon.src= "images.png";
endIcon.classList.add('finish');
const knightIcon= document.createElement('img');
knightIcon.src= "horse-knight-chess-png.webp";
knightIcon.classList.add('knight');
knightIcon.draggable="true";




const cells= [];
for(let i=0; i<8; i++){
    let row=[];
    for(let j=0; j<8; j++){
        let cell= document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("indexX", j);
        cell.setAttribute("indexY", i);
        boardContainer.appendChild(cell);
        row.push(cell);
        if((i%2==0)&& (j%2 != 0)){
            cell.style.backgroundColor='white';
        }
        if((j%2==0)&& (i%2 != 0)){
            cell.style.backgroundColor='white';
        }
    }
    cells.push(row);
}
console.log(cells);


class place{
    constructor( x, y ) {
        this.x=x;
        this.y=y;
        this.neighbors= this.options( x, y );
    }
    options(x, y){
        const direction= [[-1, 2], [-1,-2], [1,2], [1,-2], [2,1], [2,-1], [-2,1], [-2,-1]];
        let neighbors=[];
        for(let i=0; i<direction.length; i++){
            let option= direction[i];
            let newX= x+ option[0];
            let newY= y+option[1];
            if((newX>=0 && newX<=7)&&(newY>=0 && newY<=7)) {
                neighbors.push([newX, newY]);
            }
        }
        return neighbors;

    }
}

function createBoard( size=8 ){
    const board= [];
    for(let i=0; i<8; i++){
        let row=[];
        for(let j=0; j<8; j++){
            let newNode= new place( j, i );
            row.push( newNode );
        }
        board.push(row);
    }
    return board;
}
function getKnightMoves(start, end, board) {
    if(start === null) return;
    if(end === null) return;
    const paths = [];
    const visited = new Set();
    const queue = [];
    queue.push([start, [start]]);
    while (queue.length > 0) {
      let [current, path] = queue.shift();
      visited.add(current);
      if (current[0] === end[0] && current[1] === end[1]) {
        paths.push(path);
        console.log( path);
        return path;
      }
      const row= board[current[1]];
      let newOptions = row[current[0]].neighbors;
      for (let pos of newOptions) {
        if (!visited.has(pos)) {
          queue.push([pos, [...path, pos]]);
        }
      }
    }
    console.log(`Fastest Routes from ${start} to ${end}`)
    
  }


function randomClick(){
    random.style.borderColor= 'white';
    Clear.style.borderColor= 'transparent';
    Travil.style.borderColor= 'transparent';
    chooseEnd.style.borderColor= 'transparent';
    Status.textContent='Click on choose end button';
     createRandomKnights();
    
}
function chooseEndClick(){
    chooseEnd.style.borderColor= 'white';
    Clear.style.borderColor= 'transparent';
    Travil.style.borderColor= 'transparent';
    random.style.borderColor= 'transparent';
    count=0;
    Status.textContent='Choose end position on the board';
    cells.forEach((row)=> {row.forEach((cell) =>{ cell.addEventListener("click", cellClicked)})});


 }



function travilClick(){
    Travil.style.borderColor= 'white';
    Clear.style.borderColor= 'transparent';
    random.style.borderColor= 'transparent';
    chooseEnd.style.borderColor= 'transparent';
        const board= createBoard( 8 );
        console.log(board);
        let paths= getKnightMoves(startCell, endCell , board);
        showTravil( paths )
   

}
function clearClick(){
    Clear.style.borderColor= 'white';
    Travil.style.borderColor= 'transparent';
    random.style.borderColor= 'transparent';
    chooseEnd.style.borderColor= 'transparent';
    Status.textContent='Click on the random button';
   
    clearBoard();
    
}

function clearBoard(){
    knightIcon.style.display="none";
    endIcon.style.display="none";
    while( stepNumArr.length ){
        let num=stepNumArr.pop();
        num.remove();
    }
    for(let i=0; i<cells.length; i++){
        let row= cells[i];
        for(let j=0; j<row.length; j++){
            row[j].style.backgroundColor=' rgb(54, 54, 54)';
            if((i%2==0)&& (j%2 != 0)){
                row[j].style.backgroundColor='white';
            }
            if((j%2==0)&& (i%2 != 0)){
                row[j].style.backgroundColor='white';
            }

        }
    }
}


function createRandomKnights(){
    clearBoard();
    knightIcon.style.display="inline-block";
    let rowNum= Math.floor(Math.random()*8);
    let index=Math.floor(Math.random()*8);
    let row=cells[rowNum];
    row[index].appendChild(knightIcon);
    startCell= [index, rowNum];
    console.log(startCell);
    
}


function cellClicked(){
    if(count==0){
    endIcon.style.display="inline-block";
    this.appendChild(endIcon);
    let endX=this.getAttribute('indexx');
    let endY= this.getAttribute('indexy');
    let num=['0', '1', '2', '3', '4', '5', '6', '7']
     endCell=[findX( endX  ), findY( endY )];
    console.log(endCell);
    }
    count=1;
}

function findX( x ){
    let num=['0', '1', '2', '3', '4', '5', '6', '7'];
    for(let i=0; i<num.length; i++){
        if(x=== num[i]){
            return i;
        }
    }
}

function findY( y ){
    let num=['0', '1', '2', '3', '4', '5', '6', '7'];
    for(let i=0; i<num.length; i++){
        if(y=== num[i]){
            return i;
        }
    }
}
let stepNumArr= [ ];
function showTravil( arr ){
    if(arr == null) return;
    console.log(arr);
    for(let i=1; i<arr.length-1 ; i++){
        let cell= arr[i];
        let x= cell[0];
        let y= cell[1];
        let row= cells[y];
        let stepNum= document.createElement("p");
        stepNumArr.push(stepNum);
        stepNum.classList.add('number');
        row[x].appendChild(stepNum);
        stepNum.textContent= i;
        row[x].style.backgroundColor='red';
        Status.textContent=`You made it in ${arr.length-1} moves`;
        
    }

}





       



    
   

