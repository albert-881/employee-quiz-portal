// Import function to display an error message if login fails
import { errorMSG } from "./ui.js";

// This file is responsible for verifying login credentials 
// and directing users to their appropriate pages

// Hardcoded valid admin credentials
const validAdminEmail = 'admin@123.com';
const validAdminPassword = '4321';

// Hardcoded valid user credentials (for testing)
const validEmail = 'quinteroalberto88@gmail.com';
const validPassword = '8821';

// Function to retrieve user-entered credentials and start verification
export function setCredentails() {
  let email = document.querySelector('#email').value;  
  let password = document.querySelector('#password').value; 

  console.log('setCredentials function works');
  
  // Call the verify function to check credentials
  verify(email, password);
}

// Function to verify credentials and direct the user accordingly
export function verify(e, p) {
  console.log('verify function works');

  
  if (e === validEmail && p === validPassword) {
    window.location.href = 'quiz-list.html';  
  }
  
  else if (e === validAdminEmail && p === validAdminPassword) {
    window.location.href = 'demoAdmin.html'; 
  }
  // If credentials are incorrect, show an error message
  else {
    errorMSG(); 
  }
}
