var index=1;
var start=1;
var gameOver=false;
var words=[['K','U','M','A','R']];
var word=[];
window.addEventListener('load',()=>{

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
        if(letter.charCodeAt(0))
        if(index-start>=5)return;
        var letter=event.key;
        letter=letter.toUpperCase();
        element=document.getElementById(index.toString());
        element.classList.add('letter');
        element.innerText=letter;
        word.push(letter);
        console.log(word);
        index++;
    }
});
function submit(){
    console.log(index-start);
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