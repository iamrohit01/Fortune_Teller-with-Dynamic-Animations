// Star field
const starCanvas = document.getElementById('stars');
const ctx = starCanvas.getContext('2d');
function resizeStars() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
function drawStars() {
  ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * starCanvas.width;
    const y = Math.random() * starCanvas.height;
    const r = Math.random() * 1.2 + 0.2;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,255,255,' + (Math.random() * 0.7 + 0.3) + ')';
    ctx.fill();
  }
}
resizeStars();
drawStars();
window.addEventListener('resize', () => {
  resizeStars();
  drawStars();
});
setInterval(drawStars, 3000);

// Fortunes
const fortunes = [
  "Your destiny is being updated. Please stand by...",
  "A great opportunity will soon fall into your lap.",
  "Beware the man with two phones.",
  "You will debug a bug that doesn't exist.",
  "They're watching you. Just smile.",
  "A mysterious stranger will change your life.",
  "You will find what you seek in the least expected place.",
  "The answer is hidden in plain sight.",
  "A secret will soon be revealed.",
  "You will soon receive a cryptic message.",
  "Trust your intuition, but not your memory.",
  "The stars are aligning in your favor.",
  "A shadow from your past returns.",
  "You will laugh at an unexpected moment.",
  "A journey you start will not end as you expect.",
  "You will meet someone who knows your name.",
  "The number 7 will be important to you soon.",
  "You will find a coin. Pick it up.",
  "A dream you have will come true.",
  "You will soon forget why you walked into the room.",
  "A glitch in the matrix is coming.",
  "You will hear your favorite song soon.",
  "Someone is thinking of you right now.",
  "You will soon have a déjà vu.",
  "The next fortune is false. The previous fortune is true."
];
let lastFortune = '';

// Elements
const crystalBall = document.getElementById('crystalBall');
const fortuneDiv = document.getElementById('fortune');
const whoosh = document.getElementById('whoosh');
const ambient = document.getElementById('ambient');
const toggleMode = document.getElementById('toggleMode');
let isDay = false;

// Crystal Ball SVG
crystalBall.innerHTML = `
  <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff" stop-opacity="0.8"/>
        <stop offset="60%" stop-color="#b3e5fc" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#7c4dff" stop-opacity="0.9"/>
      </radialGradient>
    </defs>
    <circle cx="90" cy="90" r="80" fill="url(#glow)"/>
    <ellipse cx="90" cy="110" rx="60" ry="30" fill="#fff3"/>
    <ellipse cx="70" cy="70" rx="12" ry="8" fill="#fff8"/>
  </svg>
`;

// Ambient sound
ambient.volume = 0.15;
ambient.play().catch(()=>{});

// Toggle day/night mode
toggleMode.addEventListener('click', () => {
  isDay = !isDay;
  document.body.classList.toggle('day', isDay);
  toggleMode.textContent = isDay ? '☀️ Day' : '🌙 Night';
});

// Show fortune
function showFortune() {
  let fortune;
  do {
    fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  } while (fortune === lastFortune && fortunes.length > 1);
  lastFortune = fortune;
  fortuneDiv.textContent = '';
  fortuneDiv.classList.remove('visible');
  crystalBall.classList.add('shake');
  crystalBall.classList.add('glow');
  whoosh.currentTime = 0;
  whoosh.play();
  setTimeout(() => {
    fortuneDiv.textContent = fortune;
    fortuneDiv.classList.add('visible');
    crystalBall.classList.remove('shake');
    crystalBall.classList.remove('glow');
    // Speech synthesis
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(fortune);
      utter.rate = 1.05;
      utter.pitch = 1.1;
      utter.volume = 0.7;
      utter.voice = speechSynthesis.getVoices().find(v => v.lang.startsWith('en')) || null;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }, 1200);
}
crystalBall.addEventListener('click', showFortune);
// Initial fortune
setTimeout(showFortune, 1200); 