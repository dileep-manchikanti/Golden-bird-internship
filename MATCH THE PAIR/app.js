var random=[
    'a1','a2','a3','a4','a5','a6','a7','a8',
    'a1','a2','a3','a4','a5','a6','a7','a8'
];
var result=[],count=0   ;
var previous={
    cell:"",
    index:null
};
window.addEventListener('load',()=>{
    const cells=Array.from(document.querySelectorAll('.cell'));
    random=generateRandomImages(random);
    for(let i=0;i<random.length;i++){
        cells[i].style.backgroundSize='cover';
        cells[i].style.backgroundColor="#2DC7FF"
        cells[i].style.backgroundSize="cover";
        cells[i].style.backgroundPosition="center";
    }
    sound=document.createElement('audio');
    sound.src="public/background.mp3";
    sound.loop="true";
    sound.autoplay="true";
    sound.style.display="none";
    cells.forEach((cell,index)=>{
        cell.addEventListener('click',()=>play(cell,index,sound));
    })
});
function generateRandomImages(cells){
    let index=16,i;
    let random=[];
    while(index>0){
        i=Math.floor(Math.random()*cells.length);
        random.push(cells.splice(i,1));
        index--;
    }
    return random;
}
function restart(){
    window.location="./";
}
async function play(cell,index,sound){
    if(result.length==16){
       alert("Game over");
       return;
    }
    sound.play();
    if(result.indexOf(index)!=-1)return;
    cell.style.backgroundImage="url('./public/images/"+ random[index]+".JPG')";
    if(previous.index!=null && previous.index!=index && random[previous.index].toString()===random[index].toString()){
        previous.cell.style.backgroundImage="url('./public/images/"+random[previous.index]+".jpg')";
        result.push(index);
        result.push(previous.index);
        if(result.length==16)
        {
            setTimeout(()=>{
                alert('Game is Over');
            },800);
        }
        return;
    }
    var promise=new Promise(function(resolve){
        setTimeout(()=>{
            resolve(cell);
        },400);
        });
    var copy=await promise;
    copy.style.backgroundImage="url('public/images/icon.jpg')";
    count++;
    document.querySelector('#result').innerText="Total Taps: "+count;
    previous.index=index;
    previous.cell=cell;
}