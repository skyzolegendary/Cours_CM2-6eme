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
    { q: "1/2 + 1/2", a: "1", choices: ["1", "2", "1/2"], explanation: "Fraction simple" },
    { q: "20 + 30 + 10", a: "60", choices: ["50", "60", "70"], explanation: "Addition multiple" },
    { q: "3/4 + 1/4", a: "1", choices: ["1", "2/4", "3/4"], explanation: "Fractions complètes" },
    { q: "80 - 30", a: "50", choices: ["40", "50", "60"], explanation: "Soustraction facile" },
    { q: "25 + 25", a: "50", choices: ["40", "50", "60"], explanation: "Double" },
    { q: "60 + 20", a: "80", choices: ["70", "80", "90"], explanation: "Addition dizaines" },
    { q: "100 - 20", a: "80", choices: ["80", "90", "70"], explanation: "Complément à 100" }
  ],

    sixieme: [
      { q: "3/4 + 1/8", a: "7/8", choices: ["7/8", "6/8", "1"], explanation: "mise au même dénominateur" },
      { q: "5/6 - 1/3", a: "3/6", choices: ["2/6", "3/6", "4/6"], explanation: "réduction" },
      { q: "7/10 + 2/10", a: "9/10", choices: ["9/10", "8/10", "1"], explanation: "addition simple" },
      { q: "12/20 simplifié", a: "3/5", choices: ["2/5", "3/5", "4/5"], explanation: "simplification" },
      { q: "15/25 simplifié", a: "3/5", choices: ["3/5", "5/5", "2/5"], explanation: "réduction" },
      { q: "2/3 + 1/6", a: "5/6", choices: ["5/6", "4/6", "6/6"], explanation: "mise au même dénominateur" },
      { q: "8/12 simplifié", a: "2/3", choices: ["2/3", "3/4", "1/2"], explanation: "division par 4" },
      { q: "9/12 simplifié", a: "3/4", choices: ["3/4", "2/3", "4/5"], explanation: "réduction" },
      { q: "1/2 + 1/3", a: "5/6", choices: ["5/6", "4/6", "6/6"], explanation: "mise au même dénominateur" },
      { q: "7/8 - 1/8", a: "6/8", choices: ["6/8", "5/8", "1"], explanation: "soustraction simple" }
    ],

plus: [
  { q: "0.75 + 0.25", a: "1", choices: ["1", "0.9", "1.2"], explanation: "décimaux simples" },
  { q: "1.25 + 0.75", a: "2", choices: ["2", "1.9", "3"], explanation: "addition décimale" },
  { q: "50 + 25 + 25", a: "100", choices: ["90", "100", "110"], explanation: "jusqu'à 100" },
  { q: "0.5 + 1.5", a: "2", choices: ["2", "1.5", "3"], explanation: "décimaux" },
  { q: "75 + 25", a: "100", choices: ["90", "100", "110"], explanation: "complément 100" },
  { q: "0.2 + 0.3", a: "0.5", choices: ["0.5", "0.6", "0.4"], explanation: "décimaux simples" },
  { q: "3/4 + 0.25", a: "1", choices: ["1", "0.75", "1.25"], explanation: "fractions + décimaux" },
  { q: "100 - 55", a: "45", choices: ["40", "45", "50"], explanation: "soustraction" },
  { q: "60 + 40", a: "100", choices: ["90", "100", "110"], explanation: "complément" },
  { q: "1.1 + 0.9", a: "2", choices: ["2", "1.9", "3"], explanation: "décimaux" }
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

  explanation.textContent = currentQuestion.explanation || "";
  document.getElementById("score").textContent = "Score : " + score;

  setTimeout(generateQuestion, 1500);
}

/* -----------------------
   CAMEMBERT (VERSION FIXÉE)
------------------------ */

const pieLevels = [
  { target: [0, 1, 2], label: "3/4" },
  { target: [0, 1], label: "2/4" },
  { target: [0], label: "1/4" },
  { target: [1, 2, 3], label: "3/4 autre" }
];

let currentPie = null;
let selectedSlices = [];

/* 🎯 nouvelle cible */
function newPie() {
  currentPie = pieLevels[Math.floor(Math.random() * pieLevels.length)];
  selectedSlices = []; // IMPORTANT reset
  document.getElementById("pieResult").textContent = "";
}

/* 🍰 clic sur une part */
function toggleSlice(index) {
  const slices = document.querySelectorAll(".slice");

  slices[index].classList.toggle("active");

  if (selectedSlices.includes(index)) {
    selectedSlices = selectedSlices.filter(i => i !== index);
  } else {
    selectedSlices.push(index);
  }
}

/* ✔ validation */
function checkPie() {
  const result = document.getElementById("pieResult");

  let correct = [...currentPie.target].sort();
  let user = [...selectedSlices].sort();

  let isCorrect =
    user.length === correct.length &&
    user.every((v, i) => v === correct[i]);

  if (isCorrect) {
    result.textContent = "✅ Bravo ! " + currentPie.label;
    result.style.color = "green";

    setTimeout(newPie, 1500); // nouvelle question
  } else {
    result.textContent = "❌ Essaie encore";
    result.style.color = "red";
  }
}

/* 🚀 INIT */
document.addEventListener("DOMContentLoaded", () => {
  generateQuestion();
  newPie(); // IMPORTANT
});