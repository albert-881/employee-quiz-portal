import { errorMSG } from "./ui.js";
const adminEmail = 'quinteroalberto88@gmail.com';
const adminPassword = '4321';

// This file is responsible for verifying login credentials 
// and directing users to their appropriate pages

// Function to retrieve user-entered credentials and start verification
export function setCredentails() {
  let email = document.querySelector('#email').value;  
  let password = document.querySelector('#password').value;

  if(email === adminEmail && password === adminPassword){
    window.location.href = 'demoAdmin.html';
    return;
  }

  let employees = JSON.parse(localStorage.getItem('employees')) || [];

  let userFound = false;  // Flag to check if the user is found

  // Loop through employees to find the matching email
  for (let i = 0; i < employees.length; i++) {
    if (email === employees[i].name) {  // Check if email matches
      console.log('User found:', employees[i]);

      // Now, check if the password is correct
      if (password === employees[i].password) {
        console.log('Password correct, logging in...');

        userFound = true;
        // Redirect
        window.location.href = 'quiz-list.html';  // Regular user page
        
        break;  // Exit loop after successful login
      } 
      else {
        console.log('Incorrect password');
        errorMSG();  
        return; 
      }
    }
  }

  
  if (!userFound) {
    console.log('User not found');
    errorMSG(); 
  }
}
