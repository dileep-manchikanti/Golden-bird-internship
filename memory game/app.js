var choices=[];
var player=1;
var gameOver;
var choosed=false;
var targets=[];
var sound;
function changePlayer(){
    if(player==1)player=2;
    else player=1;
    return player;
}
window.addEventListener('load',()=>{
    sound=document.createElement('audio');
    sound.src="public/sounds/background.mp3";
    sound.loop="true";
    sound.autoplay="true";
    sound.style.display="none";
    sound.play();
});
async function select(cell){
    var elements=Array.from(document.querySelectorAll('.block'));
    var element=elements[cell];
    element.classList.add("animation");
    var promise=new Promise(function(resolve){
        setTimeout(()=>{
            resolve(element);
        },1000);
        });
    var copy=await promise;
    copy.classList.remove("animation");
    choices.push(cell);
}
function restart(){
    player=1;
    gameOver=false;
    var player=document.getElementById("player");
    player.innerText="Player 1's Turn";
    sound.play();
    play();
}
function remove(start,index){
    var res=[];
    for(var i=0;i<start.length;i++){
        if(i!==index)res.push(start[i]);
    }
    return res;
}
async function play(){
    var elements=Array.from(document.querySelectorAll('.block'));
    var n=Math.ceil(Math.random()*4);
    var start=[0,1,2,3];
    targets=[];
    choices=[];
    var index;
    for(var i=0;i<n;i++){
        index=Math.floor(Math.random()*start.length);
        targets.push(start[index]);
        start=remove(start,index);
    } 
    for(var i=0;i<targets.length;i++){
        console.log(targets[i]);
        var element=elements[targets[i]];
        element.classList.add('animation');
        var promise=new Promise(function(resolve){
        setTimeout(()=>{
            resolve(element);
        },1000);
        });
        var copy=await promise;
        copy.classList.remove("animation");
    } 
}
function announceWinner(player){
    var element=document.getElementById("player");
    player=changePlayer(player);
    gameOver=true;
    element.innerText="Player "+player+" won the game.";
}
async function choose(){   
    if(gameOver){
        alert("Game over,start a new game");
        return;
    }
    if(choices.length!==targets.length){
        announceWinner(player);
        return;
    }
    else{
        for(var i=0;i<choices.length;i++){
            if(choices[i]!==targets[i]){
                announceWinner(player);
                return;
            }
        }
        console.log(choices);
        console.log(targets);
        changePlayer();
        var element=document.getElementById('player');
        if(player==1){
            element.innerText="Player 1's Turn";
        }
        else{
            element.innerText="Player 2's Turn";
        }
        setTimeout(()=>{
            play(); 
        },1000);
    }
}