import { validateUser } from "./backendLogic.js";
import { getUserQuizzes } from "./backendLogic.js";
import { storeQuizzes } from "./ui.js";

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

  let { role } = await validateUser(email, password);
  if (!role){
    return;
  }
  sessionStorage.removeItem('currUser');
  sessionStorage.setItem("currUser", JSON.stringify({ email, role }));
  console.log(`the role is ${role}`);

  //first grab the quizzes and store them in userQuizzes then use that information to populate the ui. 
  const userQuizzes = await getUserQuizzes(email, role);
  
  if (userQuizzes.length > 0) {
    storeQuizzes(userQuizzes); // Store quizzes in sessionStorage
    window.location.href = 'quiz-list.html'; // Navigate to quiz list. this should rememeber 
  } else {
    console.log("No quizzes found for the user.");
  }
}
