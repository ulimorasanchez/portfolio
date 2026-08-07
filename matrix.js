const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const binary = "01";
const fontSize = 18;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  // darker fade → makes numbers less bright
  ctx.fillStyle = "rgba(15, 10, 31, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // dimmer purple numbers
  ctx.fillStyle = "rgba(196, 181, 253, 0.35)";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = binary[Math.floor(Math.random() * binary.length)];
    const x = i * fontSize;

    ctx.fillText(text, x, y * fontSize);

    // slower falling speed (5× slower)
    if (y * fontSize > canvas.height && Math.random() > 0.995) {
      drops[i] = 0;
    }

    drops[i] += 0.2; // original was 1 → now 0.2 (5× slower)
  });
}

// slower frame rate (optional extra smoothness)
setInterval(draw, 80); // original was 50 → slower
