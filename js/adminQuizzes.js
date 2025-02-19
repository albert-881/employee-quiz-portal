export function quizzes(name, description){
    return{
        name: name,
        desc: description
    }
}

export function addQuiz(newQuiz){
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    quizzes.push(newQuiz);
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    console.log(quizzes);
}


const createQuiz = document.querySelector('#quiz-form');
createQuiz.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('you just submitted a quiz');

    let name = document.querySelector('#quiz-name').value;
    let description = document.querySelector('#quiz-desc').value;

    let newQuiz = quizzes(name,description);

    addQuiz(newQuiz);
});

