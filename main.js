/* --- PARTICLE NETWORK SYSTEM --- */
const canvas = document.getElementById('neural-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Particle Logic
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3; // Very slow, elegant movement
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 243, 255, 0.5)'; // Cyan color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Connect Particles
function init() {
    particles = [];
    const count = window.innerWidth < 768 ? 50 : 100;
    for (let i = 0; i < count; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.strokeStyle = `rgba(0, 243, 255, ${0.1 - dist/1200})`; // Subtle lines
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
init();
animate();

/* --- LIVE TERMINAL EFFECT --- */
const terminalOutput = document.getElementById('terminal-output');
const logMessages = [
    "> Initializing Core System...",
    "> Establishing Satellite Uplink [SECURE]...",
    "> Fetching Climate Data: Asia/Kathmandu...",
    "> Encrypting User Nodes...",
    "> Optimizing Neural Pathways...",
    "> Status: READY."
];

let msgIndex = 0;

function addLog() {
    if (msgIndex < logMessages.length) {
        const p = document.createElement('p');
        p.textContent = logMessages[msgIndex];
        p.style.opacity = '0';
        p.style.marginBottom = '5px';
        terminalOutput.appendChild(p);
        
        // Fade in effect
        setTimeout(() => { p.style.opacity = '1'; }, 100);
        
        msgIndex++;
        setTimeout(addLog, 1500); // Add new line every 1.5 seconds
    }
}
// Start logging after 1 second
setTimeout(addLog, 1000);

// Resize Handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

console.log("Hyperverse System: Online");
