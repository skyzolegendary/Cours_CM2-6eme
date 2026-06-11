let score = 0;
let currentLevel = "cm2";
let currentQuestion = {};
let shuffledChoices = [];
let selectedSlices = [];

/* -----------------------
   NIVEAUX
------------------------ */

const levels = {
  cm2: [
    {
      q: "1/2 + 1/2",
      a: "1",
      choices: ["1", "2/4", "2"],
      explanation: "1/2 + 1/2 = 1"
    },
    {
      q: "1/4 + 2/4",
      a: "3/4",
      choices: ["3/4", "1/2", "2/4"],
      explanation: "Même dénominateur"
    }
  ],

  sixieme: [
    {
      q: "1/2 + 1/4",
      a: "3/4",
      choices: ["3/4", "1/6", "2/6"],
      explanation: "2/4 + 1/4 = 3/4"
    }
  ],

  plus: [
    {
      q: "0.5 + 0.25",
      a: "0.75",
      choices: ["0.75", "1", "0.70"],
      explanation: "0.5 + 0.25 = 0.75"
    }
  ]
};

/* -----------------------
   QUIZ
------------------------ */

function setLevel(level) {
  currentLevel = level;
  generateQuestion();
}

function generateQuestion() {
  let list = levels[currentLevel];

  currentQuestion = list[Math.floor(Math.random() * list.length)];

  shuffledChoices = [...currentQuestion.choices].sort(() => Math.random() - 0.5);

  document.getElementById("question").textContent = currentQuestion.q + " = ?";

  let buttons = document.querySelectorAll(".answerBtn");

  buttons.forEach((btn, i) => {
    btn.textContent = shuffledChoices[i];
  });

  document.getElementById("result").textContent = "";
  document.getElementById("explanation").textContent = "";
}

function answer(index) {
  let chosen = shuffledChoices[index];

  let result = document.getElementById("result");
  let explanation = document.getElementById("explanation");

  if (chosen === currentQuestion.a) {
    result.textContent = "✅ Bravo !";
    result.style.color = "green";
    score++;
  } else {
    result.textContent = "❌ Faux !";
    result.style.color = "red";
  }

  explanation.textContent = currentQuestion.explanation;
  document.getElementById("score").textContent = "Score : " + score;

  setTimeout(generateQuestion, 10000);
}

/* -----------------------
   CAMEMBERT
------------------------ */

function toggleSlice(index) {
  const slices = document.querySelectorAll(".slice");

  slices[index].classList.toggle("active");

  if (selectedSlices.includes(index)) {
    selectedSlices = selectedSlices.filter(i => i !== index);
  } else {
    selectedSlices.push(index);
  }
}

function checkPie() {
  const result = document.getElementById("pieResult");

  const correct = [0, 1, 2];

  selectedSlices.sort();

  if (
    selectedSlices.length === correct.length &&
    selectedSlices.every(v => correct.includes(v))
  ) {
    result.textContent = "✅ Bravo ! 3/4";
    result.style.color = "green";
  } else {
    result.textContent = "❌ Essaie encore";
    result.style.color = "red";
  }
}

/* -----------------------
   INIT
------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  generateQuestion();
});