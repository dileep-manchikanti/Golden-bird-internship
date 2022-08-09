var row=1;
var grid=[];
var player=0;
const finish=35;
window.addEventListener('load',()=>{
    document.querySelector(".container").innerHTML="<div class='grid'></div>";
    for(var i=0;i<6;i++){
        document.querySelector(".grid").innerHTML+="<div class='row' id='row"+row+"'></div>";
        for(var j=0;j<6;j++){
            document.getElementById("row"+row).innerHTML+="<div class='col  cell'></div>";
        }
        row++;
    }
    const cells=Array.from(document.querySelectorAll(".cell"));
    cells.forEach((cell)=>{
        cell.style.border="2px solid #0E0E52";
        cell.style.backgroundColor='white';
        // cell.style.backGroundImage="url('public/grass.jfif')"
    })
    cells[player].classList.add('player');
    cells[finish].classList.add("finish");
    for(var i=0;i<cells.length;i++){
        grid.push({
            visited:false
        });
    }
    var visited=[],next=null,current=0;
    do{
        next=getNeighbour(current);
        if(next!=null){
            removeWall(cells,current,next);
            visited.push(current);
            current=next;
            grid[current].visited=true;
        }
        else{
            current=visited.pop();
        }
    }
    while(visited.length!=0)
});
window.addEventListener('keyup',(e)=>{
    var move=e.key;
    console.log(move);
    const cells=Array.from(document.querySelectorAll(".cell"));
    if(move==='ArrowUp' && player>5){
        if(cells[player].style.borderTopColor=='#0E0E52'){
            return;
        }
        cells[player].classList.remove("player");
        cells[player].classList.remove("player2");
        player-=6;
        cells[player].classList.add('player');
    }
    if(move==='ArrowDown' && player<30){
        if(cells[player].style.borderBottomColor!='white'){
            return;
        }
        cells[player].classList.remove("player");
        cells[player].classList.remove("player2");
        player+=6;
        cells[player].classList.add('player');
    }
    if(move==='ArrowLeft' && player%6!=0){
        if(cells[player].style.borderLeftColor!='white'){
            return;
        }
        cells[player].classList.remove("player");
        cells[player].classList.remove("player2");
        player-=1;
        cells[player].classList.add("player2");
    }
    if(move==='ArrowRight' && (player+1)%6!=0){
        if(cells[player].style.borderRightColor!='white'){
            return;
        }
        cells[player].classList.remove("player");
        cells[player].classList.remove("player2");
        player+=1;
        cells[player].classList.add("player");
    }
    if(player===finish){
        setTimeout(()=>{
            alert("Game over");
            window.location="/";
        },300);
    }
})
function getNeighbour(current){
    var neighbours=[];
    if(current==1)console.log("1");
    if(current>6 && !grid[current-6].visited)neighbours.push(current-6);
    if(current<30 && !grid[current+6].visited)neighbours.push(current+6);
    if(current%6!=0 && !grid[current-1].visited)neighbours.push(current-1);
    if((current+1)%6!=0 && !grid[current+1].visited)neighbours.push(current+1);
    var index=Math.floor(Math.random()*neighbours.length);
    if(neighbours.length===0)return null;
    if(neighbours[index]==1)console.log("1");
    return neighbours[index];
}
function removeWall(cells,current,next){
    console.log(current,next);
    if(current+1===next){
        cells[current].style.borderRightColor="white";
        cells[next].style.borderLeftColor="white";

    }
    else if(current-1===next){
        cells[current].style.borderLeftColor="white";
        cells[next].style.borderRightColor="white";
    }
    else if(current+6===next){
        cells[current].style.borderBottomColor="white";
        cells[next].style.borderTopColor="white";
    }
    else if(current-6===next){
        cells[current].style.borderTopColor="white";
        cells[next].style.borderBottomColor="white";
    }
}