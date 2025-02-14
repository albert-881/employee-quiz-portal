export function showQuizzes() {
    const quizlistContainer = document.querySelector('#quiz-list');
    if (!quizlistContainer) return; // Prevent errors if element is missing

    quizlistContainer.innerHTML = ''; // Clear previous content

    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    console.log('Loaded quizzes from storage:', quizzes); // Debugging

    quizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.classList.add('quiz-card');

        const quizName = document.createElement('h3');
        quizName.textContent = quiz.name;

        const quizDesc = document.createElement('p');
        quizDesc.textContent = quiz.desc;

        const startBtn = document.createElement('button');
        startBtn.textContent = 'Start Quiz';
        startBtn.classList.add('start-btn');
        startBtn.addEventListener('click', () => {
            alert(`Starting quiz: ${quiz.name}`);
        });

        quizCard.appendChild(quizName);
        quizCard.appendChild(quizDesc);
        quizCard.appendChild(startBtn);
        quizlistContainer.appendChild(quizCard);
    });
}
