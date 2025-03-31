import { getGrades } from "./backendLogic.js";

document.addEventListener("DOMContentLoaded", function () {
    // Define the function to render the grades
    const renderGrades = (grades) => {
        const gradesTableBody = document.getElementById("gradesTableBody");

        // Clear previous content
        gradesTableBody.innerHTML = '';

        if (grades.length === 0) {
            gradesTableBody.innerHTML = `<tr><td colspan="4">No grades available</td></tr>`;
            return;
        }

        grades.forEach(grade => {
            const row = document.createElement("tr");

            // Extract the actual values from the nested objects
            const username = grade.username.S;
            const quizName = grade.quizName.S;
            const gradeValue = grade.grade.S;
            const dateTaken = grade.date.S;
            const role = grade.role.S;

            // Format the date if it exists
            const formattedDate = dateTaken ? new Date(dateTaken).toLocaleDateString() : "Invalid Date";

            row.innerHTML = `
                <td>${username}</td>
                <td>${quizName}</td>
                <td>${gradeValue}%</td>
                <td>${formattedDate}</td>
                <td>${role}</td>
            `;

            gradesTableBody.appendChild(row);
        });
    };

    // Load and render grades from sessionStorage
    const grades = JSON.parse(sessionStorage.getItem("grades")) || [];
    renderGrades(grades);

    // Add event listener to the refresh button
    const refresh = document.querySelector('#refreshGradesBtn');
    refresh.addEventListener('click', async (e) => {
        sessionStorage.removeItem("grades");
        let data = await getGrades();
        sessionStorage.setItem("grades", JSON.stringify(data));

        // After fetching new grades, render them
        renderGrades(data);
    });
});
