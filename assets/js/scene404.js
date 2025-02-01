import Matrix from '/blog/assets/js/modules/matrix.js';

class Scene404 {
    constructor() {
        this.canvas = document.getElementById('terrainCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = this.setColorScheme();
        this.mtx = new Matrix();
        this.timeMs = 0;
        this.dtMs = 0;
        this.lastTimeMs = 0;
        this.time = 0;
        this.start = 0;
        this.end = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.mouseX = this.mouseY = 0;

        this.terrain = this.createTerrain(100, 100);
        this.transformedTerrain = new Float32Array(this.terrain)

        this.transformation = this.mtx.identity()
        this.camTranslation = this.mtx.translate(this.width / 2, this.height / 2);
        this.translation = this.mtx.translate(0, -.5, 1.2);
        this.scale = this.mtx.scale(this.height, this.height, 1);
        this.angleX = 0
        this.angleY = 0
        this.angleZ = 0
        this.rotX = this.mtx.rotateX(this.angleX)
        this.rotY = this.mtx.rotateY(this.angleY)
        this.rotZ = this.mtx.rotateZ(this.angleZ)

        this.registerListeners()
    }

    setColorScheme() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.ctx.strokeStyle = isDarkMode ? "#fffc" : "#333c";
    }

    registerListeners() {
        // mouse events
        this.canvas.addEventListener('pointermove', (event) => {
            this.updateCoordinates(event.clientX, event.clientY);
        }, { passive: true });
        this.canvas.addEventListener("pointerleave", () => {
            this.mouseX = this.mouseY = 0;
        }, { passive: true });

        // touch events
        this.canvas.addEventListener('touchstart', (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            this.updateCoordinates(touch.clientX, touch.clientY);
        }, { passive: false });
        this.canvas.addEventListener('touchmove', (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            this.updateCoordinates(touch.clientX, touch.clientY);
        }, { passive: false });
        this.canvas.addEventListener('touchend', () => {
            this.mouseX = this.mouseY = 0;
        }, { passive: true });
    }

    updateCoordinates(x, y, m) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = (x - rect.left) / rect.width;
        this.mouseY = (y - rect.top) / rect.height;
    }

    update = (ms) => {
        // time vars
        this.timeMs = ms;
        this.dtMs = this.timeMs - this.lastTimeMs;
        this.lastTimeMs = this.timeMs;
        this.time = this.timeMs * 0.001;

        // start timer
        this.start = performance.now();

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.updateTransformations()
        this.updateTerrain()
        this.drawTerrain(this.transformedTerrain)

        // end timer
        this.end = performance.now();
        // console.log('update time:', this.end - this.start, 'ms');
        // console.log('this.angle:', this.angle);

        // request another frame
        requestAnimationFrame(this.update);
    }

    updateTransformations() {
        if (this.mouseX && this.mouseY) {
            this.angleY += 0.02 * ((this.mouseX) - 0.5);
            this.angleY %= Math.PI * 2
            this.angleX += 0.02 * ((this.mouseY) - 0.5);
            this.angleX %= Math.PI * 2
        } else {
            this.angleX *= 0.97
            this.angleY *= 0.97
            this.angleZ *= 0.97
        }

        this.mtx.updateRotationX(this.rotX, this.angleX)
        this.mtx.updateRotationY(this.rotY, this.angleY)
        this.mtx.updateRotationZ(this.rotZ, this.angleZ)
        this.mtx.updateTranslateAdd(this.translation, 0, Math.cos(this.time) * .2, 0)
    }


    updateTerrain() {
        const t = this.time + 35;
        const a = 0.2 + Math.sin(t) * 0.3;
        let b = 0
        // console.log(this.terrain[0])
        for (let i = 0; i < this.terrain.length; i += 4) {
            const x = this.terrain[i + 0]
            const y = this.terrain[i + 1]
            this.terrain[i + 2] = 0.25 * (Math.sin(x * t) + Math.sin(y * t));
        }

        this.transformation = this.mtx.compose([
            this.translation,
            this.scale,
            this.rotZ,
            this.rotY,
            this.rotX,
        ])
        this.transformedTerrain = this.mtx.mat4xvec4(this.transformation, this.terrain);
        this.transformedTerrain = this.mtx.applySimplePerspective(this.transformedTerrain, this.camTranslation)
    }

    drawTerrain(terrain) {
        let x = 0, y = 0;
        const ctx = this.ctx;
        const numPoints = terrain.length / 4;

        for (let i = 0; i < numPoints; i++) {
            x = terrain[i * 4];
            y = terrain[i * 4 + 1];
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 1, y + 1); // Draw a small line segment
            ctx.stroke();
            ctx.closePath();
        }
    }

    createTerrain(width, height) {
        const numPoints = width * height;
        const vertices = new Float32Array(numPoints * 4); // 4 components per point

        let index = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const z = 0.25 * (Math.sin(x * 0.5) + Math.sin(y * 0.5));
                // normalize x and y to range [-1, 1]
                vertices[index++] = x / width - .5;
                vertices[index++] = y / height - .5;
                vertices[index++] = z;
                vertices[index++] = 1;
            }
        }


        return vertices;
    }

    startAnimation() {
        requestAnimationFrame(this.update);
    }
}

export default Scene404;

// Ensure the code runs after the script is loaded
window.addEventListener('load', () => {
    console.log('Scene404 loaded');
    const scene = new Scene404();
    scene.startAnimation();
});