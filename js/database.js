export function startDatabase() {  // "startDatabase" is more descriptive of the function's purpose
    
    const correctPassword = '8821';

    function createQuiz(name, description) {
        return {
            quizName: name,
            quizDescription: description
        };
    }
    
    function createEmployee(name, role) {
        return {
            employeeName: name,
            employeeRole: role
        };
    }

    function saveQuiz(quiz) {  // "saveQuiz" is clearer than "addnewQuiz"
        let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];  // "quizzes" is plural for multiple quizzes
        quizzes.push(quiz);
        localStorage.setItem('quizzes', JSON.stringify(quizzes));  // Update with plural name "quizzes"
        console.log(quizzes);
    }

    function saveEmployee(employee) {  // "saveEmployee" is clearer than "addnewEmployee"
        let employees = JSON.parse(localStorage.getItem('employees')) || [];  // "employees" is plural
        employees.push(employee);
        localStorage.setItem('employees', JSON.stringify(employees));  // Update with plural name "employees"
        console.log(employees);
    }

    function showMenu() {  // "showMenu" is a more intuitive name for the menu function
        let choice = prompt('Press 1 to create a quiz or 2 to create a new employee and assign them a role');

        if(choice === '1'){
            let quizName = prompt('Enter the name of the quiz');
            console.log(`Quiz name: ${quizName}`);
            
            let quizDescription = prompt('Enter a description for your quiz');
            console.log(`Description: ${quizDescription}`);
            
            let newQuiz = createQuiz(quizName, quizDescription);
            saveQuiz(newQuiz);
        } else if(choice === '2'){
            let employeeName = prompt('Enter the name of the new employee');
            console.log(`Employee name: ${employeeName}`);

            let employeeRole = prompt('Enter the role of the employee');
            console.log(`Employee role: ${employeeRole}`);

            let newEmployee = createEmployee(employeeName, employeeRole);
            saveEmployee(newEmployee);
        } else if(choice === null){
            return;  // Exit if "Cancel" is pressed
        } else {
            alert('Invalid option, please try again');
            showMenu();  // Call the menu again if the choice is invalid
        }
    }

    let enteredPassword = prompt('Enter the password for Truebooks');
    if(correctPassword === enteredPassword){
        showMenu();  // Proceed to menu if password is correct
    } else if(enteredPassword === null) {
        return;  // Exit if "Cancel" is pressed
    } else {
        alert('Invalid password');
    }
}
