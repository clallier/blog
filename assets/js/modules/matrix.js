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

        // This is a vector
        const vec = new Float32Array([2, 2, 0, 1]);

        let result = [];
        let start = 0, end = 0;
        // start precision timer
        start = performance.now();

        // apply position (mat2) then rotation (mat3)
        for (let i = 0; i < 1_000_000; i++) {
            result = this.mat4xmat4(pos, rot);
        }
        end = performance.now();
        console.table('matxmat result:', result);
        console.log('matxmat time:', end - start, 'ms');

        start = performance.now();
        // apply translation (mat2) to the vector (vec)
        for (let i = 0; i < 1_000_000; i++) {
            result = this.mat4xvec4(pos, vec);
        }
        end = performance.now();
        console.table('matxvec result:', result);
        console.log('matxvec time:', end - start, 'ms');

        start = performance.now();
        // apply rotation (mat3), then scaling (mat1), then translation (mat2)
        // then reverse transform (should return the identity matrix)
        for (let i = 0; i < 10_000; i++) {
            result = this.compose([rot, size, pos, this.translate(-8, -12, 0), this.scale(1 / 6, 1 / 6, 1), this.rotateZ(-Math.PI / 6)]);
        }
        end = performance.now();
        console.table('compose result:', result);
        console.log('compose time:', end - start, 'ms');
    }

    translate(x, y, z) {
        return new Float32Array([
            1, 0, 0, x,
            0, 1, 0, y,
            0, 0, 1, z,
            0, 0, 0, 1
        ]);
    }

    scale(x, y, z) {
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

    // compose multiple matrices into a single matrix
    // should be applied in reverse order
    compose(matrices) {
        if (matrices.length === 0) return null;
        let result = matrices[0];
        for (let i = 1; i < matrices.length; i++) {
            result = this.mat4xmat4(result, matrices[i]);
        }
        return result;
    }

    mat4xvec4(matrix, p) {
        return [
            matrix[0] * p[0] + matrix[1] * p[1] + matrix[2] * p[2] + matrix[3] * p[3],
            matrix[4] * p[0] + matrix[5] * p[1] + matrix[6] * p[2] + matrix[7] * p[3],
            matrix[8] * p[0] + matrix[9] * p[1] + matrix[10] * p[2] + matrix[11] * p[3],
            matrix[12] * p[0] + matrix[13] * p[1] + matrix[14] * p[2] + matrix[15] * p[3]
        ];
    }

    mat4xmat4(matrix1, matrix2) {
        const result = new Array(16);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                result[i * 4 + j] = 0;
                for (let k = 0; k < 4; k++) {
                    result[i * 4 + j] += matrix1[i * 4 + k] * matrix2[k * 4 + j];
                }
            }
        }
        return result;
    }
}