import { saveQuiz, createQuiz } from "./database.js";

const loginVerification = document.querySelector('#login-form');
const message = document.createElement('p');

// Display quizzes for the logged-in user
export function showQuizzes() {
    // Retrieve the logged-in user's email
    let loggedInEmail = localStorage.getItem('loggedInUser');
    if (!loggedInEmail) {
        console.log("No user logged in.");
        document.querySelector('#quiz-list').innerHTML = "<p>Please log in to see your quizzes.</p>";
        return;
    }

    console.log(`Logged-in user: ${loggedInEmail}`);

    // Retrieve employees and find the logged-in user
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    let loggedInUser = employees.find(emp => emp.name === loggedInEmail);

    if (!loggedInUser || !loggedInUser.assignedQuizzes || loggedInUser.assignedQuizzes.length === 0) {
        console.log("No quizzes assigned to this user.");
        document.querySelector('#quiz-list').innerHTML = "<p>No quizzes assigned to your account.</p>";
        return;
    }

    console.log('Loaded assigned quizzes:', loggedInUser.assignedQuizzes);

    const quizlistContainer = document.querySelector('#quiz-list');
    quizlistContainer.innerHTML = ''; // Clear previous content

    // Display only the quizzes assigned to the logged-in user
    loggedInUser.assignedQuizzes.forEach(q => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');

        quizCard.innerHTML = `
            <h3>${q.quizName}</h3>
            <p>${q.quizDescription}</p>
            <button class="start-btn">Start Quiz</button>
        `;

        quizCard.querySelector('.start-btn').addEventListener('click', () => {
            alert(`Starting quiz: ${q.quizName}`);
        });

        quizlistContainer.appendChild(quizCard);
    });
}


// Display quizzes for the admin panel
export function showadminQuizzes() {
    const adminquizContainer = document.querySelector('#quiz-list-items');
    if (!adminquizContainer) return;

    adminquizContainer.innerHTML = ''; // Clear previous content
    let quizzes = JSON.parse(localStorage.getItem('quiz')) || [];

    console.log('Loaded quizzes from storage:', quizzes);

    if (quizzes.length === 0) {
        adminquizContainer.innerHTML = "<p>No quizzes available.</p>";
        return;
    }

    quizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');

        quizCard.innerHTML = `
            <h3>${quiz.quizName || "Unnamed Quiz"}</h3>
            <p>${quiz.quizDescription || "No description available."}</p>
            <button class="btn">View Quiz</button>
        `;

        quizCard.querySelector('.btn').addEventListener('click', () => {
            alert(`Viewing quiz: ${quiz.quizName}`);
        });

        adminquizContainer.appendChild(quizCard);
    });
}

// Developer menu for creating quizzes
export function showMenu() {  
    let quizName = prompt('Enter the name of the new quiz');
    let quizDescription = prompt('Enter a description for your quiz');
    let quizRole = prompt('Who is this quiz for?\n1: Software Engineer\n2: Nurse\n3: CNA\n4: RV/LVM');

    const roles = { '1': 'software engineer', '2': 'nurse', '3': 'cna', '4': 'rvlvm' };
    quizRole = roles[quizRole] || alert('Invalid option');

    if (!quizRole) return; // Exit if role selection was invalid

    console.log(`Creating Quiz: ${quizName} | ${quizDescription} | Role: ${quizRole}`);
    let newQuiz = createQuiz(quizName, quizDescription, quizRole);
    saveQuiz(newQuiz);
}

// Display error message on invalid login
export function errorMSG() {
    message.textContent = 'Invalid Email or Password';
    loginVerification.appendChild(message);
}
