const canvas = document.getElementById('rotate');
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

const balls = [];
const Gravity = 0.8;
const getRandomNumber = (low, high) => {
	return Math.floor(Math.random() * (high - low) + 1) + low;
}

const getDistance = (x1, y1, x2, y2) => {
	let dx = x1 - x2;
	let dy = y1 - y2;
	return Math.sqrt(dx * dx - dy * dy);
}

const randomColors = colors => {
	return colors[Math.floor(Math.random() * colors.length)];
}

const mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2
}

window.addEventListener('mousemove', e => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
})

class Ball {
	constructor(x, y, dx, dy, radius, color) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.minRadius = radius;
		this.color = color;
		this.theta = Math.random() * 2 * Math.PI;
		this.speed = 0.05;
		this.distance = getRandomNumber(30, 60);
		this.lastMouse = {x, y};
	}

	draw(lastPosition) {
		ctx.beginPath();
		//ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.strokeStyle = this.color;
		ctx.moveTo(lastPosition.x, lastPosition.y);
		ctx.lineTo(this.x, this.y);
		ctx.stroke();
		ctx.closePath();
	}
	update() {
		const lastPosition = {
			x: this.x,
			y: this.y
		};
		this.theta += this.speed;
		this.lastMouse.x += (mouse.x - this.lastMouse.x) * this.speed;
		this.lastMouse.y += (mouse.y - this.lastMouse.y) * this.speed;

		this.x = this.lastMouse.x + Math.cos(this.theta) * this.distance;
		this.y = this.lastMouse.y + Math.sin(this.theta) * this.distance;
		
		this.draw(lastPosition);
	}
}

for (var i = 300; i > 0; i--) {
	let color = randomColors(colors);
	let radius = getRandomNumber(1, 1);
	ctx.lineWidth = this.radius;
	let x = canvas.width / 2; //getRandomNumber(radius, canvas.width - radius);
	let y = canvas.height / 2;// getRandomNumber(50, 250);
	let dx = 0;
	let dy = getRandomNumber(2, 5);
	balls.push(new Ball(x, y, dx, dy, radius, color));
}

const animate = () => {
	requestAnimationFrame(animate);
	ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let ball of balls) {
		ball.update();
	}
}

animate();