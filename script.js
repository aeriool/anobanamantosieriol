const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
let current = 0;

nextBtn.addEventListener('click', () => {
  const input = questions[current].querySelector('input,textarea');
  if(!input.value.trim()) { alert('Please answer 😅'); return; }

  // Animate fade out current
  questions[current].style.opacity = 0;
  questions[current].style.transform = 'translateY(-20px)';

  setTimeout(() => {
    questions[current].classList.remove('active');
    current++;
    if(current < questions.length){
      questions[current].classList.add('active');
      questions[current].style.opacity = 1;
      questions[current].style.transform = 'translateY(0)';
      progressBar.style.width = `${(current / questions.length) * 100}%`;
    } else {
      // Copy answers to clipboard
      let message = '';
      questions.forEach(q => {
        const label = q.querySelector('label').innerText;
        const val = q.querySelector('input,textarea').value || '';
        message += `${label}: ${val}\n`;
      });
      navigator.clipboard.writeText(message);
      alert('Copied 😳 Send it to me!');
      // Reset survey
      current = 0;
      questions.forEach(q => q.classList.remove('active'));
      questions[0].classList.add('active');
      questions[0].style.opacity = 1;
      questions[0].style.transform = 'translateY(0)';
      progressBar.style.width = '0%';
    }
  },300);
});