export default class Matrix {
    constructor() {
        this.runTests();
    }

    runTests() {
        console.log('Matrix module loaded');
        // This is a scaling matrix
        const size = this.scale(6, 6, 1);

        // This is a translation matrix
        const pos = this.translate(8, 12, 0);

        // This is a rotation matrix
        const rot = this.rotateZ(Math.PI / 6);
        let out_mat = this.identity()
        let compose_mat = this.identity()


        // This is a vector
        const vec = new Float32Array([
            2, 2, 1, 1,
            3, 3, 1, 1,
            4, 4, 1, 1
        ]);
        let out_vec = new Float32Array(vec)

        let start = 0, end = 0;
        // start precision timer
        start = performance.now();

        // apply position (mat2) then rotation (mat3)
        for (let i = 0; i < 1_000_000; i++) {
            out_mat = this.mat4xmat4(pos, rot);
        }
        end = performance.now();
        console.table('matxmat result:', out_mat);
        console.log('matxmat time:', end - start, 'ms');

        start = performance.now();
        // apply translation (mat2) to the vector (vec)
        for (let i = 0; i < 1_000_000; i++) {
            out_vec = this.mat4xvec4(pos, vec);
        }
        end = performance.now();
        console.table('matxvec result:', out_vec);
        console.log('matxvec time:', end - start, 'ms');

        start = performance.now();
        // apply rotation (mat3), then scaling (mat1), then translation (mat2)
        // then reverse transform (should return the identity matrix)
        for (let i = 0; i < 100_000; i++) {
            compose_mat = this.compose([rot, size, pos, this.translate(-8, -12, 0), this.scale(1 / 6, 1 / 6, 1), this.rotateZ(-Math.PI / 6)]);
        }
        end = performance.now();
        console.table('compose result:', compose_mat);
        console.log("assert: compose matrix should be (0.866, -0.5, 0, 0.928, 0.5, 0.866, 0, 14.392, 0, 0, 1, 0, 0, 0, 0, 1) ")

        console.log('compose time:', end - start, 'ms');
    }

    identity() {
        return new Float32Array([
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1,
            1, 1, 1, 1
        ]);
    }

    translate(x, y, z = 0) {
        return new Float32Array([
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ]);
    }

    updateTranslate(translate, x, y, z = 0) {
        translate[0] = x
        translate[5] = y
        translate[10] = z
    }

    scale(x, y, z = 1) {
        return new Float32Array([
            x, 0, 0, 0,
            0, y, 0, 0,
            0, 0, z, 0,
            0, 0, 0, 1
        ]);
    }

    rotateZ(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Float32Array([
            cos, -sin, 0, 0,
            sin, cos, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    updateRotationZ(rotation, angle) {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        rotation[0] = cos;
        rotation[1] = -sin;
        rotation[4] = sin;
        rotation[5] = cos;
    }

    rotateX(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Float32Array([
            1, 0, 0, 0,
            0, cos, -sin, 0,
            0, sin, cos, 0,
            0, 0, 0, 1
        ]);
    }

    updateRotationX(rotation, angle) {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        rotation[5] = cos;
        rotation[6] = -sin;
        rotation[9] = sin;
        rotation[10] = cos;
    }

    rotateY(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Float32Array([
            cos, 0, -sin, 0,
            0, 1, 0, 0,
            sin, 0, cos, 0,
            0, 0, 0, 1
        ]);
    }

    updateRotationY(rotation, angle) {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        rotation[0] = cos;
        rotation[2] = -sin;
        rotation[8] = sin;
        rotation[10] = cos;
    }

    updatePerspctive(projection, vertex, dist = 3) {
        const z = 1 / (dist - vertex[2]);
        projection[0] = z;
        projection[5] = z;
    }

    // compose multiple matrices into a single matrix
    // should be applied in reverse order
    compose(matrices) {
        if (matrices.length <= 0) { return null };
        let out_mat = new Float32Array(matrices[0])
        for (let i = 1; i < matrices.length; i++) {
            out_mat = this.mat4xmat4(out_mat, matrices[i]);
        }
        return out_mat;
    }

    mat4xvec4(matrix, points) {
        const out_pts = new Float32Array(points.length)
        const numPoints = points.length / 4;
        const m0 = matrix[0], m1 = matrix[1], m2 = matrix[2], m3 = matrix[3];
        const m4 = matrix[4], m5 = matrix[5], m6 = matrix[6], m7 = matrix[7];
        const m8 = matrix[8], m9 = matrix[9], m10 = matrix[10], m11 = matrix[11];
        const m12 = matrix[12], m13 = matrix[13], m14 = matrix[14], m15 = matrix[15];

        for (let i = 0; i < numPoints; i++) {
            const index = i * 4;
            const x = points[index], y = points[index + 1], z = points[index + 2], w = points[index + 3];
            out_pts[index] = m0 * x + m1 * y + m2 * z + m3 * w;
            out_pts[index + 1] = m4 * x + m5 * y + m6 * z + m7 * w;
            out_pts[index + 2] = m8 * x + m9 * y + m10 * z + m11 * w;
            out_pts[index + 3] = m12 * x + m13 * y + m14 * z + m15 * w;
        }

        return out_pts;
    }

    mat4xmat4(matrix1, matrix2) {
        const out_mat = new Float32Array(16)
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                out_mat[i * 4 + j] = 0
                for (let k = 0; k < 4; k++) {
                    out_mat[i * 4 + j] += matrix1[i * 4 + k] * matrix2[k * 4 + j];
                }
            }
        }
        return out_mat;
    }
}