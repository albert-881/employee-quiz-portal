import { errorMSG } from "./ui.js";
import { validateUser } from "./backendLogic.js";

const adminEmail = 'quinteroalberto88@gmail.com';
const adminPassword = '4321';

// This file is responsible for verifying login credentials 
// and directing users to their appropriate pages

export async function setCredentails() {
  let email = document.querySelector('#email').value;  
  let password = document.querySelector('#password').value;

  // Check if the user is an admin
 if (email === adminEmail && password === adminPassword) {
   window.location.href = 'demoAdmin.html';
  return;
  }
  let answer = await validateUser(email, password);
  console.log(answer);
}
