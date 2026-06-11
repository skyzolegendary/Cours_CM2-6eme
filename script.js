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
  { q: "100 - 20", a: "80", choices: ["70", "80", "90"], explanation: "Complément à 100" },

  { q: "7 + 8", a: "15", choices: ["14", "15", "16"], explanation: "Addition simple" },
  { q: "9 + 6", a: "15", choices: ["13", "15", "16"], explanation: "Addition simple" },
  { q: "12 + 9", a: "21", choices: ["20", "21", "22"], explanation: "Addition" },
  { q: "14 + 7", a: "21", choices: ["21", "22", "20"], explanation: "Addition" },
  { q: "18 - 9", a: "9", choices: ["8", "9", "10"], explanation: "Soustraction" },
  { q: "15 - 7", a: "8", choices: ["7", "8", "9"], explanation: "Soustraction" },
  { q: "30 + 40", a: "70", choices: ["60", "70", "80"], explanation: "Dizaines" },
  { q: "90 - 50", a: "40", choices: ["30", "40", "50"], explanation: "Soustraction" },
  { q: "200 - 100", a: "100", choices: ["90", "100", "110"], explanation: "Nombres ronds" },
  { q: "150 + 50", a: "200", choices: ["150", "200", "250"], explanation: "Addition" },

  { q: "2 × 3", a: "6", choices: ["5", "6", "7"], explanation: "Multiplication" },
  { q: "4 × 5", a: "20", choices: ["15", "20", "25"], explanation: "Multiplication" },
  { q: "6 × 2", a: "12", choices: ["10", "12", "14"], explanation: "Multiplication" },
  { q: "3 × 7", a: "21", choices: ["21", "20", "22"], explanation: "Multiplication" },
  { q: "8 × 2", a: "16", choices: ["14", "16", "18"], explanation: "Multiplication" },
  { q: "9 × 3", a: "27", choices: ["24", "27", "30"], explanation: "Multiplication" },
  { q: "10 × 4", a: "40", choices: ["30", "40", "50"], explanation: "Multiplication" },
  { q: "5 × 6", a: "30", choices: ["25", "30", "35"], explanation: "Multiplication" },
  { q: "7 × 5", a: "35", choices: ["30", "35", "40"], explanation: "Multiplication" },
  { q: "8 × 4", a: "32", choices: ["30", "32", "34"], explanation: "Multiplication" },

  { q: "12 ÷ 3", a: "4", choices: ["3", "4", "5"], explanation: "Division simple" },
  { q: "20 ÷ 5", a: "4", choices: ["4", "5", "6"], explanation: "Division" },
  { q: "18 ÷ 2", a: "9", choices: ["8", "9", "10"], explanation: "Division" },
  { q: "24 ÷ 6", a: "4", choices: ["3", "4", "5"], explanation: "Division" },
  { q: "30 ÷ 5", a: "6", choices: ["5", "6", "7"], explanation: "Division" },
  { q: "36 ÷ 4", a: "9", choices: ["8", "9", "10"], explanation: "Division" },
  { q: "49 - 19", a: "30", choices: ["29", "30", "31"], explanation: "Soustraction" },
  { q: "64 + 16", a: "80", choices: ["70", "80", "90"], explanation: "Addition" },
  { q: "75 - 25", a: "50", choices: ["40", "50", "60"], explanation: "Soustraction" },
  { q: "120 + 30", a: "150", choices: ["140", "150", "160"], explanation: "Addition" },

  { q: "1/4 + 1/4", a: "1/2", choices: ["1/2", "1", "2/4"], explanation: "Fractions" },
  { q: "1/3 + 1/3", a: "2/3", choices: ["1/3", "2/3", "3/3"], explanation: "Fractions" },
  { q: "2/5 + 2/5", a: "4/5", choices: ["4/5", "1", "2/10"], explanation: "Fractions" },
  { q: "3/6 simplifiée", a: "1/2", choices: ["1/2", "3/6", "2/3"], explanation: "Simplification" },
  { q: "5 + 5 + 5", a: "15", choices: ["10", "15", "20"], explanation: "Addition répétée" },
  { q: "11 + 11", a: "22", choices: ["21", "22", "23"], explanation: "Double" },
  { q: "22 + 22", a: "44", choices: ["42", "44", "46"], explanation: "Double" },
  { q: "33 + 33", a: "66", choices: ["63", "66", "69"], explanation: "Double" },
  { q: "45 + 45", a: "90", choices: ["80", "90", "100"], explanation: "Double" },
  { q: "99 - 9", a: "90", choices: ["89", "90", "91"], explanation: "Soustraction" },

  { q: "250 - 50", a: "200", choices: ["150", "200", "250"], explanation: "Nombres ronds" },
  { q: "300 + 100", a: "400", choices: ["300", "400", "500"], explanation: "Addition" },
  { q: "600 - 200", a: "400", choices: ["300", "400", "500"], explanation: "Soustraction" },
  { q: "700 + 200", a: "900", choices: ["800", "900", "1000"], explanation: "Addition" },
  { q: "1000 - 300", a: "700", choices: ["600", "700", "800"], explanation: "Soustraction" }
],

