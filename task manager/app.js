var tasks=[];
var completed=[];
colors=["fff0c8","ccead8","fee1d3","c8e6e9"];
// window.addEventListener('load',()=>{
//     document.querySelector('body').style.backgroundColor="red";
//     setTimeout(()=>{
//         document.querySelector('body').style.backgroundColor="white";
//     },1000);
// })
function addTask(){
    var taskList=document.getElementById('yourTasks');
    var task=document.getElementById('task');
    taskList.innerHTML="";
    if(task.value!=="" && tasks.indexOf(task.value)==-1)tasks.push(task.value);
    for(var i=0;i<tasks.length;i++){
    taskList.innerHTML+="<div class='card " +colors[i%4]+"' id='"+tasks[i]+"' onclick='markComplete(id)'><h3>"+tasks[i]+
    "</h3></div>";
    }
}
//
function reTask(task){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    var yes = document.getElementById("yes");
    var no = document.getElementById("no");
    modal.style.display="block";
    yes.onclick=()=>{
        completed=completed.filter((item)=>item!=task);
        modal.style.display="none";
        document.getElementById(task).remove();//extra
        refreshTask("CompletedTasks");
        return;
    }
    no.onclick=()=>{
        completed=completed.filter((item)=>item!=task);
        var taskList=document.getElementById('yourTasks');
        taskList.innerHTML="";
        tasks.push(task);
        for(var i=0;i<tasks.length;i++){
        taskList.innerHTML+="<div class='card " +colors[i%4]+"' id='"+task+"' onclick='markComplete(id)'><h3>"+tasks[i]+
        "</h3></div>";
        }
        modal.style.display="none";
        refreshTask("CompletedTasks");
        return;
    }
    span.onclick=()=>{
        modal.style.display="none";
    }
}
function markComplete(task){
    var completedList=document.getElementById('CompletedTasks');
    completed.push(task);
    completedList.innerHTML="";
    for(var i=0;i<completed.length;i++){
        completedList.innerHTML+="<div class='card " +"e7ffc4"+"' id='"+task+"' onclick='reTask(id)'><h3>"+completed[i]+"</h3></div>";
    }
    tasks=tasks.filter((item)=>item!=task);
    refreshTask("yourTasks");
}
function refreshTask(task){
    list=document.getElementById(task);
    list.innerHTML="";
    if(task==="CompletedTasks"){
        for(var i=0;i<completed.length;i++){
            list.innerHTML+="<div class='card " +"e7ffc4"+"' id='"+completed[i]+"' onclick='reTask(id)'><h3>"+completed[i]+"</h3></div>";
        }
    }
    else{
        for(var i=0;i<tasks.length;i++){
            list.innerHTML+="<div class='card " +colors[i%4]+"' id='"+tasks[i]+"' onclick='markComplete(id)'><h3>"+tasks[i]+"</h3></div>";
        }
    }
}