let score = 0;

function generateQuestion() {
  let a = Math.floor(Math.random() * 4) + 1;
  let b = 4;

  let question = `${a}/4 + 1/4`;
  let correct = (a + 1) + "/4";

  let choices = [
    correct,
    a + "/4",
    (a + 2) + "/4"
  ];

  choices.sort(() => Math.random() - 0.5);

  document.getElementById("question").textContent = question;

  let buttons = document.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    btn.textContent = choices[i];
  });

  return correct;
}

let correctAnswer = generateQuestion();

function answer(index) {
  let buttons = document.querySelectorAll("button");
  let chosen = buttons[index].textContent;
  let result = document.getElementById("result");

  if (chosen === correctAnswer) {
    result.textContent = "✅ Bravo !";
    score++;
  } else {
    result.textContent = "❌ Faux !";
  }

  document.getElementById("score").textContent = "Score : " + score;

  correctAnswer = generateQuestion();
}