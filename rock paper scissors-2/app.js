window.addEventListener('load',()=>{
    const yourScore=document.getElementById("yourScore");
    const compScore=document.getElementById("compScore"); 
    const rock=document.getElementById("rock");
    const paper=document.getElementById("paper");
    const scissors=document.getElementById("scissors");
    const popUp=document.getElementById('popUp');
    popUp.style.display="none";
    const result=document.getElementById('result');
    var background=document.createElement('audio');
    background.src="public/sounds/background-music.mp3";
    background.loop="true";
    background.autoplay="true"; 
    background.style.display="none";
    background.play();
    rock.addEventListener('click',(e)=>play(e,background));
    paper.addEventListener('click',(e)=>play(e,background));
    scissors.addEventListener('click',(e)=>play(e,background));
});
var user=0;
var comp=0;
function compPlay(){
    const choice=Math.floor(Math.random()*3)
    switch(choice){
        case 0:return "rock";
        case 1:return "paper";
        case 2:return "scissors";
    }
}

function decideWinner(choice,compChoice){
    if(choice===compChoice)return "tie";
    if(choice==="rock"){
        if(compChoice==="paper")return "comp";
        else return "user";
    }
    if(choice==="paper"){
        if(compChoice==="rock")return "user";
        else return "comp";
    }
    if(choice==="scissors"){
        if(compChoice==="rock")return "comp";
        else return "user";
    }
}

function gameOver(){
    if(user===5 || comp===5)return true;
    return false;
}

function reset(){
    user=0;
    comp=0;
    yourScore.innerHTML=user;
    compScore.innerHTML=comp;
    result.style.display="none";
    rock.classList.remove("active");paper.classList.remove("active");scissors.classList.remove("active");
}

function play(e,background){
    if(gameOver())
    {
        const error = document.createElement("audio");
        error.src = "public/sounds/error.wav";
        error.setAttribute("preload", "auto");error.setAttribute("controls", "none");
        error.style.display = "none";
        error.play();
        setTimeout(()=>{
            alert("Game is over,start a new game");
        },100);return;
    }
    background.play();
    result.innerHTML="";
    const select = document.createElement("audio");
    select.src = "public/sounds/selected-audio.wav";
    select.setAttribute("preload", "auto");select.setAttribute("controls", "none");
    select.style.display = "none";
    select.play();
    result.style.display="none";
    popUp.style.display="block";
    setTimeout(()=>{
        popUp.style.display="none";
        result.style.display="block";
    },1500);
    if(e.target.id==="rock"){
        paper.classList.remove("active");
        scissors.classList.remove("active");
        rock.classList.add("active");
    }
    if(e.target.id==="paper"){
        rock.classList.remove("active");
        scissors.classList.remove("active");
        paper.classList.add("active");
    }
    if(e.target.id==="scissors"){
        paper.classList.remove("active");
        rock.classList.remove("active");
        scissors.classList.add("active");
    }
    const compChoice=compPlay();
    const winner=decideWinner(e.target.id,compChoice);
    if(winner==="user"){
        user+=1;
        yourScore.innerText=user;
        result.innerHTML='<span"> YouWon,';
    }
    else if(winner==="comp"){
        comp+=1;
        compScore.innerText=comp;
        result.innerHTML='<span">You Lost,'
    }
    else{
        result.innerHTML='<span> It is Tie,</span>'
    }
    result.innerHTML+="Computer chose  <i class='fa fa-hand-"+compChoice+"-o fa-lg'></i>";
    if(gameOver()){
        alert("Game is Over, Winner is "+winner);
    }
}