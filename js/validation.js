import { errorMSG } from "./ui.js";

const validEmail = 'quinteroalberto88@gmail.com';
const validPassword = '1234'; 

export function test() {
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;
  console.log('test function works');
  verify(email, password);
}

export function verify(e, p) {
  
    
  console.log('verify function works');
  if (e === validEmail && p === validPassword) {
    window.location.href = 'quiz-list.html';
  } 
  else {
    errorMSG();
  }
}