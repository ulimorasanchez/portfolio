const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const binary = "01";
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);

// Each column's Y position
const drops = Array(columns).fill(0);

// Draw static background numbers first
function drawStaticBackground() {
  ctx.fillStyle = "#0f0a1f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(196, 181, 253, 0.15)"; // very dim
  ctx.font = fontSize + "px monospace";

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < canvas.height / fontSize; y++) {
      const text = binary[Math.floor(Math.random() * binary.length)];
      ctx.fillText(text, x * fontSize, y * fontSize);
    }
  }
}

// Draw slow falling numbers
function drawRain() {
  ctx.fillStyle = "rgba(15, 10, 31, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(196, 181, 253, 0.25)"; // slightly brighter than background
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = binary[Math.floor(Math.random() * binary.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    // VERY SLOW movement: only move every 5 seconds
    if (Math.random() > 0.995) {
      drops[i]++;
    }

    // Reset column when it reaches bottom
    if (y > canvas.height) {
      drops[i] = 0;
    }
  }
}

drawStaticBackground();
setInterval(drawRain, 80);
