document.getElementById("sellForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("itemName").value;
  const desc = document.getElementById("itemDesc").value;
  const price = document.getElementById("itemPrice").value;

  const confirmation = document.getElementById("confirmation");
  confirmation.textContent = `Your item "${name}" has been listed for $${price}.`;
  confirmation.style.color = "green";

  // Optionally: Clear form
  this.reset();
});