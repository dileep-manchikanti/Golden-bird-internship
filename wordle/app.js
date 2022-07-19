var index=1;
var start=1;
var gameOver=false;
var words=["KUMAR"];
var word=[];
window.addEventListener('load',()=>{
    var reader=new FileReader();
    reader.onload = function(e) {
        var text = reader.result;
        console.log(text);
    };
    reader.readAsText("data.txt");
})
window.addEventListener('keyup',(event)=>{
    if(gameOver){
        alert("Game is over!");
        return;
    }
    var element=null;
    if(event.key==="Backspace"){
        if(index>start){
        index--;
        element=document.getElementById(index.toString());
        element.innerText="";
        word.pop();
        console.log(word);
        }
    }
    else{
        var letter=event.key;
        if(letter==='Enter'){
            submit(index);
            return;
        }
        if(letter.length>1)return;
        if(!((letter.charCodeAt(0)>=65 && letter.charCodeAt(0)<=90) || (letter.charCodeAt(0)>=97 && letter.charCodeAt(0)<=122)))return;
        if(index-start>=5)return;
        letter=letter.toUpperCase();
        element=document.getElementById(index.toString());
        element.innerText=letter;
        word.push(letter);
        index++;
        console.log(index,start);
    }
});
function restart(){
    window.location="/";
}
function submit(index){
    console.log(index);
    if(index===31){
        gameOver=true;
        alert("Game Over");
        return;
    }
    if((index-start)!=5)return;
    var element=null,won=true;
    for(var i=0;i<5;i++){
        element=document.getElementById((start+i).toString());
        if(words[0].indexOf(word[i])==-1){
            element.classList.add("grey");
            won=false;
        }
        else{
            if(words[0].indexOf(word[i])===i)element.classList.add("green");
            else {
                element.classList.add("yellow");
                won=false;
            }
        }
    }
    if(won){
        gameOver=true;
        setTimeout(()=>{
            alert("Game is Over");
        },500);
    }
    start+=5;
    word=[];
}