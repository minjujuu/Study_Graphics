// Vertex shader program
var VSHADER_SOURCE = 
'attribute vec4 a_Position;\n' +
'void main() {\n' +
' gl_Position = a_Position;\n' +
' gl_PointSize = 10.0;\n' +
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'void main() {\n' +
' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
'}\n';

function main() {
    //Retrieve <canvas> element
    var canvas = document.getElementById("webgl");

    // Get the rendering context for WebGL
    var gl = canvas.getContext('webgl');
    var program = gl.createProgram();

    if(!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    var a_Position = gl.getAttribLocation(program, 'a_Position');
    if(a_Position < 0) {
        console.log('Fail to get the storage location of a_Position');
        return;
    }
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);

    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
        console.log('Failed to create a buffer object');
        return -1;
    }

    var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    // Set the color for clearing <canvas>
    gl.clearColor(0.1, 0.2, 0.7, 1.0);
    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);
    // Set the view port
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.LINES, 0, 6);

    canvas.onmousedown = function(event) {
        console.log(`onmousedown`);
        click(event, gl, canvas, a_Position);
    };

    // Initialize shaders
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders');
        return;
    }

   

    // Draw a point
    //gl.drawArrays(gl.POINTS, 0, 1);
}

function click(e, gl, canvas, a_Position) {

    console.log(`click`);
    var x = e.clientX;
    var y = e.clientY;
    var rect = e.target.getBoundingClientRect();

    x = ((x-rect.left) - canvas.height/2) / (canvas.height/2);
    y = (canvas.width/2 - (y-rect.top)) / (canvas.width/2);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.vertexAttrib3f(a_Position, x, y, 0, 0);
    gl.drawArrays(gl.POINTS, 0, 1);
}