var choices=[];
var player=1;
var looser;
var choosed=false;
var targets=[];
function changePlayer(){
    if(player==1)player=2;
    else player=1;
}
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
    looser=null;
    var player1=document.getElementById("player1");
    var player2=document.getElementById("player2");
    player1.innerText="Player 1's Turn";
    player2.innerText="";
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
    if(looser!=null){
        alert("Game over,start a new game");
        return;
    }
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
function announceWinner(Looser){
    looser=Looser;
    var looser=document.getElementById("player"+Looser);
    changePlayer(Looser);
    var Winner=document.getElementById("player"+player);
    console.log(player,Looser);
    looser.innerText="Player "+Looser+" lost the game.";
    Winner.innerText="Player "+player+" won the game.";
    console.log("player"+looser+" lost the game");
}
async function choose(){   
    if(looser!=null){
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
        var element1=document.getElementById('player1');
        var element2=document.getElementById('player2');
        if(player==1){
             
            console.log(element1);
            element2.innerText="";
            element1.innerText="Player 1's Turn";
        }
        else{
            
            console.log(element2);
            element1.innerHTML="";
            element2.innerText="Player 2's Turn";
        }
        setTimeout(()=>{
            play(); 
        },1000);
    }
}