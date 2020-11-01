const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numberOfParticles = 100;
let particlesArray = [];

const image = new Image();
image.src = "assets/img/leaf.svg";

// Logic
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 200 + 50;
    this.speed = Math.random() * 11 + 1;
    this.angle = Math.random() * 360;
    this.spin = Math.random() < 0.5 ? -1 : 1;
  //  sprite sheet control
  }
  draw() {
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle * Math.PI/360 * this.spin);
    ctx.drawImage(image, 0 - this.size/2, 0 - this.size/2, this.size, this.size);
    ctx.restore();
  }
  update(){
    this.angle++;
    if(this.y - this.size > canvas.height){
      this.y = 0 - this.size;
      this.x = Math.random() * canvas.width;
      this.size = Math.random() * 200 + 50;
      this.speed = Math.random() * 11 + 1;
    }
    this.y += this.speed;
  }
}

function init() {
  for(let i = 0; i < numberOfParticles; i++){
    particlesArray.push(new Particle());
  }
}

init();

// Animation

function animate() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  for(let i = 0; i < numberOfParticles; i++){
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animate);
}
animate();