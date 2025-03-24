const logoutBtn = document.querySelector('#logout-btn');

logoutBtn.addEventListener('click', (e) => {
    sessionStorage.clear()
    window.location.href = 'index.html';  
});