function register() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (!user || !pass) {
    showMessage("Please fill in all fields");
    return;
  }

  if (localStorage.getItem(user)) {
    showMessage("Username already exists");
    return;
  }

  localStorage.setItem(user, pass);
  showMessage("Registered successfully. You can now log in.");
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  const storedPass = localStorage.getItem(user);
  if (storedPass && storedPass === pass) {
    sessionStorage.setItem("loggedInUser", user);
    window.location.href = "user-account.html";
  } else {
    showMessage("Invalid username or password");
  }
}

function showMessage(msg) {
  document.getElementById('message').textContent = msg;
}