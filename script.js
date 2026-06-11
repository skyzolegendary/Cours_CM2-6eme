let score = 0;
let currentLevel = "cm2";

let currentQuestion = {};
let shuffledChoices = [];

/* -----------------------
   NIVEAUX
------------------------ */

const levels = {
  cm2: [
    { q: "10 + 15", a: "25", choices: ["20", "25", "30"], explanation: "Addition simple" },
    { q: "50 + 25", a: "75", choices: ["75", "80", "70"], explanation: "Addition jusqu'à 100" },
    { q: "100 - 40", a: "60", choices: ["50", "60", "70"], explanation: "Soustraction" },
    { q: "1/2 + 1/2", a: "1", choices: ["1", "2", "1/2"], explanation: "Fractions simples" },
    { q: "20 + 30 + 10", a: "60", choices: ["50", "60", "70"], explanation: "Addition multiple" },
    { q: "3/4 + 1/4", a: "1", choices: ["1", "3/4", "2/4"], explanation: "Fractions complètes" },
    { q: "80 - 30", a: "50", choices: ["40", "50", "60"], explanation: "Soustraction" },
    { q: "25 + 25", a: "50", choices: ["40", "50", "60"], explanation: "Double" },
    { q: "60 + 20", a: "80", choices: ["70", "80", "90"], explanation: "Dizaines" },
    { q: "100 - 20", a: "80", choices: ["70", "80", "90"], explanation: "Complément à 100" }
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
  const list = levels[currentLevel];

  if (!list || list.length === 0) return;

  currentQuestion = list[Math.floor(Math.random() * list.length)];

  shuffledChoices = [...currentQuestion.choices].sort(() => Math.random() - 0.5);

  const q = document.getElementById("question");
  if (!q) return;

  q.textContent = currentQuestion.q + " = ?";

  const buttons = document.querySelectorAll(".answerBtn");

  buttons.forEach((btn, i) => {
    btn.textContent = shuffledChoices[i] ?? "";
  });

  document.getElementById("result").textContent = "";
  document.getElementById("explanation").textContent = "";
}

function answer(index) {
  const chosen = shuffledChoices[index];

  const result = document.getElementById("result");
  const explanation = document.getElementById("explanation");

  if (chosen === currentQuestion.a) {
    result.textContent = "✅ Bravo !";
    result.style.color = "green";
    score++;
  } else {
    result.textContent = "❌ Faux !";
    result.style.color = "red";
  }

  explanation.textContent = currentQuestion.explanation || "";
  document.getElementById("score").textContent = "Score : " + score;

  setTimeout(generateQuestion, 1500);
}

/* -----------------------
   CAMEMBERT
------------------------ */

const pieLevels = [
  { target: [0, 1, 2], label: "3/4" },
  { target: [0, 1], label: "2/4" },
  { target: [0], label: "1/4" },
  { target: [1, 2, 3], label: "3/4 autre" }
];

let currentPie = null;
let selectedSlices = [];

function newPie() {
  currentPie = pieLevels[Math.floor(Math.random() * pieLevels.length)];
  selectedSlices = [];

  const label = document.getElementById("pieLabel");
  const result = document.getElementById("pieResult");

  if (label) label.textContent = "Fais : " + currentPie.label;
  if (result) result.textContent = "";

  document.querySelectorAll(".slice").forEach(s => {
    s.classList.remove("active");
  });
}

function toggleSlice(index) {
  const slices = document.querySelectorAll(".slice");

  if (!slices[index]) return;

  slices[index].classList.toggle("active");

  if (selectedSlices.includes(index)) {
    selectedSlices = selectedSlices.filter(i => i !== index);
  } else {
    selectedSlices.push(index);
  }
}

function checkPie() {
  const result = document.getElementById("pieResult");

  const correct = new Set(currentPie.target);
  const user = new Set(selectedSlices);

  const isCorrect =
    correct.size === user.size &&
    [...correct].every(v => user.has(v));

  if (isCorrect) {
    result.textContent = "✅ Bravo ! " + currentPie.label;
    result.style.color = "green";
    setTimeout(newPie, 1500);
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
  newPie();
});