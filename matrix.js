const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const binary = ["0", "1"]; // FIX: prevents symbols
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);

// Y position for each column
const drops = Array(columns).fill(0);

// Draw static background ONCE
function drawStatic() {
  ctx.fillStyle = "#0f0a1f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(196, 181, 253, 0.12)";
  ctx.font = fontSize + "px monospace";

  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < canvas.height / fontSize; y++) {
      const text = binary[Math.floor(Math.random() * 2)];
      ctx.fillText(text, x * fontSize, y * fontSize);
    }
  }
}

// Draw slow rain
function drawRain() {
  // Very light fade so rain stays visible
  ctx.fillStyle = "rgba(15, 10, 31, 0.02)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Rain is brighter so you SEE it
  ctx.fillStyle = "rgba(196, 181, 253, 0.55)";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = binary[Math.floor(Math.random() * 2)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    // FIX: faster trigger so rain appears quickly
    if (Math.random() > 0.97) {
      drops[i]++;
    }

    // Reset column when it reaches bottom
    if (y > canvas.height) {
      drops[i] = 0;
    }
  }
}

drawStatic();
setInterval(drawRain, 80);
