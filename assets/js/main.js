// https://stackoverflow.com/questions/6964144/dynamically-generated-favicon?rq=3

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
const triangle = [
    [8, 0],
    [16, 16],
    [0, 16]
];
// TODO: this should be the transformation matrix
let tx = 1;

// apply a transform matrix to the points
let angle = 0;// Math.PI;
let timeMs = 0, dtMs = 0, lastTimeMs = 0;
let timeSinceLastUpdateMs = 0;

const update = (ms) => {
    timeMs = ms;
    dtMs = timeMs - lastTimeMs;
    lastTimeMs = timeMs;
    console.log(timeSinceLastUpdateMs.toFixed(2));

    // we cant update the favicon too fast
    timeSinceLastUpdateMs += dtMs;
    if (timeSinceLastUpdateMs < 300) {
        return requestAnimationFrame(update);
    }
    timeSinceLastUpdateMs = 0;

    // clear the canvas
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 16, 16);
    ctx.fill();

    // draw the time
    ctx.fillStyle = "#f00";
    ctx.fillRect(0, 0, 16, 7);
    ctx.fillStyle = '#fff';
    ctx.font = '10px sans-serif';
    ctx.fillText((timeMs * .001).toFixed(1), 0, 7);


    // angle = 0;
    // angle = angle % (2 * Math.PI);
    // const cos0 = Math.cos(angle);
    // const sin0 = Math.sin(angle);

    // apply the transform to the points
    // x' = a * x + c * y + e
    // y' = b * x + d * y + f
    // For the explanation of the formula, see:
    // https://en.wikipedia.org/wiki/Transformation_matrix#Affine_transformations
    // Here it applies a rotation of 45 degrees

    for (let i = 0; i < triangle.length; i++) {

        if(triangle[0][0] < 0) {
            tx = 1;
        } else if(triangle[0][0] > 16) {
            tx = -1;
        }

        const x = triangle[i][0];
        const y = triangle[i][1];
        triangle[i][0] = x + tx * .5;
        // triangle[i][0] = x * cos0 - y * sin0;
        // triangle[i][1] = x * sin0 + y * cos0;
    }

    // draw the triangle from the points in a loop
    ctx.beginPath();
    ctx.moveTo(triangle[0][0], triangle[0][1]);

    for (let i = 1; i < triangle.length; i++) {
        ctx.lineTo(triangle[i][0], triangle[i][1]);
    }

    ctx.fillStyle = '#00f';
    ctx.fill();
    ctx.closePath();

    
    // end of the draw loop
    // set the favicon
    link.href = canvas.toDataURL();
    // request another frame
    requestAnimationFrame(update);
}



requestAnimationFrame(update);
