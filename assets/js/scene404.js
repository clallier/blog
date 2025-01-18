import Matrix from '/blog/assets/js/modules/matrix.js';

class Scene404 {
    constructor() {
        this.canvas = document.getElementById('terrainCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = "#333c"
        this.mtx = new Matrix();
        this.timeMs = 0;
        this.dtMs = 0;
        this.lastTimeMs = 0;
        this.time = 0;
        this.start = 0;
        this.end = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.terrain = this.createTerrain(100, 100);
        this.transformedTerrain = new Float32Array(this.terrain)

        this.transformation = this.mtx.identity()
        this.camTranslation = this.mtx.translate(this.width / 2, this.height / 2);
        this.translation = this.mtx.translate(0, 0, 1.2);
        this.scale = this.mtx.scale(this.height, this.height, 1);
        this.angle = Math.PI / 2
        this.rotY = this.mtx.rotateY(this.angle)
        this.rotZ = this.mtx.rotateZ(this.angle)
    }

    update = (ms) => {
        // time vars
        this.timeMs = ms;
        this.dtMs = this.timeMs - this.lastTimeMs;
        this.lastTimeMs = this.timeMs;
        this.time = this.timeMs * 0.001;

        // start precision timer
        this.start = performance.now();

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.updateTerrain()
        this.drawTerrain(this.transformedTerrain)
        // this.terrain = this.transformedTerrain

        // end precision timer
        this.end = performance.now();
        console.log('update time:', this.end - this.start, 'ms');
        // console.log('this.angle:', this.angle);

        // request another frame
        requestAnimationFrame(this.update);
    }

    updateTerrain() {
        this.angle += 0.01
        this.mtx.updateRotationY(this.rotY, this.angle)
        this.mtx.updateRotationZ(this.rotZ, this.angle / 8)
        // this.mtx.updateTranslate(this.translation, 0, 0, this.angle)

        this.transformation = this.mtx.compose([
            this.translation,
            this.scale,
            this.rotZ,
            this.rotY,
        ])
        this.transformedTerrain = this.mtx.mat4xvec4(this.transformation, this.terrain);

        // Apply perspective transformation
        const dist = 3.0; // You can adjust this value as needed
        const epsilon = 1e-6; // Small value to avoid division by zero
        for (let i = 0; i < this.transformedTerrain.length; i += 4) {
            const z = this.transformedTerrain[i + 2];

            // Calculate the perspective factor with epsilon to avoid division by zero
            const p = 1 / (dist - z + epsilon);

            // Apply the perspective factor to x and y
            this.transformedTerrain[i] *= p;
            this.transformedTerrain[i + 1] *= p;
        }
        this.transformedTerrain = this.mtx.mat4xvec4(this.camTranslation, this.transformedTerrain)
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
                const z = (Math.sin(x * 0.5) + Math.sin(y * 0.5)) * .5;
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