const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let colors = [
	'#FFCE03',
	'#EB7A0C',
	'#FF5949',
	'#DC38E8',
	'#3A14FF'
];

let texts = ['i', 'love', 'you'];
const balls = [];
const Gravity = 0.8;
const getRandomNumber = (low, high) => {
	return Math.floor(Math.random() * (high - low) + 1) + low;
}

class Ball {
	constructor(x, y, dx, dy, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.minRadius = radius;
		this.color = color;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	update() {
		if(this.y + this.radius + this.dy + Gravity > canvas.height) {
			this.dy = -this.dy;
			this.dy *= 0.9;
		} else {
			this.dy += Gravity;
		}
		this.y += this.dy;
		this.draw();
	}
}

for (var i = 500; i >= 0; i--) {
	let color = colors[Math.floor(Math.random() * 5)];
	let radius = getRandomNumber(10, 20);
	let x = getRandomNumber(radius, canvas.width - radius);
	let y = getRandomNumber(50, 250);
	let dx = 0;
	let dy = getRandomNumber(1, 20);
	balls.push(new Ball(x, y, dx, dy, radius, color));
}

const animate = () => {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let ball of balls) {
		ball.update();
	}
}

animate();