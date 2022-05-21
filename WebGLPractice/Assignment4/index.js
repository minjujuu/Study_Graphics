//https://stackoverflow.com/questions/26742317/drawing-a-cube-in-webgl
// Vertex shader program
// var VSHADER_SOURCE = 
// 'attribute vec4 vPosition;'+
//  'uniform mat4 vColor;' +
//  'varying vec4 fColor;' +
//  'uniform mat4 modelViewMatrix;' +
//  'uniform mat4 projectionMatrix;' +
// 'void main() {\n' +  
// ' gl_Position = projectionMatrix*modelViewMatrix*vPosition;\n' +
// ' fColor = vColor;\n' +
// '}\n';

// // Fragment shader program
// var FSHADER_SOURCE =
// 'precision mediump float;'+
// ' varying vec4 fColor;' +
// 'void main() {\n' +
// 'gl_FragColor = fColor;\n' +
// '}\n';

var canvas;
var gl;

// 정육면체 => 꼭짓점 4개 * 6면
var NumVertices  = 24;
var vertices = [
    vec4(-0.5, -0.5,  1.5, 1.0),//1
    vec4(-0.5,  0.5,  1.5, 1.0),//2
    vec4(-0.5, -0.5,  1.5, 1.0),//1
    vec4(0.5, -0.5,  1.5, 1.0),//4
    vec4(-0.5, -0.5,  1.5, 1.0),//1
    vec4(-0.5, -0.5, 0.5, 1.0),//5
    vec4(-0.5,  0.5,  1.5, 1.0),//2
    vec4(0.5,  0.5,  1.5, 1.0),//3
    vec4(-0.5,  0.5,  1.5, 1.0),//2
    vec4(-0.5,  0.5, 0.5, 1.0),//6
    vec4(0.5,  0.5,  1.5, 1.0),//3
    vec4(0.5, -0.5,  1.5, 1.0),//4
    vec4(0.5,  0.5,  1.5, 1.0),//3
    vec4(0.5,  0.5, 0.5, 1.0),//7
    vec4(0.5, -0.5,  1.5, 1.0),//4
    vec4( 0.5, -0.5, 0.5, 1.0), //8
    vec4(-0.5, -0.5, 0.5, 1.0),//5
    vec4(-0.5,  0.5, 0.5, 1.0),//6
    vec4(-0.5, -0.5, 0.5, 1.0),//5
    vec4( 0.5, -0.5, 0.5, 1.0), //8
    vec4(-0.5,  0.5, 0.5, 1.0),//6
    vec4(0.5,  0.5, 0.5, 1.0),//7
    vec4(0.5,  0.5, 0.5, 1.0),//7
    vec4( 0.5, -0.5, 0.5, 1.0) //8
];

// var vertices = [
//     // 앞면(Front face)
//     -1.0, -1.0,  1.0,
//      1.0, -1.0,  1.0,
//      1.0,  1.0,  1.0,
//     -1.0,  1.0,  1.0,
  
//     // 뒤면(Back face)
//     -1.0, -1.0, -1.0,
//     -1.0,  1.0, -1.0,
//      1.0,  1.0, -1.0,
//      1.0, -1.0, -1.0,
  
//     // 위면(Top face)
//     -1.0,  1.0, -1.0,
//     -1.0,  1.0,  1.0,
//      1.0,  1.0,  1.0,
//      1.0,  1.0, -1.0,
  
//     // 아래면(Bottom face)
//     -1.0, -1.0, -1.0,
//      1.0, -1.0, -1.0,
//      1.0, -1.0,  1.0,
//     -1.0, -1.0,  1.0,
  
//     // 오른쪽면(Right face)
//      1.0, -1.0, -1.0,
//      1.0,  1.0, -1.0,
//      1.0,  1.0,  1.0,
//      1.0, -1.0,  1.0,
  
//     // 왼쪽면(Left face)
//     -1.0, -1.0, -1.0,
//     -1.0, -1.0,  1.0,
//     -1.0,  1.0,  1.0,
//     -1.0,  1.0, -1.0
//   ];

var vertexColors = [
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red

    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
];

var near = 0.3;
var far = 10.0;
var radius = 4.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0;

var  fovy = 90.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);


var program;
var program_originline;

var cBuffer;
var vColor;
var vBuffer;
var vPosition;

var l_vBuffer;
var l_vPosition;
var l_cBuffer;
var l_vColor;


