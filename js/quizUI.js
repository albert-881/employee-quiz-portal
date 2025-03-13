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
