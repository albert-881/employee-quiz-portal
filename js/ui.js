import { viewQuizzes } from "./backendLogic.js";
import { getUserQuestions } from "./backendLogic.js";

const loginVerification = document.querySelector('#login-form');
const message = document.createElement('p');



export function storeQuizzes(data) {
    sessionStorage.removeItem('quizzes');
    console.log("Storing quizzes:", data);
    sessionStorage.setItem('quizzes', JSON.stringify(data));  // Store quizzes as JSON
}
export function storeQuestions(questions) {
    sessionStorage.removeItem('questions');
    console.log("Storing questions:", questions);
    sessionStorage.setItem('questions', JSON.stringify(questions));
}
  
// Retrieve and display quizzes for the logged-in user
export function showQuizzes() {
    const quizlistContainer = document.querySelector('#quiz-list');
    quizlistContainer.innerHTML = ''; // Clear previous content
  
    // Retrieve quizzes from sessionStorage
    let storedQuizzes = JSON.parse(sessionStorage.getItem('quizzes')) || [];
    console.log("Loaded quizzes from sessionStorage:", storedQuizzes);
  
    if (storedQuizzes.length === 0) {
      quizlistContainer.innerHTML = "<p>No quizzes available.</p>";
      return;
    }
  
    for(let i = 0; i < storedQuizzes.length; i++){
      const quizCard = document.createElement('div');
      quizCard.classList.add('quiz-card');
  
      quizCard.innerHTML = `
        <h3>${storedQuizzes[i].quizName.S}</h3>
        <p>${storedQuizzes[i].quizDescription.S}</p>
        <button class="start-btn">Start Quiz</button>
      `;
  
      // Make the event handler function async
      quizCard.querySelector('.start-btn').addEventListener('click', async () => {
        sessionStorage.removeItem('currQuizId');
        sessionStorage.setItem('currQuizId', storedQuizzes[i].id.S);

        let questions = await getUserQuestions(storedQuizzes[i].id.S);

        storeQuestions(questions);
        window.location.href = 'startQuiz.html'; // Uncomment when ready
      });
  
      quizlistContainer.appendChild(quizCard);
    }
}


// Display quizzes for the admin panel
export async function showadminQuizzes() {
    let data = await viewQuizzes();
    
    const adminquizContainer = document.querySelector('#quiz-list-items');
    if (!adminquizContainer) return;

    adminquizContainer.innerHTML = ''; // Clear previous content


    if (data.length === 0) {
        adminquizContainer.innerHTML = "<p>No quizzes available.</p>";
        return;
    }

    for(let i = 0; i < data.length; i++){
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');

        quizCard.innerHTML = `
            <h3>${data[i].quizName.S || "Unnamed Quiz"}</h3>
            <p>${data[i].quizDescription.S || "No description available."}</p>
            <button class="btn">View Quiz</button>
        `;

        quizCard.querySelector('.btn').addEventListener('click', () => {
            alert(`Viewing quiz: ${data[i].quizName.S}`);
        });

        adminquizContainer.appendChild(quizCard);
    }
}
// Display error message on invalid login
export function errorMSG() {
    message.textContent = 'Invalid Email or Password';
    loginVerification.appendChild(message);
}
