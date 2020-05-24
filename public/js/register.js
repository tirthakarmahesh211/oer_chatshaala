
var choice1=document.querySelector('#choice1');
var choice2=document.querySelector('#choice2');
var login=document.querySelector('#Login');
var sign=document.querySelector('#SignUp');
choice1.addEventListener('click',function(){
  login.classList.remove('hidden');
  sign.classList.add('hidden');
});
choice2.addEventListener('click',function(){
  login.classList.add('hidden');
  sign.classList.remove('hidden');
});
