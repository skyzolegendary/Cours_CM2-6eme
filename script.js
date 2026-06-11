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
    { q: "10 + 15", a: "25", choices: ["20", "25", "30"], explanation: "Addition simple" },
    { q: "50 + 25", a: "75", choices: ["75", "80", "70"], explanation: "Addition jusqu'à 100" },
    { q: "100 - 40", a: "60", choices: ["50", "60", "70"], explanation: "Soustraction" },
    { q: "1/2 + 1/2", a: "1", choices: ["1", "2", "1/2"], explanation: "Fractions simples" },
    { q: "20 + 30 + 10", a: "60", choices: ["50", "60", "70"], explanation: "Addition multiple" },
    { q: "3/4 + 1/4", a: "1", choices: ["1", "2/4", "3/4"], explanation: "Fractions complètes" },
    { q: "80 - 30", a: "50", choices: ["40", "50", "60"], explanation: "Soustraction" },
    { q: "25 + 25", a: "50", choices: ["40", "50", "60"], explanation: "Double" },
    { q: "60 + 20", a: "80", choices: ["70", "80", "90"], explanation: "Addition dizaines" },
    { q: "100 - 20", a: "80", choices: ["80", "90", "70"], explanation: "Complément à 100" }
  ],

  sixieme: [
    { q: "3/4 + 1/8", a: "7/8", choices: ["7/8", "6/8", "1"], explanation: "Mise au même dénominateur" },
    { q: "5/6 - 1/3", a: "3/6", choices: ["2/6", "3/6", "4/6"], explanation: "Réduction" },
    { q: "7/10 + 2/10", a: "9/10", choices: ["9/10", "8/10", "1"], explanation: "Addition simple" },
    { q: "2/3 + 1/6", a: "5/6", choices: ["5/6", "4/6", "6/6"], explanation: "Mise au même dénominateur" }
  ],

  plus: [
    { q: "0.75 + 0.25", a: "1", choices: ["1", "0.9", "1.2"], explanation: "Décimaux" },
    { q: "1.25 + 0.75", a: "2", choices: ["2", "1.9", "3"], explanation: "Décimaux" },
    { q: "50 + 25 + 25", a: "100", choices: ["90", "100", "110"], explanation: "Complément à 100" }
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

  shuffledChoices = [...currentQuestion.choices]
    .sort(() => Math.random() - 0.5);

  const q = document.getElementById("question");
  if (q) q.textContent = currentQuestion.q + " = ?";

  document.querySelectorAll(".answerBtn").forEach((btn, i) => {
    btn.textContent = shuffledChoices[i];
  });

  const r = document.getElementById("result");
  const e = document.getElementById("explanation");

  if (r) r.textContent = "";
  if (e) e.textContent = "";
}

function answer(index) {
  let chosen = shuffledChoices[index];

  const result = document.getElementById("result");
  const explanation = document.getElementById("explanation");

  if (chosen === currentQuestion.a) {
    if (result) {
      result.textContent = "✅ Bravo !";
      result.style.color = "green";
    }
    score++;
  } else {
    if (result) {
      result.textContent = "❌ Faux !";
      result.style.color = "red";
    }
  }

  if (explanation) {
    explanation.textContent = currentQuestion.explanation || "";
  }

  const s = document.getElementById("score");
  if (s) s.textContent = "Score : " + score;

  setTimeout(generateQuestion, 1200);
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
  if (!currentPie) return;

  const correct = new Set(currentPie.target);
  const user = new Set(selectedSlices);

  const ok =
    correct.size === user.size &&
    [...correct].every(v => user.has(v));

  if (result) {
    if (ok) {
      result.textContent = "✅ Bravo ! " + currentPie.label;
      result.style.color = "green";
      setTimeout(newPie, 1200);
    } else {
      result.textContent = "❌ Essaie encore";
      result.style.color = "red";
    }
  }
}

/* -----------------------
   INIT
------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  generateQuestion();
  newPie();
});