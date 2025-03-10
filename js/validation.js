import { validateUser } from "./backendLogic.js";

const adminEmail = 'quinteroalberto88@gmail.com';
const adminPassword = '4321';

// This file is responsible for verifying login credentials 
// and directing users to their appropriate pages

export async function setCredentails() {
// Check if the user is an admin
  let email = document.querySelector('#email').value;  
  let password = document.querySelector('#password').value;

  if (email === adminEmail && password === adminPassword) {
    window.location.href = 'demoAdmin.html';
  return;
  }

  let role = await validateUser(email, password);
  console.log(role);
}

export function clearCredentials(){
  document.querySelector('#email').value = '';
  document.querySelector('#password').value = '';
}
