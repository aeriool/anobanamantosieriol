const questions = [
  "Favorite color?",
  "Music taste?",
  "Song you never skip?",
  "Favorite food?",
  "Comfort food?",
  "Hobbies?",
  "Are you a dog or cat person? 🐶🐱",
  "Something you're secretly good at",
  "Are you more memes or deep talks?",
  "What makes you smile instantly?",
  "Favorite kind of date?",
  "One thing you can’t live without"
];

const compliments = [
  "💖 🤔 interesting…",
  "😏 🤔 hmm… nice",
  "😅 🤔 okay…",
  "😎 🤔 cool",
  "😄 🤔 I see",
  "💜 🤔 got it…",
  "😍 🤔 cute",
  "🤭 🤔 not bad…",
  "💛 🤔 haha…",
  "💖 🤔 love that…",
  "😎 🤔 nice choice",
  "😄 🤔 I get you"
];

let current = 0;
let answers = [];

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

function loadQuestion() {
  const qText = document.getElementById("questionText");
  qText.innerText = questions[current];
  qText.style.opacity = 0;
  setTimeout(() => { qText.style.opacity = 1; }, 50); // fade-in effect
  document.getElementById("answer").value = "";
  updateProgress();
}

function nextQuestion() {
  const answer = document.getElementById("answer").value;
  if(!answer.trim()) return alert("Sagot muna 😅");

  answers.push(answer);

  // show emoji + light compliment with fade
  const surveyCard = document.getElementById("survey");
  const qText = document.getElementById("questionText");
  qText.innerText = compliments[current];
  qText.style.opacity = 0;
  setTimeout(() => { qText.style.opacity = 1; }, 50);

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      // done message
      surveyCard.innerHTML =
        "<h2>All done 😌</h2><p>Thanks for sharing 💕</p>";

      // automatically copy answers
      copyAnswers();
    }
  }, 1200);

  updateProgress();
}

function updateProgress() {
  document.getElementById("progressBar").style.width =
    ((current) / questions.length) * 100 + "%";
}

// COPY ANSWERS FUNCTION
function copyAnswers() {
  const answerText = questions.map((q, i) => `${q} → ${answers[i]}`).join("\n");
  navigator.clipboard.writeText(answerText)
    .then(() => alert("All your answers copied! 😉"))
    .catch(err => console.error("Copy failed:", err));
}