var row=1;
var top=[2,3,4],down=[1,3,4],left=[1,2,4],right=[1,2,3];
var grid=[];
var player=0;
const finish=80;
window.addEventListener('load',()=>{
    document.querySelector(".container").innerHTML="<div class='grid'></div>";
    for(var i=0;i<9;i++){
        document.querySelector(".grid").innerHTML+="<div class='row' id='row"+row+"'></div>";
        for(var j=0;j<9;j++){
            document.getElementById("row"+row).innerHTML+="<div class='col  cell'></div>";
        }
        row++;
    }
    const cells=Array.from(document.querySelectorAll(".cell"));
    cells.forEach((cell)=>{
        cell.style.border="2px solid #0E0E52";
        cell.style.backgroundColor='white';
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
    if(move==='ArrowUp' && player>8){
        if(cells[player].style.borderTopColor!='white'){
            return;
        }
        cells[player].classList.remove("player");
        cells[player].classList.remove("player2");
        player-=9;
        cells[player].classList.add('player');
    }
    if(move==='ArrowDown' && player<72){
        if(cells[player].style.borderBottomColor!='white'){
            return;
        }
        cells[player].classList.remove("player");
        cells[player].classList.remove("player2");
        player+=9;
        cells[player].classList.add('player');
    }
    if(move==='ArrowLeft' && player%9!=0){
        if(cells[player].style.borderLeftColor!='white'){
            return;
        }
        cells[player].classList.remove("player");
        cells[player].classList.remove("player2");
        player-=1;
        cells[player].classList.add("player2");
    }
    if(move==='ArrowRight' && (player+1)%9!=0){
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
    if(current>8 && !grid[current-9].visited)neighbours.push(current-9);
    if(current<72 && !grid[current+9].visited)neighbours.push(current+9);
    if(current%9!=0 && !grid[current-1].visited)neighbours.push(current-1);
    if((current+1)%9!=0 && !grid[current+1].visited)neighbours.push(current+1);
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
    else if(current+9===next){
        cells[current].style.borderBottomColor="white";
        cells[next].style.borderTopColor="white";
    }
    else if(current-9===next){
        cells[current].style.borderTopColor="white";
        cells[next].style.borderBottomColor="white";
    }
}