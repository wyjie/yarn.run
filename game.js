const canvas = document.getElementById('game');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const ctx = canvas.getContext('2d');

let mouse = {
	x: canvas.width / 2,
	y: canvas.height / 2
}
window.addEventListener('mousemove', e => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
})

let maxRadius = 50;

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
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // 鼠标交互
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
	}
}

//const ball = new Ball(300, 300, 10, 10, 5, 'red');
let balls = [];
let colors = [
	'#FFCE03',
	'#EB7A0C',
	'#FF5949',
	'#DC38E8',
	'#3A14FF'
];
for (var i = 500; i >= 0; i--) {
	let color = colors[Math.floor(Math.random() * 5)];
	let radius = Math.random() * 4 + 1;
	let x = Math.random() * (canvas.width - 2 * radius) + radius;
	let y = Math.random() * (canvas.height - 2 * radius) + radius;
	let dx = (Math.random() - 0.5) * 2;
	let dy = (Math.random() - 0.5) * 2;
	balls.push(new Ball(x, y, dx, dy, radius, color));
}
const animate = () => {
	requestAnimationFrame(animate);  //浏览器默认每秒刷新
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let ball of balls) {
		ball.update();
	}
}

animate();
