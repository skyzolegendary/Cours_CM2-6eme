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
      explanation: "1/2 + 1/2 = 2/2 = 1"
    },
    {
      q: "1/4 + 2/4",
      a: "3/4",
      choices: ["3/4", "1/2", "2/4"],
      explanation: "Même dénominateur → on additionne les numérateurs"
    },
    {
      q: "3/5 + 1/5",
      a: "4/5",
      choices: ["4/5", "3/6", "1"],
      explanation: "3/5 + 1/5 = 4/5"
    }
  ],

  sixieme: [
    {
      q: "1/2 + 1/4",
      a: "3/4",
      choices: ["2/6", "3/4", "1/6"],
      explanation: "1/2 = 2/4 donc 2/4 + 1/4 = 3/4"
    },
    {
      q: "3/4 + 1/8",
      a: "7/8",
      choices: ["7/8", "4/12", "1"],
      explanation: "3/4 = 6/8 donc 6/8 + 1/8 = 7/8"
    },
    {
      q: "5/6 - 1/6",
      a: "4/6",
      choices: ["4/6", "6/6", "1/6"],
      explanation: "Même dénominateur → on soustrait"
    }
  ],

  plus: [
    {
      q: "0.5 + 0.25",
      a: "0.75",
      choices: ["0.75", "0.70", "1"],
      explanation: "0.5 + 0.25 = 0.75"
    },
    {
      q: "1.2 + 0.8",
      a: "2",
      choices: ["2", "1.10", "3"],
      explanation: "1.2 + 0.8 = 2"
    },
    {
      q: "3/4 + 0.5",
      a: "1.25",
      choices: ["1.25", "1", "0.75"],
      explanation: "0.75 + 0.5 = 1.25"
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

  explanation.textContent = currentQuestion.explanation || "";
  document.getElementById("score").textContent = "Score : " + score;

  setTimeout(generateQuestion, 1500);
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

  selectedSlices.sort();

  const correct = [0, 1, 2]; // 3/4

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
   INIT SAFE
------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  generateQuestion();
});