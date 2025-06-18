document.addEventListener("DOMContentLoaded", () => {
  const user = sessionStorage.getItem("loggedInUser");
  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("user").textContent = user;
  }

  document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});