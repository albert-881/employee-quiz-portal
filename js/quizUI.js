const quizForm =  document.querySelector('#quizForm');
export const seQuiz = [
    {
        question: "What is the primary responsibility of a software engineer?",
        choices: ["Writing code only", "Designing and maintaining software systems", "Managing servers", "Running tests manually"],
        correctAnswer: "Designing and maintaining software systems"
      },
      {
        question: "Which of the following programming languages is most commonly used in web development?",
        choices: ["Python", "JavaScript", "C++", "Ruby"],
        correctAnswer: "JavaScript"
      },
      {
        question: "What is 'Agile' methodology primarily used for in software development?",
        choices: ["Writing code faster", "Organizing teams into groups", "Iterative development and continuous feedback", "Managing network infrastructure"],
        correctAnswer: "Iterative development and continuous feedback"
      },
      {
        question: "What does 'Version Control' help software engineers manage?",
        choices: ["User authentication", "Software updates and changes to the codebase", "Servers and infrastructure", "Database design"],
        correctAnswer: "Software updates and changes to the codebase"
      },
      {
        question: "What is the purpose of writing unit tests in software development?",
        choices: ["To check the functionality of an entire software product", "To ensure individual components work correctly in isolation", "To optimize the code for faster execution", "To deploy the software to production"],
        correctAnswer: "To ensure individual components work correctly in isolation"
      }
    
]


export function startQuiz(){
    for(let i = 0; i < seQuiz.length; i++){
        console.log('****************************');
        console.log(seQuiz[i].question);
        const questionDiv = document.createElement("div");
        const questionHeading = document.createElement("h3");
        questionHeading.innerText = seQuiz[i].question;
        questionDiv.appendChild(questionHeading);
        quizForm.appendChild(questionDiv);
        for(let j = 0; j < seQuiz[i].choices.length; j++){
            console.log(seQuiz[i].choices[j]);
        }
    }
}