sixieme: [
  { q: "2/3 + 1/6", a: "5/6", choices: ["3/9", "5/6", "1"], explanation: "2/3 = 4/6 donc 4/6 + 1/6 = 5/6" },
  { q: "3/5 + 2/10", a: "8/10", choices: ["8/10", "5/15", "1"], explanation: "3/5 = 6/10 donc 6/10 + 2/10 = 8/10" },
  { q: "7/8 - 3/8", a: "4/8", choices: ["4/8", "5/8", "3/8"], explanation: "Même dénominateur" },
  { q: "5/4 - 1/4", a: "4/4", choices: ["1", "4/4", "3/4"], explanation: "5/4 - 1/4 = 4/4 = 1" },
  { q: "9/10 - 2/5", a: "5/10", choices: ["5/10", "7/10", "3/5"], explanation: "2/5 = 4/10 donc 9/10 - 4/10 = 5/10" },

  { q: "4 × 3 + 2", a: "14", choices: ["20", "14", "18"], explanation: "Priorité multiplication" },
  { q: "10 - 2 × 3", a: "4", choices: ["24", "4", "16"], explanation: "Multiplication avant soustraction" },
  { q: "(10 - 2) × 3", a: "24", choices: ["24", "18", "30"], explanation: "Parenthèses" },
  { q: "6 × (2 + 3)", a: "30", choices: ["11", "30", "20"], explanation: "Parenthèses d'abord" },
  { q: "8 + 4 × 5", a: "28", choices: ["60", "28", "48"], explanation: "Priorité multiplication" },

  { q: "3/4 + 3/4", a: "6/4", choices: ["6/4", "3/8", "1"], explanation: "Addition directe" },
  { q: "6/9 simplifiée", a: "2/3", choices: ["2/3", "3/6", "6/9"], explanation: "Division par 3" },
  { q: "8/12 simplifiée", a: "2/3", choices: ["2/3", "4/6", "8/12"], explanation: "Simplification" },
  { q: "10/5", a: "2", choices: ["2", "5", "1"], explanation: "Division" },
  { q: "15/3", a: "5", choices: ["5", "4", "6"], explanation: "Division" },

  { q: "1/2 + 3/2", a: "4/2", choices: ["2", "4/2", "3/4"], explanation: "Même dénominateur" },
  { q: "7/3 - 4/3", a: "3/3", choices: ["1", "3/3", "2/3"], explanation: "Soustraction" },
  { q: "5 × 2 + 10", a: "20", choices: ["30", "20", "15"], explanation: "Priorité" },
  { q: "20 - 5 × 2", a: "10", choices: ["30", "10", "15"], explanation: "Multiplication avant" },
  { q: "18 ÷ 3 + 2", a: "8", choices: ["6", "8", "10"], explanation: "Division avant" },

  { q: "12 + 6 ÷ 3", a: "14", choices: ["6", "14", "18"], explanation: "Division avant" },
  { q: "(12 + 6) ÷ 3", a: "6", choices: ["6", "18", "3"], explanation: "Parenthèses" },
  { q: "4 × 4 × 2", a: "32", choices: ["16", "32", "24"], explanation: "Multiplication" },
  { q: "100 ÷ 4", a: "25", choices: ["20", "25", "30"], explanation: "Division" },
  { q: "45 ÷ 5", a: "9", choices: ["9", "8", "10"], explanation: "Division" },

  { q: "2/5 + 1/5", a: "3/5", choices: ["3/5", "2/10", "1"], explanation: "Même dénominateur" },
  { q: "6/7 - 2/7", a: "4/7", choices: ["4/7", "3/7", "2/7"], explanation: "Soustraction" },
  { q: "9/4 simplifiée", a: "9/4", choices: ["2/1", "9/4", "3/2"], explanation: "Irréductible" },
  { q: "3 × (5 + 5)", a: "30", choices: ["15", "30", "25"], explanation: "Parenthèses" },
  { q: "(8 + 2) × 5", a: "50", choices: ["50", "18", "40"], explanation: "Parenthèses" },

  { q: "7 × 6 - 10", a: "32", choices: ["42", "32", "36"], explanation: "Priorité" },
  { q: "7 × (6 - 2)", a: "28", choices: ["28", "42", "30"], explanation: "Parenthèses" },
  { q: "100 - 50 ÷ 5", a: "90", choices: ["10", "90", "50"], explanation: "Division avant" },
  { q: "(100 - 50) ÷ 5", a: "10", choices: ["10", "50", "20"], explanation: "Parenthèses" },
  { q: "25 × 2 + 10", a: "60", choices: ["50", "60", "70"], explanation: "Priorité" },

  { q: "1/3 + 2/3", a: "3/3", choices: ["1", "3/3", "2/3"], explanation: "Addition" },
  { q: "4/9 + 2/9", a: "6/9", choices: ["6/9", "2/3", "4/18"], explanation: "Même dénominateur" },
  { q: "5/8 - 1/8", a: "4/8", choices: ["4/8", "3/8", "5/8"], explanation: "Soustraction" },
  { q: "10 × 10 - 50", a: "50", choices: ["50", "100", "0"], explanation: "Priorité" }
],

