import Player from './Player.js';
import Projectile from './Projectile.js';
import Enemy from './Enemy.js';
import Particle from './Particle.js';

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const scoreSpan = document.querySelector('#score');
const startBtn = document.querySelector('.start-button');
const modalWindow = document.querySelector('.modal');
const finalScore = document.querySelector('.final-score');

const ctx = canvas.getContext('2d');
const cnvWidth = canvas.width;
const cnvHeight = canvas.height;
const centerX = cnvWidth / 2;
const centerY = cnvHeight / 2;

let player = new Player(centerX, centerY, 10, 'white');
let projectiles = [];
let enemies = [];
let particles = [];

let animationID;
let score = 0;
let spawnInterval;

function init() {
    player = new Player(centerX, centerY, 10, 'white');
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreSpan.textContent = score;
    finalScore.textContent = score;
}

function updateLoop() {
    animationID = window.requestAnimationFrame(updateLoop);
    ctx.fillStyle = 'rgba(0,0,0, .1)';
    ctx.fillRect(0, 0, cnvWidth, cnvHeight);
    player.draw(ctx);

    particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        } else {
            particle.update(ctx);
        }
    });
    /* Updates position of projectile on a board*/
    projectiles.forEach((projectile, index) => {
        projectile.update(ctx);

        if (
            projectile.x - projectile.radius < 0 ||
            projectile.x - projectile.radius > cnvWidth ||
            projectile.y - projectile.radius < 0 ||
            projectile.y - projectile.radius > cnvHeight
        ) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        }
    });
    /* Updates position of enemy on a board*/
    enemies.forEach((enemy, enemyIndex) => {
        enemy.update(ctx);
        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist - enemy.radius - player.radius < 0) {
            cancelAnimationFrame(animationID);
            clearInterval(spawnInterval);
            modalWindow.classList.remove('hidden');
            finalScore.textContent = score;
        }
        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(
                projectile.x - enemy.x,
                projectile.y - enemy.y
            );
            // when projectile touch enemy
            if (dist - enemy.radius - projectile.radius < 1) {
                // create explosions
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(
                        new Particle(
                            projectile.x,
                            projectile.y,
                            Math.random() * 2,
                            enemy.color,
                            {
                                x: (Math.random() - 0.5) * (Math.random() * 5),
                                y: (Math.random() - 0.5) * (Math.random() * 5),
                            }
                        )
                    );
                }
                if (enemy.radius - 10 > 10) {
                    //increase score
                    score += 100;
                    scoreSpan.textContent = score;

                    gsap.to(enemy, {
                        radius: enemy.radius - 10,
                    });
                    setTimeout(() => {
                        projectiles.splice(projectileIndex, 1);
                    }, 0);
                } else {
                    //increase score
                    score += 250;
                    scoreSpan.textContent = score;

                    setTimeout(() => {
                        enemies.splice(enemyIndex, 1);
                        projectiles.splice(projectileIndex, 1);
                    }, 0);
                }
            }
        });
    });
}

function spawnEnemies() {
    spawnInterval = setInterval(() => {
        console.log(1);
        const radius = Math.random() * (30 - 10) + 10;
        let x, y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : cnvWidth + radius;
            y = Math.random() * cnvHeight;
        } else {
            x = Math.random() * cnvWidth;
            y = Math.random() < 0.5 ? 0 - radius : cnvHeight + radius;
        }

        const color = `hsl(${Math.random() * 360},100%,50%)`;
        const angle = Math.atan2(centerY - y, centerX - x);
        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle),
        };
        if (score >= 1000) {
            velocity.x *= 1 + score / 5000;
            velocity.y *= 1 + score / 5000;
        }
        console.log(velocity.x, velocity.y);
        enemies.push(new Enemy(x, y, radius, color, velocity));
    }, 1000);
}

window.addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5,
    };
    projectiles.push(new Projectile(centerX, centerY, 5, 'white', velocity));
});
startBtn.addEventListener('click', () => {
    modalWindow.classList.add('hidden');
    init();
    updateLoop();
    spawnEnemies();
});
