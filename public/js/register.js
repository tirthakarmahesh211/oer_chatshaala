// jshint esversion:8

var choice1=document.querySelector('#choice1');
var choice2=document.querySelector('#choice2');
var login=document.querySelector('#Login');
var sign=document.querySelector('#SignUp');
var msg=document.querySelector('#message');
console.log(msg);
if(msg.innerHTML==='Successfuly Registered, Kindly Login'||msg.innerHTML==='Already Registered, Kindly Login'){
  login.classList.remove('hidden');
  sign.classList.add('hidden');
}else{
  login.classList.add('hidden');
  sign.classList.remove('hidden');
}
choice1.addEventListener('click',function(){
  login.classList.remove('hidden');
  sign.classList.add('hidden');
});
choice2.addEventListener('click',function(){
  login.classList.add('hidden');
  sign.classList.remove('hidden');
});
