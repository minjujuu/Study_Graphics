// Vertex shader program
var VSHADER_SOURCE = 
'attribute vec4 a_Position;'+
'void main() {\n' +  
' gl_Position = a_Position;\n' +
' gl_PointSize = 10.0;\n' +
'}\n';

// Fragment shader program
var FSHADER_SOURCE =
'precision mediump float;'+
' uniform vec4 v_Color;' +
'void main() {\n' +
' gl_FragColor = v_Color;\n' +
'}\n';

// WEB GL 작동원리 https://webgl2fundamentals.org/webgl/lessons/ko/webgl-how-it-works.html
// unifrm https://heinleinsgame.tistory.com/8
// transformation https://palamore.tistory.com/346?category=427738 
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

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var shaderProgram = gl.createProgram();
    console.log(`shaderProgram = ${shaderProgram}`);
    gl.useProgram(shaderProgram);
    let vertexColorLocation = gl.getUniformLocation(shaderProgram, "v_Color");
    if(vertexColorLocation == -1) {
        console.log(`vertexColorLocation is -1`);
    }

    console.log(`vertexColorLocation = ${vertexColorLocation}`);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform4f(vertexColorLocation, 1.0, 0.0, 0.0, 1);

    // Draw a point
    gl.drawArrays(gl.POINTS, 0, 1);
}


// drawRectAtClick(): 팔레트에서 선택한 색깔로 그려질 사각형의 색상을 결정합니다.
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
    var shaderProgram = gl.createProgram();

    var x = e.clientX;
    var y = e.clientY;
    var rect = e.target.getBoundingClientRect();
    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);

    // Clear the canvas
    gl.clearColor(0.5, 0.5, 0.5, 0.9);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log(`Fail to get the storage location of a_Position`);
        return;
    }
    gl.vertexAttrib3f(a_Position, x, y, 0.0);

    gl.drawArrays(gl.POINTS, 0, 1);

    return;
    var vertices = [
        x-0.1, y, 0,
        x, y+0.1, 0,
        x+0.1, y, 0,
    ]

    
    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // var a_Position = gl.getAttribLocation(shaderProgram, "a_Position");
    // gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(a_Position);

 

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);

    // Clear the color and depth buffer
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Set the view port
    gl.viewport(0, 0, canvas.width, canvas.height);
    // Draw the triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // // 2차원 렌더링 컨텍스트를 나타내는 CanvasRenderingContext2D (en-US) 객체를 생성합니다.
    // var ctx = canvas.getContext('2d'); 
    // // 도형을 채우는 색을 설정합니다.
    // ctx.fillStyle = 'rgba(233, 230, 67, 1.0)';

    // // 시작점이 (x, y)이고 크기가 20x20인 사각형을 그립니다.
    // ctx.fillRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 20, 20);
}