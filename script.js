const typingText=document.querySelector('.typing-test p')
const input=document.querySelector('.wrapper .input-field')
const time=document.querySelector('.time span b')
const mistakes=document.querySelector('.mistake span')
const wpm=document.querySelector('.wpm span')
const cpm =document.querySelector('.cpm span')
const btn=document.querySelector('button');

// set value
let timer;
let maxTime =60;
let timeLeft =maxTime;
let charIndex =0;
let mistake=0;
let istyping= false;


function loadParagraph(){
    const paragraph =[ "The way you smile you take my heart.","You are the most important person in your life.","Bring me back as soon as possible.","Only demonstrate your strength when it's really required .","Subscribe to drop X out"];
    const randomIndex=Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML='';
    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML+=`<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
     typingText.addEventListener("click", ()=>{
        input.focus() })

}

// Handle user input

 function initTyping(){
   const char= typingText.querySelectorAll('span');
   const typedchar=input.value.charAt(charIndex);
   if(charIndex < char.length && timeLeft > 0){

    if(!istyping){
        timer =setInterval(iniTime , 1000);
        istyping=true;
    }
    if(char[charIndex].innerText===typedchar){
         char[charIndex].classList.add('correct');
        console.log("correct");
     }
    else{
        mistake++;
         char[charIndex].classList.add('incorrect');
        console.log("incorrect");
     }
    charIndex++;
    char[charIndex].classList.add('active');
    mistakes.innerText=mistake;
    cpm.innerText=charIndex-mistake;
   } 
   else{
    clearInterval(timer);
    
   }

 }
function iniTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal =Math.round(((charIndex - mistake)/5)/(maxTime - timeLeft)*60);
         wpm.innerText=wpmVal;
    }
    else{
        clearInterval(timer);

    }
}
function reset(){
    loadParagraph();
    clearInterval(timer);
     timeLeft =maxTime;
     time.innerText=timeLeft;
     input.value='';
     charIndex =0;
   mistake=0;
  istyping= false;
  wpm.innerText=0;
  cpm.innerText=0;
  mistakes.innerText=0;

}
input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();