import { saveQuiz } from "./database.js";

const loginVerification = document.querySelector('#login-form');
const message = document.createElement('p');

export function showQuizzes() {
    const quizlistContainer = document.querySelector('#quiz-list');
    if (!quizlistContainer) return; // Prevent errors if element is missing

    quizlistContainer.innerHTML = ''; // Clear previous content

    let quiz = JSON.parse(localStorage.getItem('quiz')) || [];

    console.log('Loaded quizzes from storage:', quiz); // Debugging

    quiz.forEach(q => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');

        const quizName = document.createElement('h3');
        quizName.textContent = q.name;

        const quizDesc = document.createElement('p');
        quizDesc.textContent = q.desc;

        const startBtn = document.createElement('button');
        startBtn.textContent = 'Start Quiz';
        startBtn.classList.add('start-btn');
        startBtn.addEventListener('click', () => {
            alert(`Starting quiz: ${q.name}`);
        });

        quizCard.appendChild(quizName);
        quizCard.appendChild(quizDesc);
        quizCard.appendChild(startBtn);
        quizlistContainer.appendChild(quizCard);
    });
}

export function showadminQuizzes() {
    const adminquizContainer = document.querySelector('#quiz-list-items');
    if (!adminquizContainer) return; // Prevents errors if the element is missing

    adminquizContainer.innerHTML = ''; // Clears previous content

    let quizzes = JSON.parse(localStorage.getItem('quiz')) || []; // Retrieve quizzes

    console.log('Loaded quizzes from storage:', quizzes); // Debugging

    // Display message if no quizzes are found
    if (quizzes.length === 0) {
        const noQuizMessage = document.createElement('p');
        noQuizMessage.textContent = "No quizzes available.";
        adminquizContainer.appendChild(noQuizMessage);
        return;
    }

    // Loop through each quiz and create a card
    quizzes.forEach(quiz => {
        // Create card container
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');

        // Quiz Title
        const quizName = document.createElement('h3');
        quizName.textContent = quiz.quizName || "Unnamed Quiz";

        // Quiz Description
        const quizDesc = document.createElement('p');
        quizDesc.textContent = quiz.quizDescription || "No description available.";

        // Start Quiz Button
        const startBtn = document.createElement('button');
        startBtn.textContent = 'View Quiz';
        startBtn.classList.add('btn'); // Use the same `.btn` class for styling
        startBtn.addEventListener('click', () => {
            alert(`Viewing quiz: ${quiz.quizName}`);
        });

        // Append elements to card
        quizCard.appendChild(quizName);
        quizCard.appendChild(quizDesc);
        quizCard.appendChild(startBtn);

        // Append card to container
        adminquizContainer.appendChild(quizCard);
    });
}

export function showMenu() {  // "showMenu" is a more intuitive name for the menu function
        
    
        let quizName = prompt('Enter the name of the new quiz');
        console.log(`Quiz name: ${quizName}`);
        
        let quizDescription = prompt('Enter a description for your quiz');
        console.log(`Description: ${quizDescription}`);
        
        let newQuiz = createQuiz(quizName, quizDescription);
        saveQuiz(newQuiz);
    
}

export function errorMSG(){
    message.innerHTML = '';
    message.innerHTML = 'Invalid Email or Password';
    loginVerification.appendChild(message);
}
