// scroll reveal
const reveals=document.querySelectorAll('.reveal');

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('active');
}
});
},{threshold:.15});

reveals.forEach(el=>observer.observe(el));

// simple chatbot demo
function sendMessage(){
const input=document.getElementById('userInput');
const chat=document.getElementById('chatBox');
if(!input || !input.value.trim()) return;

let user=document.createElement('div');
user.className='user-msg';
user.textContent=input.value;
chat.appendChild(user);

let text=input.value.toLowerCase();
input.value='';

setTimeout(()=>{
let bot=document.createElement('div');
bot.className='bot-msg';

if(text.includes('website')){
bot.textContent='We build modern websites, web apps and SaaS platforms.';
}
else if(text.includes('wifi')||text.includes('network')){
bot.textContent='We provide networking and Wi-Fi deployment solutions.';
}
else if(text.includes('ai')){
bot.textContent='We develop AI solutions, chatbots and automation systems.';
}
else{
bot.textContent='Thanks for contacting ChopaTech. Ask me about AI, websites or networking.';
}

chat.appendChild(bot);
chat.scrollTop=chat.scrollHeight;
},700);
}