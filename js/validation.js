import { errorMSG } from "./ui.js";

//this will be used to go through the employees and see if the email and password exist and will direct them to their tailored webpage
//let employees = JSON.parse(localStorage.getItem('employees')) || []; 

const validAdminEmail = 'admin@123.com';
const validAdminPassword = '4321';

const validEmail = 'quinteroalberto88@gmail.com'
const validPassword = '8821';

export function setCredentails() {
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;
  console.log('setCredentials function works');
  verify(email, password);
}

export function verify(e, p) {
  
    
  console.log('verify function works');
  if (e === validEmail && p === validPassword) {
    window.location.href = 'quiz-list.html';
  }
  else if (e === validAdminEmail && p === validAdminPassword){
    window.location.href = 'demoAdmin.html';
  }
  else {
    errorMSG();
  }
}