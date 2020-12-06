const userInterface = document.getElementById('user-interface');
const camera = document.getElementById('camera');
const scene = document.getElementById('scene');
const rotation = { x: 0, y: 0 };
const move = {
  up: false,
  down: false,
  left: false,
  right: false,
};
const position = { x: 0, y: 0, z: 0 };
let playing = false;
let speed = 4;

window.addEventListener('click', () => {
  document.body.requestPointerLock();
});

document.addEventListener('pointerlockchange', (event) => {
  if (document.pointerLockElement) {
    if (!playing) {
      playing = true;
      userInterface.style.display = 'none';
    }
  } else {
    if (playing) {
      playing = false;
      userInterface.style.display = 'block';
    }
  }
});

window.addEventListener('mousemove', (event) => {
  if (playing) {
    rotation.x -= event.movementY;
    rotation.y += event.movementX;
    if (rotation.x < -90) {
      rotation.x = -90;
    } else if (rotation.x > 90) {
      rotation.x = 90;
    }
    if (rotation.y >= 360) {
      rotation.y %= 360;
    } else if (rotation.y < 0) {
      rotation.y = 360 + rotation.y;
    }

    camera.style.transform = `translate3d(0px, 0px, 372px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'w') {
    move.up = true;
  }
  if (event.key.toLowerCase() === 's') {
    move.down = true;
  }
  if (event.key.toLowerCase() === 'a') {
    move.left = true;
  }
  if (event.key.toLowerCase() === 'd') {
    move.right = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key.toLowerCase() === 'w') {
    move.up = false;
  }
  if (event.key.toLowerCase() === 's') {
    move.down = false;
  }
  if (event.key.toLowerCase() === 'a') {
    move.left = false;
  }
  if (event.key.toLowerCase() === 'd') {
    move.right = false;
  }
});

function loop() {
  requestAnimationFrame(loop);

  if (playing) {
    if (move.up) {
      const rad = (rotation.y + 90) * (Math.PI / 180);
      position.x += Math.cos(rad) * speed;
      position.z += Math.sin(rad) * speed;
    }
    if (move.down) {
      const rad = (rotation.y + 90) * (Math.PI / 180);
      position.x -= Math.cos(rad) * speed;
      position.z -= Math.sin(rad) * speed;
    }
    if (move.left) {
      const rad = (rotation.y + 90) * (Math.PI / 180);
      position.x += Math.sin(rad) * speed;
      position.z -= Math.cos(rad) * speed;
    }
    if (move.right) {
      const rad = (rotation.y + 90) * (Math.PI / 180);
      position.x -= Math.sin(rad) * speed;
      position.z += Math.cos(rad) * speed;
    }

    scene.style.transform = `translate3d(${position.x}px, ${position.y}px, ${position.z}px)`;
  }
}
loop();