window.onload = function init() { // 콜백함수, onload = 모든코드가 로드된 후 시작할 위치를 지정

    // 'gl-canvas' 아이디를 가진 캔버스를 읽어옵니다.
    canvas = document.getElementById( "gl-canvas" );
    if(!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // 불러온 canvas를 인자로 넘겨 WebGL 코드를 설정
    gl = WebGLUtils.setupWebGL( canvas );
    // gl = canvas.getContext('webgl');
    // 불러온 canvas를 인자로 넘겨, WebGL코드를 설정해줌
    if (!gl) { alert("WebGL isn't available"); }
  //=====================================================================

    // viewport(): WebGL 컨텍스트를 처음 만들 때 뷰포트의 크기는 캔버스의 크기와 일치
    // - 캔버스의 크기를 조정하는 경우 viewport를 통해 설정
    gl.viewport( 0, 0, canvas.width, canvas.height );
    
    aspect =  canvas.width/canvas.height;

    // gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    // enable(): 컨텍스트에 대한 특정 WebGL 기능을 활성화 
    // - 여기에선 깊이 비교 및 깊이 버퍼 업데이트 활성화
    gl.enable(gl.DEPTH_TEST);

     //=====================================================================
    // Initialize shaders
    program_originline = initShaders( gl, "vertex-shader", "fragment-shader" );
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    if(!program) {
        console.log('program is null');
    }

    //=====================================================================

    // Color 버퍼를 만들고 컬러값인 vertexColors를 설정
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );    

    // vColor 애트리뷰트를 가져옵니다.
    vColor = gl.getAttribLocation( program, "vColor" );
    // gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vColor );

    //=====================================================================

    // 1. 버퍼를 생성합니다.
    vBuffer = gl.createBuffer();
    // 2. 생성된 버퍼를 작업할 버퍼로 지정합니다.
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    // 3. 지정된 버퍼에 데이터를 전달합니다.
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    //=====================================================================

    // vPosition 애트리뷰트를 가져옵니다.
    vPosition = gl.getAttribLocation( program, "vPosition" );
    // gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vPosition );

    //=====================================================================

    //Static Line
    var l_vertices = [
        vec4(0.0, 0.0,  0.0, 1.0),
        vec4(5.0,  0.0,  0.0, 1.0),
        vec4(0.0, 0.0,  0.0, 1.0),
        vec4(0.0,  5.0,  0.0, 1.0),
        vec4(0.0, 0.0,  0.0, 1.0),
        vec4(0.0,  0.0,  5.0, 1.0),
        vec4(0.0, 0.0,  0.0, 1.0),
        vec4(-5.0,  0.0,  0.0, 1.0),
        vec4(0.0, 0.0,  0.0, 1.0),
        vec4(0.0,  -5.0,  0.0, 1.0),
        vec4(0.0, 0.0,  0.0, 1.0),
        vec4(0.0,  0.0,  -5.0, 1.0)
        ];
    
    // 1. 버퍼를 생성합니다.
    l_vBuffer = gl.createBuffer();
    // 2. 생성된 버퍼를 작업할 버퍼로 지정합니다.
    gl.bindBuffer( gl.ARRAY_BUFFER, l_vBuffer );
    // 3. 지정된 버퍼에 데이터를 전달합니다.
    gl.bufferData( gl.ARRAY_BUFFER, flatten(l_vertices), gl.STATIC_DRAW );
    // vPosition 애트리뷰트를 가져옵니다.
    l_vPosition = gl.getAttribLocation(program_originline, "vPosition" );


    var l_colors = [
        vec4(1.0, 1.0,  0.0, 1.0),
        vec4(1.0, 1.0,  0.0, 1.0),
        vec4(1.0, 1.0,  0.0, 1.0),
        vec4(1.0, 1.0,  0.0, 1.0),
        vec4(1.0, 1.0,  0.0, 1.0),
        vec4(1.0, 1.0,  0.0, 1.0),

        vec4(0.0, 0.0,  1.0, 1.0),
        vec4(0.0, 0.0,  1.0, 1.0),
        vec4(0.0, 0.0,  1.0, 1.0),
        vec4(0.0, 0.0,  1.0, 1.0),
        vec4(0.0, 0.0,  1.0, 1.0),
        vec4(0.0, 0.0,  1.0, 1.0)
        ];

    // 1. 버퍼를 생성합니다.
    l_cBuffer = gl.createBuffer();
    // 2. 생성된 버퍼를 작업할 버퍼로 지정합니다.
    gl.bindBuffer( gl.ARRAY_BUFFER, l_cBuffer );
    // 3. 지정된 버퍼에 데이터를 전달합니다.
    gl.bufferData( gl.ARRAY_BUFFER, flatten(l_colors), gl.STATIC_DRAW );
    // vColor 애트리뷰트를 가져옵니다.
    l_vColor = gl.getAttribLocation( program_originline, "vColor" );


    // buttons for viewing parameters
    document.getElementById("Button1").onclick = function(){near  *= 1.1; far *= 1.1;};
    document.getElementById("Button2").onclick = function(){near *= 0.9; far *= 0.9;};
    document.getElementById("Button3").onclick = function(){radius *= 2.0;};
    document.getElementById("Button4").onclick = function(){radius *= 0.5;};
    document.getElementById("Button5").onclick = function(){theta += dr;};
    document.getElementById("Button6").onclick = function(){theta -= dr;};
    document.getElementById("Button7").onclick = function(){phi += dr;};
    document.getElementById("Button8").onclick = function(){phi -= dr;};

    render(); 
}


