var player='X';
const imageX='/public/X\ image\ .png';
const imageO='/public/O\ Image.png';
window.addEventListener('load',()=>{
const cells=Array.from(document.querySelectorAll('.cell'));
const result=document.getElementById("result");
result.innerHTML="It is "+player+"'s Turn.";
var background=document.createElement('audio');
background.src="public/sounds/background-music.mp3";
background.loop="true";
background.autoplay="true"; 
background.style.display="none";
background.play();
cells.forEach((cell,index)=>{
    cell.addEventListener('click',()=>play(cell,index,background));
});
});
var board=['','','','','','','','',''];
var gameCompleted=false;
function changePlayer(){
    if(player==='X')player='O';
    else player='X';
}
const winningChances=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function checkWinner(){
    for(var i=0;i<winningChances.length;i++){
        var chance=winningChances[i];
        if(board[chance[0]]==='' || board[chance[1]]==='' || board[chance[2]]==='')continue;
        if(board[chance[0]]===board[chance[1]] && board[chance[1]]===board[chance[2]]){
            if(board[chance[0]]==='X')return 'X';
            else return 'O';
        }
    }
    return null;
}
function gameOver(){
    for(var i=0;i<board.length;i++){
        if(board[i]==='')return false;
    }
    return true;
}
function announceWinner(winner){
    const winnerSound=document.createElement("audio");
    winnerSound.src = "public/sounds/completed-audio.wav";
    winnerSound.setAttribute("preload", "auto");winnerSound.setAttribute("controls", "none");
    winnerSound.style.display = "none";
    winnerSound.play();
    if(winner===null)result.innerHTML="Game is Tie,Reset to start new game.";
    else result.innerHTML="'"+winner+"' is Winner,Reset to start new game."
}
function isValid(index){
    if(board[index]==='')return true;
    return false;
}
function reset(){
    const cells=Array.from(document.querySelectorAll('.cell'));
    cells.forEach((cell)=>{
        cell.innerHTML="";
    });
    player='X';
    result.innerHTML="It is "+player+"'s Turn.";
    for(var i=0;i<board.length;i++)board[i]='';
    gameCompleted=false;
}
function play(cell,index,background){
    background.play();
    const error = document.createElement("audio");
    error.src = "public/sounds/error.wav";
    error.setAttribute("preload", "auto");error.setAttribute("controls", "none");
    error.style.display = "none";
    if(gameOver() || gameCompleted){
        error.play();
        setTimeout(()=>{
            alert("Game is over,start a new game");
        },100);
        return;
    }
    if(!isValid(index)){
        error.play();
        setTimeout(()=>{
            alert("Invalid Move,Selected Box is already Filled");
        },100);
        return;
    }
    const select = document.createElement("audio");
    select.src = "public/sounds/selected-audio.wav";
    select.setAttribute("preload", "auto");select.setAttribute("controls", "none");
    select.style.display = "none";
    var Height=45;
    if(window.outerWidth<992)Height=90;
    if(player==='X'){
        select.play();
        var height=1,width=1;
        clearInterval(null);
        const id=setInterval(()=>{
            if(height===Height){
                cell.innerHTML="<img class='icon' src='"+imageX+"' height='"+height+"px' width='"+width+"px' >";
                clearInterval(id);
            }
            else{
            cell.innerHTML="<img class='icon' src='"+imageX+"' height='"+height+"px' width='"+width+"px' >";
            height++;width++;
            }
        },10);
    }
    else{
        select.play();
        var height=1,width=1;
        clearInterval(null);
        const id=setInterval(()=>{
            if(height===Height){
                clearInterval(id);
            }
            else{
            cell.innerHTML="<img class='icon' src='"+imageO+"' height='"+height+"px' width='"+width+"px' >";
            height++;width++;
            }
        },10);
    }
    board[index]=player;
    changePlayer();
    const winner=checkWinner();
    if(winner==='X' || winner==='O'){
        announceWinner(winner);
        gameCompleted=true;
        return;
    }
    if(gameOver() && winner===null){
        announceWinner(null);
        return;
    }
    if(player==='X'){
        result.innerHTML="It is "+player+"'s Turn.";
    }
    else {
        result.innerHTML="It is "+player+"'s Turn.";
    }
}
