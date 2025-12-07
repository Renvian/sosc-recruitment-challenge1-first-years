// Neon zoom on proximity
const nameEl = document.getElementById("name");
window.addEventListener("mousemove", (e) => {
  const rect = nameEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = e.clientX - cx;
  const dy = e.clientY - cy;
  const dist = Math.sqrt(dx*dx + dy*dy);
  if (dist < 180) nameEl.classList.add("prox-active");
  else nameEl.classList.remove("prox-active");
});

// Button click interaction
const infoBtn = document.getElementById("info-btn");
infoBtn.addEventListener("click", () => {
    infoBtn.style.background = 'rgba(0,180,255,0.5)';
    infoBtn.style.boxShadow = '0 0 25px rgba(0,180,255,0.6)';
    setTimeout(() => {
        infoBtn.style.background = 'rgba(0,240,255,0.1)';
        infoBtn.style.boxShadow = '0 0 15px rgba(0,240,255,0.25)';
    }, 200);
    alert("JS effect working!");
});

// Particle constellation background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', ()=>{
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});

const particles = [];
for(let i=0;i<80;i++){
    particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        vx: (Math.random()-0.5)*0.5,
        vy: (Math.random()-0.5)*0.5,
        radius: Math.random()*2+1
    });
}

function animate(){
    ctx.clearRect(0,0,w,h);

    for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist<140){
                ctx.beginPath();
                ctx.strokeStyle='rgba(0,240,255,'+(0.2-dist/700)+')';
                ctx.lineWidth=1;
                ctx.moveTo(particles[i].x,particles[i].y);
                ctx.lineTo(particles[j].x,particles[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    for(let i=0;i<particles.length;i++){
        let p=particles[i];
        p.x+=p.vx;
        p.y+=p.vy;
        if(p.x<0||p.x>w)p.vx*=-1;
        if(p.y<0||p.y>h)p.vy*=-1;
        ctx.beginPath();
        ctx.fillStyle='rgba(0,240,255,0.8)';
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

    requestAnimationFrame(animate);
}
animate();
