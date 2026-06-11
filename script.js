function checkAnswer(answer) {
  const result = document.getElementById("result");

  if (answer === "b") {
    result.textContent = "✅ Bravo !";
    result.style.color = "green";
  } else {
    result.textContent = "❌ Réessaie !";
    result.style.color = "red";
  }
}