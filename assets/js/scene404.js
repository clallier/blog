import Matrix from '/blog/assets/js/modules/matrix.js';

class Scene404 {
    constructor() {
        this.canvas = document.getElementById('terrainCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.mtx = new Matrix();
        this.timeMs = 0;
        this.dtMs = 0;
        this.lastTimeMs = 0;
        this.time = 0;
        this.start = 0;
        this.end = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.transformedTerrain = this.createTerrain(100, 100);
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

        this.drawTerrain(this.ctx, this.transformedTerrain);

        // end precision timer
        this.end = performance.now();
        console.log('update time:', this.end - this.start, 'ms');

        // request another frame
        requestAnimationFrame(this.update);
    }

    drawTerrain(ctx, terrain) {
        let x, y;
        terrain.forEach(vertex => {
            x = vertex[0] * 300 + 300;
            y = vertex[1] * 300 + 300;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 1, y + 1); // Draw a small line segment
            ctx.stroke();
            ctx.closePath();
        });

    }

    createTerrain(width, height) {
        const vertices = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const z = (Math.sin(x * 0.1) + Math.sin(y * 0.1)) * 0.5 + 0.5;
                // normalize x and y to range [-1, 1]
                vertices.push(new Float32Array([
                    x / width * 2 - 1, y / height * 2 - 1, z, 1]));
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