plus: [
  { q: "0.75 + 0.25", a: "1", choices: ["1", "0.9", "1.25"], explanation: "Addition décimale" },
  { q: "2.5 + 1.5", a: "4", choices: ["4", "3", "5"], explanation: "Addition" },
  { q: "3.2 - 1.1", a: "2.1", choices: ["2.1", "1.9", "3.1"], explanation: "Soustraction" },
  { q: "5.5 × 2", a: "11", choices: ["10", "11", "12"], explanation: "Multiplication" },
  { q: "9 ÷ 0.5", a: "18", choices: ["4.5", "18", "9"], explanation: "Diviser par 0.5 = multiplier par 2" },

  { q: "1/2 + 0.25", a: "0.75", choices: ["0.75", "1", "0.5"], explanation: "Conversion" },
  { q: "3/4 + 0.25", a: "1", choices: ["1", "0.75", "1.25"], explanation: "Conversion" },
  { q: "0.2 + 3/5", a: "0.8", choices: ["0.8", "0.7", "1"], explanation: "3/5 = 0.6" },
  { q: "1.5 + 3/2", a: "3", choices: ["2.5", "3", "4"], explanation: "3/2 = 1.5" },
  { q: "2/3 + 0.333", a: "≈1", choices: ["≈1", "0.6", "1.3"], explanation: "Approximation" },

  { q: "4 × 2.5", a: "10", choices: ["10", "8", "12"], explanation: "Multiplication" },
  { q: "6 ÷ 1.5", a: "4", choices: ["4", "3", "5"], explanation: "Division" },
  { q: "7.2 ÷ 0.6", a: "12", choices: ["12", "10", "14"], explanation: "Décimaux" },
  { q: "0.1 × 0.2", a: "0.02", choices: ["0.02", "0.2", "0.01"], explanation: "Décimaux" },
  { q: "0.5 × 0.5", a: "0.25", choices: ["0.25", "0.5", "1"], explanation: "Multiplication" },

  { q: "3²", a: "9", choices: ["6", "9", "12"], explanation: "Puissance" },
  { q: "5²", a: "25", choices: ["10", "25", "20"], explanation: "Puissance" },
  { q: "10²", a: "100", choices: ["20", "100", "10"], explanation: "Puissance" },
  { q: "√9", a: "3", choices: ["3", "9", "6"], explanation: "Racine carrée" },
  { q: "√16", a: "4", choices: ["4", "8", "2"], explanation: "Racine carrée" },

  { q: "2 × (3 + 4)²", a: "98", choices: ["98", "49", "14"], explanation: "(3+4)=7 → 7²=49 → ×2" },
  { q: "(5 + 5)²", a: "100", choices: ["25", "100", "50"], explanation: "Puissance" },
  { q: "6² - 10", a: "26", choices: ["36", "26", "30"], explanation: "36 - 10" },
  { q: "4² + 3²", a: "25", choices: ["7", "25", "16"], explanation: "16 + 9" },
  { q: "10² - 5²", a: "75", choices: ["75", "25", "50"], explanation: "100 - 25" },

  { q: "1/2 × 4", a: "2", choices: ["2", "4", "1"], explanation: "Multiplication fraction" },
  { q: "3/4 × 8", a: "6", choices: ["6", "8", "4"], explanation: "Fraction × entier" },
  { q: "2/3 × 9", a: "6", choices: ["6", "3", "9"], explanation: "Simplification" },
  { q: "5/2 × 4", a: "10", choices: ["10", "20", "5"], explanation: "Produit" },
  { q: "7/5 × 10", a: "14", choices: ["14", "10", "7"], explanation: "Simplification" },

  { q: "12 ÷ 3 + 5 × 2", a: "14", choices: ["14", "10", "24"], explanation: "Priorités" },
  { q: "(12 ÷ 3 + 5) × 2", a: "18", choices: ["18", "14", "24"], explanation: "Parenthèses" },
  { q: "20 - 4²", a: "4", choices: ["4", "16", "12"], explanation: "4² = 16" },
  { q: "(20 - 4)²", a: "256", choices: ["256", "16", "64"], explanation: "16²" },
  { q: "50 ÷ (5 × 2)", a: "5", choices: ["5", "10", "25"], explanation: "Parenthèses" },

  { q: "0.25 × 8", a: "2", choices: ["2", "4", "1"], explanation: "Quart" },
  { q: "1.5 × 4", a: "6", choices: ["6", "5", "7"], explanation: "Multiplication" },
  { q: "2.4 ÷ 0.2", a: "12", choices: ["12", "10", "14"], explanation: "Décimaux" },
  { q: "3/5 + 2/5 × 5", a: "13/5", choices: ["13/5", "5", "1"], explanation: "Priorité multiplication" },
  { q: "10 - 2/5", a: "9.6", choices: ["9.6", "8", "9"], explanation: "2/5 = 0.4" }
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

  setTimeout(generateQuestion, 3000);
}