// 매 Tick 마다 실행되는 함수 
function render(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(program_originline == null) {
        console.log('program_originline is null');
    }
    //LINE PROGRAM
     gl.useProgram( program_originline );
    /* ------------------ l_vPosition -------------- */
    // 그림 그리기 전에 아래 3개의 명령을 실행합니다.
    // 1. 해당 애트리뷰트 위치를 사용할 수 있도록 설정합니다.
    gl.enableVertexAttribArray( l_vPosition );
    // 2. 애트리뷰트가 참조할 버퍼를 알려줍니다.
    gl.bindBuffer( gl.ARRAY_BUFFER, l_vBuffer );

    /* 3. 애트리뷰트가 현재의 ARRAY_BUFFER의 바인드 포인트에서 데이터를 어떻게 가져올지 지시하는 역할을 합니다.
        gl.vertexAttribPointer
       - 첫번째: 애트리뷰트 위치
       - 두번째: 정점당 얼마나 많은 컴포넌트를 가져오는지 (항상 1 ~ 4, 셰이더에서 vec1 ~ vec4 이므로)
       - 세번째: 데이터 타입
       - 네번째: normalizedFlag
       - 다섯번째: 하나의 데이터에서 다음 데이터 조각을 가져오기 위해 건너뛸 바이트 수 (stride)
       - 여섯번째: 버퍼의 어디서부터 읽기 시작할지 설정
    */
    gl.vertexAttribPointer( l_vPosition, 4, gl.FLOAT, false, 0, 0 );
    
    /* ------------------ l_vColor -------------- */
    // 1. 해당 애트리뷰트 위치를 사용할 수 있도록 설정합니다.
    gl.enableVertexAttribArray( l_vColor );
    // 2. 애트리뷰트가 참조할 버퍼를 알려줍니다.
    gl.bindBuffer( gl.ARRAY_BUFFER, l_cBuffer );
    // 3. 애트리뷰트가 현재의 ARRAY_BUFFER의 바인드 포인트에서 데이터를 어떻게 가져올지 지시하는 역할을 합니다.
    gl.vertexAttribPointer( l_vColor, 4, gl.FLOAT, false, 0, 0 );   
    // Draws a line between a pair of vertices.
    gl.drawArrays( gl.LINES, 0, 12);

    if(program == null) {
        console.log('program is null');
    }
    
    modelViewMatrixLoc = gl.getUniformLocation( program_originline, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program_originline, "projectionMatrix" );

    eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );


    //CUBE PROGRAM
    gl.useProgram( program );
    /* ------------------ vPosition -------------- */
    // 그림 그리기 전에 아래 3개의 명령을 실행합니다.
    // 1. 해당 애트리뷰트 위치를 사용할 수 있도록 설정합니다
    gl.enableVertexAttribArray( vPosition );
    // 2. 애트리뷰트가 참조할 버퍼를 알려줍니다.
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    // 3. 애트리뷰트가 현재의 ARRAY_BUFFER의 바인드 포인트에서 데이터를 어떻게 가져올지 지시하는 역할을 합니다.
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    /* ------------------ vColor -------------- */
    // 그림 그리기 전에 아래 3개의 명령을 실행합니다.
    // 1. 해당 애트리뷰트 위치를 사용할 수 있도록 설정합니다
    gl.enableVertexAttribArray( vColor );
    // 2. 애트리뷰트가 참조할 버퍼를 알려줍니다.
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    // 3. 애트리뷰트가 현재의 ARRAY_BUFFER의 바인드 포인트에서 데이터를 어떻게 가져올지 지시하는 역할을 합니다.
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.drawArrays( gl.LINES, 0, 24 );

    // program에 있는 'modelViewMatrix'를 가져옵니다.
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    // program에 있는 'projectionMatrix'를 가져옵니다.
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    eye = vec3(radius*Math.sin(theta)*Math.cos(phi),radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix) );

    // 매 tick마다 실행되도록 함
    window.requestAnimationFrame(render);
}