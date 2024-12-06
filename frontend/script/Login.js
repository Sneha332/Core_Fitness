// Toggle between login and signup forms
document.getElementById('toggle-signup').onclick = function() {
    document.querySelector('.login-wrap').classList.remove('active');
    document.querySelector('.signup-wrap').classList.add('active');
};

document.getElementById('toggle-login').onclick = function() {
    document.querySelector('.signup-wrap').classList.remove('active');
    document.querySelector('.login-wrap').classList.add('active');
};

// Modal handling
function openModal(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeButton = document.querySelector('.close-btn');

    modalMessage.innerHTML = message;
    modal.style.display = 'block';

    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Handle signup with AJAX
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "signup.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        openModal(this.responseText); // Show response in the modal
    };

    xhr.send(`name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
});

// Handle login with AJAX
// Handle login with AJAX
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (this.responseText === "Login successful!") {
            // Redirect to the home page after successful login
            window.location.href = "index.html";
        } else {
            // Display the response message in the modal for any error
            openModal(this.responseText);
        }
    };

    xhr.send(`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
});

