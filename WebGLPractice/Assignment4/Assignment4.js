/* 201914302 박민주
   컴퓨터그래픽스 실습과제 4 */

var canvas;
var gl;

// 큐브 2개 = 사각형 12개 * 면당 정점 6개  = 72
var NumVertices  = 72;

//정점을 저장하는 배열
var points = [];

//색상을 저장하는 배열
var colors = [];

var near = 0.6;
var far = 40.0;
var radius = 10.0;
var theta  = 0.0;
var phi    = 0.0;
var dr = 5.0 * Math.PI/180.0; // 각도를 라디안으로 변환 (초기값은 5도의 라디안)

var  fovy = 90.0;  // Field-of-view in Y direction angle (in degrees)
var  aspect;       // Viewport aspect ratio

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var program;

// 키 입력 시 카메라의 Pan과 Zoom이 되도록 변수를 설정합니다.
function onKeyDown(event)
{
    if (event.key == '+')
    {
        radius *= 0.5;
    }
    else if (event.key == '-')
    {
        radius *= 1.5;
    }

    if(event.key == 'ArrowLeft') {
        theta -= dr;
    } else if(event.key == 'ArrowRight') {
        theta += dr;
    }
}

//=====================================================================
// 콜백함수, onload = 모든코드가 로드된 후 시작할 위치를 지정합니다.
window.onload = function init()
{
    // 키 입력에 대한 이벤트 리스너를 등록합니다.
    document.addEventListener('keydown', onKeyDown, false);
    // 'gl-canvas' 아이디를 가진 캔버스를 읽어옵니다.
    canvas = document.getElementById( "gl-canvas" );

    // 불러온 canvas를 인자로 넘겨 WebGL 코드를 설정합니다.
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //함수 실행
    colorCube();
    //=====================================================================
    // viewport(): 캔버스의 크기를 조정하는 경우 viewport를 통해 설정
    gl.viewport( 0, 0, canvas.width, canvas.height );
    aspect =  canvas.width/canvas.height;
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); //배경색

    // enable(): 컨텍스트에 대한 특정 WebGL 기능을 활성화합니다.
    // - 여기에선 깊이 비교 및 깊이 버퍼 업데이트 활성화
    gl.enable(gl.DEPTH_TEST);

    //=====================================================================
    // GPU에 넘겨줄 Program 객체를 만들고 shader를 초기화합니다.
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    //--------------------------- Color ----------------------------------
    // Color 버퍼를 만들고 컬러 데이터인 colors를 설정합니다.
    // 1. 버퍼를 생성합니다.
    var cBuffer = gl.createBuffer();
    // 2. 생성된 버퍼를 작업할 버퍼로 지정합니다.
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    // 3. 지정된 버퍼에 데이터를 전달합니다.
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    // vColor 애트리뷰트를 가져옵니다.
    var vColor = gl.getAttribLocation( program, "vColor" );
    // 애트리뷰트가 현재의 ARRAY_BUFFER의 바인드 포인트에서 데이터를 어떻게 가져올지 설정합니다.
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    // 해당 애트리뷰트 위치를 사용할 수 있도록 설정합니다.
    gl.enableVertexAttribArray( vColor );

    //--------------------------- Vertex ----------------------------------
    // Vertex 버퍼를 만들고 정점데이터인 points를 설정합니다.
    var vBuffer = gl.createBuffer();
    // 2. 생성된 버퍼를 작업할 버퍼로 지정합니다.
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    // 3. 지정된 버퍼에 데이터를 전달합니다.
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    // vPosition 애트리뷰트를 가져옵니다.
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    // 애트리뷰트가 현재의 ARRAY_BUFFER의 바인드 포인트에서 데이터를 어떻게 가져올지 설정합니다.
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    // 해당 애트리뷰트 위치를 사용할 수 있도록 설정합니다.
    gl.enableVertexAttribArray( vPosition );

    //=====================================================================
    // 버튼 onClick 콜백을 정의합니다.
    document.getElementById("ZoomOut").onclick = function () { 
        radius *= 2.0;
     };
    document.getElementById("ZoomIn").onclick = function () { 
        radius *= 0.5;
     };
    document.getElementById("PanN").onclick = function () {  
        theta -= dr;
     };
    document.getElementById("PanP").onclick = function () { 
        theta += dr;
     };

     // render 함수를 실행합니다.
    render();
}

