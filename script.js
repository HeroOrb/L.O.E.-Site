document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const wrongName = document.getElementById('wrongUsername');
    const wrongPassword = document.getElementById('wrongPassword');

    loginButton.addEventListener('click', async () => {

        const usernameInput = document.querySelector('[name="username-input"]');
        const passwordInput = document.querySelector('[name="password-input"]');
        usernameInput.style.borderColor = "rgb(58, 58, 74";
        passwordInput.style.borderColor = "rgb(58, 58, 74";
        const username = usernameInput?.value.trim();
        const password = passwordInput?.value.trim();

        if (!username && !password) {
            document.getElementById("username-input").style.borderColor = "red";
            document.getElementById("password-input").style.borderColor = "red";
            alert('Please fill out the Required Fields');
            return;
        }
        if (!username) {
            document.getElementById("username-input").style.borderColor = "red";
            alert('Please enter a username');
            return;
        }
        if (!password) {
            console.log("brah");
            document.getElementById("password-input").style.borderColor = "red";
            alert('Please enter a password');
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            if(result.success) {
                alert('Login success: ' + result.user.name);
                window.location.href = 'dashboard.html';
            } else {
                if (result.message === "password") {
                    document.getElementById("password-input").style.borderColor = "red";
                    alert("Login Failed: Incorrect Password")
                } else if (result.message === "username") {
                    document.getElementById("username-input").style.borderColor = "red";
                    alert("Login Failed: Incorrect Username")
                }
                
            }
        }catch (error) {
            alert('Error: ' + error.message);
        }
    })
});