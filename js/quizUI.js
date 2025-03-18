function getGrade(answers){
    let storedQuestions = JSON.parse(sessionStorage.getItem("questions")) || [];
    let score = 0;
    let questionCounter = 0;
    let counterCorrect = 0;
    
    storedQuestions.forEach((question, index) => {
        questionCounter++;
        let correctAnswer = storedQuestions[index].correctAnswer.S;
        if(answers[`question-${index}`] === correctAnswer){
            console.log(`question-${index} is correct`);
            counterCorrect++;
        }

    });
    let questionWorth = 100 / questionCounter;
    score = Math.round(counterCorrect * questionWorth);
    

    const resultCard = document.getElementById("resultCard");
    const resultMessage = document.getElementById("resultMessage");
    const closeButton = document.getElementById("closeResultCard");

    // Sample result message (Replace this with actual quiz results logic)
    resultMessage.innerHTML = `Correct Answers: ${counterCorrect}/${questionCounter}<br><br>${score}`;
    resultCard.style.display = "block"; // Show the result card
    

    closeButton.addEventListener("click", () => {
        resultCard.style.display = "none"; // Close the result card
    });
}


export function showQuestions() {
  const quizForm = document.getElementById("quizForm");

  // Retrieve stored questions from sessionStorage
  let storedQuestions = JSON.parse(sessionStorage.getItem("questions")) || [];

  if (storedQuestions.length === 0) {
      quizForm.innerHTML = "<p>No questions available.</p>";
      return;
  }

  for (let i = 0; i < storedQuestions.length; i++) {
      const question = storedQuestions[i];
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("question-block");

      // Create question header
      const questionText = question.questionText.S || "No question text available";
      questionBlock.innerHTML = `
          <p><strong>${i + 1}. ${questionText}</strong></p>
      `;

      // Create options container
      const optionsContainer = document.createElement("div");
      optionsContainer.classList.add("options-container");

      // Check if 'options.SS' is an array before looping through it
      if (Array.isArray(question.options.SS)) {
          for (let j = 0; j < question.options.SS.length; j++) {
              const option = question.options.SS[j];

              // Generate unique IDs
              const radioId = `q${i}-option${j}`;

              const optionInput = document.createElement("input");
              optionInput.type = "radio";
              optionInput.name = `question-${i}`;
              optionInput.value = option;
              optionInput.id = radioId;

              const optionLabel = document.createElement("label");
              optionLabel.setAttribute("for", radioId);
              optionLabel.innerText = option;

              // Append input and label to container
              optionsContainer.appendChild(optionInput);
              optionsContainer.appendChild(optionLabel);
            }
      }

      questionBlock.appendChild(optionsContainer);
      quizForm.appendChild(questionBlock);

      // ✅ Delay each question rendering for smooth animation
      setTimeout(() => {
          questionBlock.style.opacity = "1";
          questionBlock.style.transform = "translateY(0)";
      }, i * 200);
  }
}


document.addEventListener("DOMContentLoaded", () => {
    const submitQuestions = document.querySelector('#submitQuizButton');

    submitQuestions.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents page refresh

        // Retrieve stored questions from sessionStorage
        let storedQuestions = JSON.parse(sessionStorage.getItem("questions")) || [];
        const answers = {};
        let allAnswered = true; // Flag to check if all questions are answered

        // Loop through each question
        storedQuestions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            answers[`question-${index}`] = selectedOption ? selectedOption.value : null;

            if (!selectedOption) {
                allAnswered = false; // Mark as false if any question is unanswered
            }
        });

        // If any question is unanswered, show an alert and stop submission
        if (!allAnswered) {
            alert("Please answer all questions before submitting!");
            return;
        }
        getGrade(answers);
        
    });
});
