import { viewQuizzes, getUserQuestions } from "./backendLogic.js";

const loginForm = document.querySelector("#login-form");
const message = document.createElement("p");

// Store quizzes in sessionStorage
export function storeQuizzes(data) {
    sessionStorage.removeItem('quizzes');
    sessionStorage.setItem("quizzes", JSON.stringify(data));
}

// Store questions in sessionStorage
export function storeQuestions(questions) {
    sessionStorage.setItem("questions", JSON.stringify(questions));
}

// Retrieve and display quizzes for the logged-in user
export function showQuizzes() {
    const quizlistContainer = document.querySelector("#quiz-list");
    quizlistContainer.innerHTML = ""; // Clear previous content

    // Load quizzes from sessionStorage
    const storedQuizzes = JSON.parse(sessionStorage.getItem("quizzes")) || [];
    console.table("Loaded quizzes:", storedQuizzes);

    if (storedQuizzes.length === 0) {
        quizlistContainer.innerHTML = "<p>No quizzes available.</p>";
        return;
    }

    storedQuizzes.forEach(quiz => {
        const quizCard = document.createElement("div");
        quizCard.classList.add("quiz-card");

        quizCard.innerHTML = `
            <h3>${quiz.quizName.S}</h3>
            <p>${quiz.quizDescription.S}</p>
            <button class="start-btn">Start Quiz</button>
        `;

        // Handle quiz selection
        quizCard.querySelector(".start-btn").addEventListener("click", async () => {
            sessionStorage.setItem("currQuizId", quiz.id.S);
            const questions = await getUserQuestions(quiz.id.S);
            storeQuestions(questions);
            window.location.href = "startQuiz.html";
        });

        quizlistContainer.appendChild(quizCard);
    });
}

// Display quizzes for the admin panel
export async function showadminQuizzes() {
    const data = await viewQuizzes();
    
    const adminquizContainer = document.querySelector("#quiz-list-items");
    
    if (!adminquizContainer) return;

    adminquizContainer.innerHTML = ""; // Clear previous content

    if (data.length === 0) {
        adminquizContainer.innerHTML = "<p>No quizzes available.</p>";
        return;
    }

    data.forEach(quiz => {
        const quizCard = document.createElement("div");
        quizCard.classList.add("quiz-card");

        quizCard.innerHTML = `
            <h3>${quiz.quizName.S || "Unnamed Quiz"}</h3>
            <p>${quiz.quizDescription.S || "No description available."}</p>
            <button class="btn">View Quiz</button>
        `;

        // Handle admin quiz view
        quizCard.querySelector(".btn").addEventListener("click", async () => {
            console.log(`Viewing quiz: ${quiz.quizName.S}`);
            const questions = await getUserQuestions(quiz.id.S);
            storeQuestions(questions);
            window.location.href = "startQuiz.html";
        });

        adminquizContainer.appendChild(quizCard);
    });
}

// Handle logout functionality
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector("#logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.clear();
            window.location.href = "index.html";
        });
    }
});

// Display error message on invalid login
export function errorMSG() {
    message.textContent = "Invalid Email or Password";
    loginForm.appendChild(message);
}