/* -----------------------
   CAMEMBERT
------------------------ */

const pieLevels = [
  // quart (4 parts)
  { label: "1/4" },
  { label: "2/4" },
  { label: "3/4" },
  { label: "4/4" },

  // équivalents simples
  { label: "1/2" },
  { label: "3/2" }, // plus dur
  { label: "2/2" },

  // tiers (nécessite 3 ou 6 parts)
  { label: "1/3" },
  { label: "2/3" },
  { label: "3/3" },

  // cinquièmes
  { label: "1/5" },
  { label: "2/5" },
  { label: "3/5" },
  { label: "4/5" },
  { label: "5/5" },

  // sixièmes (très utile pédagogiquement)
  { label: "1/6" },
  { label: "2/6" },
  { label: "3/6" },
  { label: "4/6" },
  { label: "5/6" },

  // huitièmes
  { label: "1/8" },
  { label: "2/8" },
  { label: "3/8" },
  { label: "4/8" },
  { label: "5/8" },
  { label: "6/8" },
  { label: "7/8" },

  // dixièmes (niveau +)
  { label: "1/10" },
  { label: "2/10" },
  { label: "3/10" },
  { label: "4/10" },
  { label: "5/10" },
  { label: "6/10" },
  { label: "7/10" },
  { label: "8/10" },
  { label: "9/10" },
];

let currentPie = null;
let selectedSlices = [];

function createPie(total) {
  slice.style.background = i % 2 === 0 ? "#f2f2f2" : "#d9d9d9";
  const pie = document.getElementById("pie");
  pie.innerHTML = "";

  for (let i = 0; i < total; i++) {
    const slice = document.createElement("div");
    slice.classList.add("slice");

    slice.onclick = () => toggleSlice(i);

    // rotation pour faire un vrai camembert
    const angle = 360 / total;
    slice.style.transform = `rotate(${i * angle}deg) skewY(${90 - angle}deg)`;

    pie.appendChild(slice);
  }
}

function newPie() {
  const possibleSizes = [4, 6, 8, 10, 12];

  const total = possibleSizes[Math.floor(Math.random() * possibleSizes.length)];

  createPie(total);
  selectedSlices = [];

  let valid;
  let num, den;

  do {
    valid = pieLevels[Math.floor(Math.random() * pieLevels.length)];
    [num, den] = valid.label.split("/").map(Number);
  } while ((num / den) * total % 1 !== 0);

  currentPie = valid;

  document.getElementById("pieLabel").textContent = "Fais : " + currentPie.label;
  document.getElementById("pieResult").textContent = "";
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

  const totalSlices = document.querySelectorAll(".slice").length;
  const selectedCount = selectedSlices.length;

  const [num, den] = currentPie.label.split("/").map(Number);
  const expected = (num / den) * totalSlices;

  if (selectedCount === expected) {
    result.textContent = "✅ Bravo ! " + currentPie.label;
    result.style.color = "green";
    setTimeout(newPie, 2000);
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