import { errorMSG } from "./ui.js";

const adminEmail = 'quinteroalberto88@gmail.com';
const adminPassword = '4321';

// This file is responsible for verifying login credentials 
// and directing users to their appropriate pages

export function setCredentails() {
  let email = document.querySelector('#email').value;  
  let password = document.querySelector('#password').value;

  // Check if the user is an admin
  if (email === adminEmail && password === adminPassword) {
    localStorage.setItem('loggedInUser', email);  // Store admin email
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
        
        // Store the logged-in user in localStorage
        localStorage.setItem('loggedInUser', email);

        // Redirect user to the quiz page
        window.location.href = 'quiz-list.html';
        return;
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
