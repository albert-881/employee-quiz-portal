import { completeQuiz, getUserQuizzes, storeGrade } from "./backendLogic.js";
import { storeQuizzes } from "./ui.js";

/* =====================================
   Calculate Quiz Grade & Show Results
===================================== */
async function getGrade(answers) {
    const storedQuestions = JSON.parse(sessionStorage.getItem("questions")) || [];
    let correctCount = 0;

    storedQuestions.forEach((question, index) => {
        const userAnswer = answers[`question-${index}`];

        if (question.questionType?.S === "dropdown") {
            const correctList = question.correctAnswer.L.map(i => i.S);
            let matchCorrect = 0;

            if (Array.isArray(userAnswer)) {
                userAnswer.forEach((ans, j) => {
                    if (ans === correctList[j]) {
                        matchCorrect++;
                    }
                });
            }

            correctCount += matchCorrect / correctList.length; // partial credit
        } else {
            const correctAnswer = question.correctAnswer.S;
            if (userAnswer === correctAnswer) {
                correctCount++;
            }
        }
    });

    const totalQuestions = storedQuestions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    const resultCard = document.getElementById("resultCard");
    const resultMessage = document.getElementById("resultMessage");
    resultMessage.innerHTML = `Correct Answers: ${correctCount}/${totalQuestions}<br><br>Score: ${score}%`;
    resultCard.style.display = "block";

    const currQuizId = sessionStorage.getItem("currQuizId");
    const currUser = JSON.parse(sessionStorage.getItem("currUser"));
    await completeQuiz(currQuizId, currUser.email);
    let today = new Date();
    await storeGrade(today, score, currUser.email, currUser.role, currQuizId);

    document.getElementById("closeResultCard").addEventListener("click", async () => {
        resultCard.style.display = "none";
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
        questionBlock.style.opacity = "0";
        questionBlock.style.transform = "translateY(20px)";

        // Add question text
        const questionTextElem = document.createElement("p");
        questionTextElem.innerHTML = `<strong>${question.questionText.S || "No question text available"}</strong>`;
        questionBlock.appendChild(questionTextElem);

        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options-container");

        if (question.questionType?.S === "dropdown") {
            const prompts = question.matchPrompts.L.map(p => p.S);
            const options = question.matchOptions.SS;

            prompts.forEach((promptText, j) => {
                const promptId = `question-${i}-prompt-${j}`;
                const promptContainer = document.createElement("div");
                promptContainer.classList.add("prompt-pair");
                promptContainer.style.marginBottom = "2rem";

                // Add image for each prompt
                const diagramImg = document.createElement("img");
                diagramImg.src = `diagrams/Picture${j + 1}.png`;
                diagramImg.alt = `Diagram for prompt ${promptText}`;
                diagramImg.style.maxWidth = "100%";
                diagramImg.style.margin = "10px 0";

                // Prompt label
                const promptLabel = document.createElement("label");
                promptLabel.innerText = promptText;
                promptLabel.setAttribute("for", promptId);
                promptLabel.style.display = "block";
                promptLabel.style.marginBottom = "0.25rem";

                // Dropdown
                const select = document.createElement("select");
                select.name = promptId;
                select.id = promptId;
                select.style.width = "100%";
                select.style.padding = "0.4rem";

                const defaultOption = document.createElement("option");
                defaultOption.value = "";
                defaultOption.innerText = "-- Select an Option --";
                select.appendChild(defaultOption);

                options.forEach(option => {
                    const opt = document.createElement("option");
                    opt.value = option.split(".")[0]; // A, B, C...
                    opt.innerText = option;
                    select.appendChild(opt);
                });

                promptContainer.appendChild(diagramImg);
                promptContainer.appendChild(promptLabel);
                promptContainer.appendChild(select);
                optionsContainer.appendChild(promptContainer);
            });
        } else if (Array.isArray(question.options?.SS)) {
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
                optionsContainer.appendChild(document.createElement("br"));
            });
        }

        questionBlock.appendChild(optionsContainer);
        quizForm.appendChild(questionBlock);

        // Animate question appearance
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
        e.preventDefault();
        const confirmSubmit = confirm("Are you sure you want to submit?");
        if (!confirmSubmit) return;
        submitQuizManually();
    });

    startTimer();
});

/* =====================================
   Manual Submission Logic
===================================== */
function submitQuizManually() {
    document.querySelector(".quiz-container").style.display = "none";
    const storedQuestions = JSON.parse(sessionStorage.getItem("questions")) || [];
    const answers = {};

    storedQuestions.forEach((question, index) => {
        if (question.questionType?.S === "dropdown") {
            const prompts = question.matchPrompts.L;
            answers[`question-${index}`] = prompts.map((_, j) => {
                const selected = document.querySelector(`select[name="question-${index}-prompt-${j}"]`);
                return selected ? selected.value : null;
            });
        } else {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            answers[`question-${index}`] = selectedOption ? selectedOption.value : null;
        }
    });

    getGrade(answers);
}

/* =====================================
   Timer Logic (1 Hour Auto-Submit)
===================================== */
let timeLeft = 60 * 60;

function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
}

function startTimer() {
    const timerDisplay = document.getElementById("quizTimer");
    if (!timerDisplay) return;

    timerDisplay.innerText = formatTime(timeLeft);

    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time's up! Submitting your quiz...");
            submitQuizManually();
        }
    }, 1000);
}
