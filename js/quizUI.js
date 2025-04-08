import { completeQuiz, getUserQuizzes } from "./backendLogic.js";
import { storeQuizzes } from "./ui.js";
import { storeGrade } from "./backendLogic.js";

/* =====================================
   Calculate Quiz Grade & Show Results
===================================== */
async function getGrade(answers) {
    const storedQuestions = JSON.parse(sessionStorage.getItem("questions")) || [];
    let correctCount = 0;

    storedQuestions.forEach((question, index) => {
        const correctAnswer = question.correctAnswer.S;
        if (answers[`question-${index}`] === correctAnswer) {
            console.log(`Question ${index} is correct`);
            correctCount++;
        }
    });
    
    const totalQuestions = storedQuestions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    // Display results in result card
    const resultCard = document.getElementById("resultCard");
    const resultMessage = document.getElementById("resultMessage");
    resultMessage.innerHTML = `Correct Answers: ${correctCount}/${totalQuestions}<br><br>Score: ${score}%`;
    resultCard.style.display = "block";

    // Save quiz completion and handle redirection
    const currQuizId = sessionStorage.getItem("currQuizId");
    const currUser = JSON.parse(sessionStorage.getItem("currUser"));
    await completeQuiz(currQuizId, currUser.email);
    let today = new Date();
    await storeGrade(today, score, currUser.email, currUser.role, currQuizId);

    document.getElementById("closeResultCard").addEventListener("click", async () => {
        resultCard.style.display = "none"; // Close result card

        const userQuizzes = await getUserQuizzes(currUser.email, currUser.role);
        storeQuizzes(userQuizzes);
        window.location.href = "quiz-list.html";
    });
}

/* =====================================
   Display Questions Dynamically
===================================== */
export function showQuestions() {

    const currUser = sessionStorage.getItem("currUser");

    if (!currUser || currUser === "null" || currUser === "undefined" || currUser.trim() === "") {
        const submitButton = document.querySelector("#submitQuizButton");
        submitButton.style.display = 'none';
    }

    const quizForm = document.getElementById("quizForm");
    const storedQuestions = JSON.parse(sessionStorage.getItem("questions")) || [];

    if (storedQuestions.length === 0) {
        quizForm.innerHTML = "<p>No questions available.</p>";
        return;
    }

    storedQuestions.forEach((question, i) => {
        const questionBlock = document.createElement("div");
        questionBlock.classList.add("question-block");

        // Create question header
        questionBlock.innerHTML = `<p><strong>${i + 1}. ${question.questionText.S || "No question text available"}</strong></p>`;

        // Create options container
        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options-container");

        // Generate options if available
        if (Array.isArray(question.options.SS)) {
            question.options.SS.forEach((option, j) => {
                const radioId = `q${i}-option${j}`;

                const optionInput = document.createElement("input");
                optionInput.type = "radio";
                optionInput.name = `question-${i}`;
                optionInput.value = option;
                optionInput.id = radioId;

                const optionLabel = document.createElement("label");
                optionLabel.setAttribute("for", radioId);
                optionLabel.innerText = option;

                optionsContainer.appendChild(optionInput);
                optionsContainer.appendChild(optionLabel);
            });
        }

        questionBlock.appendChild(optionsContainer);
        quizForm.appendChild(questionBlock);

        // ✅ Smooth animation effect for displaying questions
        setTimeout(() => {
            questionBlock.style.opacity = "1";
            questionBlock.style.transform = "translateY(0)";
        }, i * 200);
    });
}

/* =====================================
   Handle Quiz Submission
===================================== */
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.querySelector("#submitQuizButton");

    submitButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent page refresh
        
        // Show a confirmation dialog
        const confirmSubmit = confirm("Are you sure you want to submit?");
        if (!confirmSubmit) {
            return; // Exit the function if the user cancels
        }

        document.querySelector(".quiz-container").style.display = "none";

        const storedQuestions = JSON.parse(sessionStorage.getItem("questions")) || [];
        const answers = {};
        let allAnswered = true;

        // Collect answers and check if all questions are answered
        storedQuestions.forEach((_, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            answers[`question-${index}`] = selectedOption ? selectedOption.value : null;

            if (!selectedOption) {
                allAnswered = false;
            }
        });

        if (!allAnswered) {
            alert("Please answer all questions before submitting!"); 
            return;
        }

        getGrade(answers);
    });
});

