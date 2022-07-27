var index=1;
var start=1;
var gameOver=false;
var words=["Abuse","Adult","Agent","Anger","Apple","Award","Basis" ,"Beach","Birth","Block","Blood","Board","Brain","Bread","Break","Brown","Buyer","Cause","Chain","Chair","Chest","Chief","Child","China","Claim","Class","Clock","Coach","Coast","Court","Cover","Cream","Crime","Cross","Crowd","Crown","Cycle","Dance","Death","Depth","Doubt","Draft","Drama","Dream","Dress","Drink","Drive","Earth","Enemy","Entry","Error","Event","Faith","Fault","Field","Fight","Final","Floor","Focus","Force","Frame","Frank","Front","Fruit","Glass","Grant","Grass","Green","Group","Guide","Heart","Henry","Horse","Hotel","House","Image","Index","Input","Issue","Japan","Jones","Judge","Knife","Laura","Layer","Level","Lewis","Light","Limit","Lunch","Major","March","Match","Metal","Model","Money","Month","Motor","Mouth","Music","Night","Noise","North","Novel","Nurse","Offer","Order","Other","Owner","Panel","Paper","Party","Peace","Peter","Phase","Phone","Piece","Pilot","Pitch","Place","Plane","Plant","Plate","Point","Pound","Power","Press","Price","Pride","Prize","Proof","Queen","Radio","Range","Ratio","Reply",
"Right","River","Round","Route","Rugby","Scale","Scene","Scope","Score","Sense","Shape","Share","Sheep","Sheet","Shift","Shirt","Shock","Sight","Simon","Skill","Sleep","Smile","Smith","Smoke","Sound","South","Space","Speed","Spite","Sport","Squad","Staff","Stage","Start","State","Steam","Steel","Stock","Stone","Store","Study","Stuff","Style","Sugar","Table","Taste","Terry","Theme","Thing","Title","Total","Touch","Tower","Track","Trade","Train","Trend","Trial","Trust","Truth","Uncle","Union","Unity","Value","Video","Visit","Voice","Waste","Watch","Water","While","White","Whole","Woman","World","Youth"];
var word=[];
var target;
window.addEventListener('load',()=>{
    target=words[Math.floor(Math.random()*words.length)]
    target=target.toUpperCase();
    console.log(target);
    console.log(window.innerWidth.valueOf());
    console.log(window.innerWidth<992); 
    if(window.innerWidth<992)document.querySelector('.keyboard').style.visibility="visible";
})
function wordle(letter){
    if(letter==="Backspace"){
        if(index>start){
        index--;
        element=document.getElementById(index.toString());
        element.innerText="";
        word.pop();
        console.log(word);
        }
    }
    else{
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
    }
}
window.addEventListener('click',(event)=>{
    var letter=event.target.id;
    wordle(letter);
})
window.addEventListener('keyup',(event)=>{
    if(gameOver){
        alert("Game is over!");
        return;
    }
    var element=null;
    console.log(event.target.id);
    var letter=event.key;
    wordle(letter);
});
function restart(){
    window.location="/";
}
function submit(index){
    if(index===31){
        gameOver=true;
        alert("Game Over");
        return;
    }
    if((index-start)!=5)return;
    var element=null,won=true;
    for(var i=0;i<5;i++){
        element=document.getElementById((start+i).toString());
        if(target.indexOf(word[i])==-1){
            element.classList.add("grey");
            won=false;
        }
        else{
            if(target.indexOf(word[i])===i)element.classList.add("green");
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