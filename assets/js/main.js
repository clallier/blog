// https://stackoverflow.com/questions/6964144/dynamically-generated-favicon?rq=3
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web

import Matrix from './modules/matrix.js';
const mtx = new Matrix();

// create a canvas element and get the context
const canvas = document.createElement('canvas');
canvas.width = 16;
canvas.height = 16;
const ctx = canvas.getContext('2d');

// draw everything
// ctx.fillStyle = "#000";
// ctx.fillRect(0, 0, 16, 16);
// ctx.fill();

// // draw a vertical gradient
// const gradient = ctx.createLinearGradient(0, 0, 0, 16);
// gradient.addColorStop(0, '#cff');
// gradient.addColorStop(1, '#fcc');
// ctx.fillStyle = gradient;
// ctx.fillRect(0, 0, 16, 16);
// ctx.fill();


// apply the favicon
const link = document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
// set the favicon
document.getElementsByTagName('head')[0].appendChild(link);

// // draw a circle
// ctx.beginPath();
// ctx.arc(8, 8, 4, 0, 2 * Math.PI);
// ctx.fillStyle = '#00f';
// ctx.fill();


// store the triangle points in an array
// const shape = [
//     [8, 0],
//     [16, 16],
//     [0, 16],
//     [8, 0]
// ];

// store the rectangle points in an array
const shape = [
    new Float32Array([-.5, -.5, -.5, 1]),
    new Float32Array([.5, -.5, -.5, 1]),
    new Float32Array([.5, .5, -.5, 1]),
    new Float32Array([-.5, .5, -.5, 1]),
    new Float32Array([-.5, -.5, .5, 1]),
    new Float32Array([.5, -.5, .5, 1]),
    new Float32Array([.5, .5, .5, 1]),
    new Float32Array([-.5, .5, .5, 1]),
];

const projection = mtx.scale(1, 1, 1);
const translation = mtx.translate(8, 8, 0);
const scale = mtx.scale(25, 25, 1);
const rotationZ = mtx.rotateZ(Math.PI / 6);
const rotationY = mtx.rotateY(Math.PI / 6);
const rotationX = mtx.rotateX(Math.PI / 6);

// apply a transform matrix to the points
let angle = 0;// Math.PI;
let timeMs = 0, dtMs = 0, lastTimeMs = 0;
let timeSinceLastUpdateMs = 0;
let start = 0, end = 0;

const update = (ms) => {
    // time vars
    timeMs = ms;
    dtMs = timeMs - lastTimeMs;
    lastTimeMs = timeMs;
    const time = timeMs * 0.001;
    // console.log(time.toFixed(0));

    // we cant update the favicon too fast
    timeSinceLastUpdateMs += dtMs;
    if (timeSinceLastUpdateMs < 100) {
        return requestAnimationFrame(update);
    }
    timeSinceLastUpdateMs = 0;

    // start precision timer
    start = performance.now();

    // clear the canvas
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 16, 16);
    ctx.fill();

    // draw the time
    // ctx.fillStyle = "#f00";
    // ctx.fillRect(0, 0, 16, 7);
    // ctx.fillStyle = '#fff';
    // ctx.textRendering = "optimizeSpeed";
    // ctx.font = '10px sans-serif';
    // ctx.fillText((timeMs * .001).toFixed(1), 0, 7);


    // update transformation matrix
    angle = .2 * time;
    // rotations
    mtx.updateRotationZ(rotationZ, angle);
    mtx.updateRotationY(rotationY, angle);
    mtx.updateRotationX(rotationX, angle);
    // y position (sin wave)
    // transformation[1][3] = 8 + Math.sin(.5 * time) * 4;

    // x and y scale (sin wave)
    // const scale = .5 + Math.sin(.5 * time) * .5; // between 0 and 1
    // transformation[0][0] = transformation[1][1] = 1 + Math.sin(scale * 1.57) * .5; // between 0.5 and 1.5

    // apply the transformation matrix to the points
    const transformed = shape
        .map(point => {
            const rotations = mtx.compose([
                rotationX,
                rotationY,
                // rotationZ,
            ]);

            // apply the rotations to the point
            point = mtx.mat4xvec4(rotations, point)

            // update projection matrix based on z value
            mtx.updatePerspctive(projection, point, 3);

            const transformation = mtx.compose([
                translation,
                scale,
                projection
            ]);

            return mtx.mat4xvec4(transformation, point)
        })

    // console.table("shape", shape);
    // console.table("shape transformed", transformed);


    // draw the shape from the points in a loop

    ctx.fillStyle = '#00fc';
    ctx.strokeStyle = '#ffc0cbcc';
    ctx.lineWidth = 1;

    ctx.moveTo(transformed[0][0], transformed[0][1]);
    for (let i = 0; i < transformed.length; i++) {
        // draw dots at the points
        ctx.fillRect(transformed[i][0] - 1, transformed[i][1] - 1, 2, 2);
    }

    // bottom face
    drawLine(transformed, 0, 1);
    drawLine(transformed, 1, 2);
    drawLine(transformed, 2, 3);
    drawLine(transformed, 3, 0);
    // top face
    drawLine(transformed, 4, 5);
    drawLine(transformed, 5, 6);
    drawLine(transformed, 6, 7);
    drawLine(transformed, 7, 4);
    // sides
    drawLine(transformed, 0, 4);
    drawLine(transformed, 1, 5);
    drawLine(transformed, 2, 6);
    drawLine(transformed, 3, 7);



    // end of the draw loop
    // set the favicon
    link.href = '';
    link.href = canvas.toDataURL('image/x-icon', 1);

    // end precision timer
    end = performance.now();
    // console.log('update time:', end - start, 'ms');

    // request another frame
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

function drawLine(transformed, i, j) {
    ctx.beginPath();
    ctx.moveTo(transformed[i][0], transformed[i][1]);
    ctx.lineTo(transformed[j][0], transformed[j][1]);
    ctx.stroke();
    ctx.closePath();
}