//=====================================================================   
// 정육면체 2개를 그립니다.
function colorCube()
{
    cubeSpawnPoint = -5;
    quad(0, 1, 2, 0, 2, 3); //5
    quad(0, 4, 7, 0, 7, 3); // 6
    quad(4, 5, 6, 4, 6, 7); //3
    quad(1, 5, 6, 1, 6, 2); //1
    quad(4, 5, 1, 4, 1, 0); //2
    quad(3, 2, 6, 3, 6, 7); //4

    
    cubeSpawnPoint = 5;
    colorIndex = 0;
    quad(0, 1, 2, 0, 2, 3); //5
    quad(0, 4, 7, 0, 7, 3); //6
    quad(4, 5, 6, 4, 6, 7); //3
    quad(1, 5, 6, 1, 6, 2); //1
    quad(4, 5, 1, 4, 1, 0); //2
    quad(3, 2, 6, 3, 6, 7); //4
}
//=====================================================================   


var colorIndex = 0;
var cubeSpawnPoint = 0;
// 각 면을 그립니다.
function quad(a, b, c, d, e, f) 
{
    var vertices = [
        vec4( cubeSpawnPoint-0.5, -0.5,  0.5, 1.0 ),//0
        vec4( cubeSpawnPoint-0.5,  0.5,  0.5, 1.0 ),//1
        vec4( cubeSpawnPoint+0.5,  0.5,  0.5, 1.0 ),//2
        vec4( cubeSpawnPoint+0.5, -0.5,  0.5, 1.0 ),//3
        vec4( cubeSpawnPoint-0.5, -0.5, -0.5, 1.0 ),//4
        vec4( cubeSpawnPoint-0.5,  0.5, -0.5, 1.0 ),//5
        vec4( cubeSpawnPoint+0.5,  0.5, -0.5, 1.0 ),//6
        vec4( cubeSpawnPoint+0.5, -0.5, -0.5, 1.0 )//7
    ];

    var vertexColors = [
        [ 0.5, 0.0, 1.0, 1.0 ],  // purple
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 0.5, 0.5, 1.0 ]   // 
    ];

    
    var indices = [ a, b, c, d, e, f ];
    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        colors.push( vertexColors[colorIndex] );
    }
    colorIndex++;
}
//=====================================================================   


 
//=====================================================================   
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    // program에 있는 'modelViewMatrix'를 가져옵니다.
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    // program에 있는 'projectionMatrix'를 가져옵니다.
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

    eye = vec3(radius * Math.sin(theta) * Math.cos(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(theta));
    /* lookAt(): change from WORLD space to EYE space
       - eye: 카메라의 위치를 설정 (theta, phi의 초기값은 0이라서 처음엔 0, 0, 10의 위치로 지정)
       - at: 0,0,0 으로 원점을 바라보도록 설정
       - up: 0,1,0 으로 카메라의 위로 설정 
       - at과 up은 반드시 직교해야 함 
    */
    modelViewMatrix = lookAt(eye, at, up);
    /* perspective():  viewing volume을 정의 
       - fovy: top and bottom planes로부터의 angle을 설정
       - aspect: near plane(width/height)의 aspect ratio를 설정
       - near, far: 시야를 따라 clipping plane의 거리를 설정
    */
    projectionMatrix = perspective(fovy, aspect, near, far);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    //render 함수가 매 프레임마다 실행되도록 합니다.
    window.requestAnimationFrame( render );
}
//=====================================================================  