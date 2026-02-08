// Polished Survey Questions
const questions = [
  "What’s your favorite color?",
  "What kind of music do you usually listen to?",
  "Which song can you never skip?",
  "What’s your favorite food?",
  "What’s your go-to comfort food?",
  "What hobbies do you enjoy?",
  "Are you more of a dog person or a cat person? 🐶🐱",
  "What’s something you’re secretly really good at?",
  "Do you prefer memes or deep talks?",
  "What usually makes you smile instantly?",
  "What’s your ideal kind of date?",
  "What’s one thing you absolutely can’t live without?"
];

// Human-style subtle compliments (like welcome message style)
const compliments = [
  "Good taste huh 😏",
  "I see 😏",
  "Interesting 😏",
  "Love that 😏",
  "I get you 😏",
  "Nice 😏",
  "Hmm, okay 😏",
  "Got it 😏",
  "Cool 😏",
  "Ahh, makes sense 😏",
  "Not bad 😏",
  "Haha, love that 😏"
];

let current = 0;
let answers = [];

// LOGIN
function login() {
  const user = document.getElementById("username").value;
  if (!user) return alert("Enter something 😅");

  document.getElementById("login").classList.remove("active");
  const greet = document.getElementById("greet");
  greet.classList.add("active");
  document.getElementById("greetText").innerText = `Hi ${user} 😳`;

  setTimeout(() => {
    greet.classList.remove("active");
    document.getElementById("survey").classList.add("active");
    loadQuestion();
  }, 1500);
}

// SHOW CREATE / LOGIN
function showCreate() {
  document.getElementById("login").classList.remove("active");
  document.getElementById("createAccount").classList.add("active");
}

function showLogin() {
  document.getElementById("createAccount").classList.remove("active");
  document.getElementById("login").classList.add("active");
}

// CREATE ACCOUNT
function createAccount() {
  const name = document.getElementById("newName").value || "New User";
  const email = document.getElementById("newEmail").value || "example@mail.com";
  const pass = document.getElementById("newPass").value || "password";

  document.getElementById("createAccount").classList.remove("active");
  const greet = document.getElementById("greet");
  greet.classList.add("active");
  document.getElementById("greetText").innerText = `Hi ${name} 😳`;

  setTimeout(() => {
    greet.classList.remove("active");
    document.getElementById("survey").classList.add("active");
    loadQuestion();
  }, 1500);
}

// LOAD QUESTION
function loadQuestion() {
  const qText = document.getElementById("questionText");
  qText.innerText = questions[current];
  qText.style.opacity = 0;
  setTimeout(() => { qText.style.opacity = 1; }, 50);
  document.getElementById("answer").value = "";
  updateProgress();
}

// NEXT QUESTION
function nextQuestion() {
  const answer = document.getElementById("answer").value;
  if(!answer.trim()) return alert("Sagot muna 😅");

  answers.push(answer);

  const surveyCard = document.getElementById("survey");
  const qText = document.getElementById("questionText");

  // show human-like compliment
  qText.innerText = compliments[current];
  qText.style.opacity = 0;
  setTimeout(() => { qText.style.opacity = 1; }, 50);

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      // Done
      surveyCard.innerHTML =
        "<h2>All done 😌</h2><p>Thanks for sharing 💕</p>";

      // Auto-copy answers
      copyAnswers();
    }
  }, 1200);

  updateProgress();
}

// PROGRESS BAR
function updateProgress() {
  document.getElementById("progressBar").style.width =
    ((current) / questions.length) * 100 + "%";
}

// COPY ANSWERS
function copyAnswers() {
  const answerText = questions.map((q, i) => `${q} → ${answers[i]}`).join("\n");
  navigator.clipboard.writeText(answerText)
    .then(() => alert("All your answers copied! 😉"))
    .catch(err => console.error("Copy failed:", err));
}