const logoutBtn = document.querySelector('#logout-btn');

logoutBtn.addEventListener('click', (e) => {
    // Remove the logged-in user from localStorage
    localStorage.removeItem('loggedInUser');

    window.location.href = 'index.html';  
});