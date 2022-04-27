// Vertex shader program
var VSHADER_SOURCE = 
'attribute vec4 a_Position;'+
 'uniform mat4 u_matrix;' +
'void main() {\n' +  
' gl_Position = u_matrix * a_Position;\n' +
' gl_PointSize = 10.0;\n' +
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'precision mediump float;'+
' uniform vec4 v_Color;' +
'void main() {\n' +
' gl_FragColor = v_Color;\n' +
'}\n';

var bTranslate = false;
var bRotate = false;
var matrix = new Matrix4();

function main() {
    //Retrieve <canvas> element
    var canvas = document.getElementById("webgl");

    // Get the rendering context for WebGL
    var gl = canvas.getContext('webgl');
    if(!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders');
        return;
    }

    // Set the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var u_matrix = gl.getUniformLocation(gl.program, 'u_matrix');
    if (u_matrix < 0) {
        console.log(`Fail to get the storage location of u_matrixs`);
        return;
    } 

    // 초기화
    gl.uniformMatrix4fv(u_matrix, false, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw a point
    gl.drawArrays(gl.POINTS, 0, 1);
}

function drawTriangleAtClick(e) {
    // html에서 rectSketchBook의 Id를 가진 element를 가져옵니다.
    var canvas = document.getElementById('webgl');
    if(!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }
    // Get the rendering context for WebGL
    var gl = canvas.getContext('experimental-webgl');
    if(!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    // Initialize shaders
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders');
        return;
    }

    // Clear the canvas
    gl.clearColor(0.2, 0.3, 0.7, 0.9);

    var u_matrix = gl.getUniformLocation(gl.program, 'u_matrix');
    if (u_matrix < 0) {
        console.log(`Fail to get the storage location of u_matrixs`);
        return;
    } 

    // 초기화
    gl.uniformMatrix4fv(u_matrix, false, [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);

    var x = e.clientX;
    var y = e.clientY;
    var rect = e.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log(`Fail to get the storage location of a_Position`);
        return;
    }
    gl.vertexAttrib3f(a_Position, x, y, 0.0);

    // 삼각형을 만들기 위한 배열 
    var vertices = [
        x - 0.1, y, 0,
        x, y + 0.1, 0,
        x + 0.1, y, 0,
    ]

    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);

    // Clear the color and depth buffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Set the view port
    gl.viewport(0, 0, canvas.width, canvas.height);
    // Draw the triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    var tick = function() {

        if(bTranslate) {
            matrix.translate(0.001, 0.0, 0.0);
            gl.uniformMatrix4fv(u_matrix, false, matrix.elements);
        }
        if(bRotate) {
            matrix.rotate(1, 0, 0, 1);
            gl.uniformMatrix4fv(u_matrix, false, matrix.elements);
        }
        // Enable the depth test
        gl.enable(gl.DEPTH_TEST);

        // Clear the color and depth buffer
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set the view port
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, 3);        
        requestAnimationFrame(tick);
    };
    tick();

}

function onClickMoveButton() {
    bTranslate = true;
}

function onClickRotateButton() {
    bRotate = true;
}