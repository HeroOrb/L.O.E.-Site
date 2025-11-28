document.addEventListener('DOMContentLoaded', function() {
    let loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function() {
        alert('Button Has Been Pressed!');
        window.location.href = 'dashboard.html';
    })
});