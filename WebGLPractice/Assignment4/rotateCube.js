//=====================================================================
//변수들 선언
//=====================================================================
var canvas;
var gl;

//삼각형 4개, 사각형 1개(삼각형2개) => 4*3 + 2*4 = 18 개 정점
var NumVertices  = 48;

//정점을 저장하는 배열
var points = [];

//색상을 저장하는 배열
var colors = [];

//x, y, z축
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

//기본축
var axis = 0;

//x, y, z만큼 각도
var theta = [ 0, 0, 0 ];

var thetaLoc;


//=====================================================================
window.onload = function init()// 콜백함수, onload = 모든코드가 로드된 후 시작할 위치를 지정
//모든 action은 init()과 render()같은 함수 안에 잇는데, 
//onload 이벤트가 발생할때, init()함수를 실행하게함.
{
    canvas = document.getElementById( "gl-canvas" );
    // 캔버스를 읽어옴, getElementById 함수로 "gl-canvas"를 불러옴

    gl = WebGLUtils.setupWebGL( canvas );
    // 불러온 canvas를 인자로 넘겨, WebGL코드를 설정해줌
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //함수 실행
    colorCube();
    //=====================================================================
    gl.viewport( 0, 0, canvas.width, canvas.height );//크기
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );//배경색
    //depth buffer의 내용에 따라 fragment의 깊이 값을 테스트합니다.
    //OpenGL은 depth test를 수행하고 이 테스트가 통과되면 이 depth buffer는 새로운 깊이 값으로 수정됩니다. 
    //이 테스트가 실패한다면 해당 fragment는 폐기됩니다.
    gl.enable(gl.DEPTH_TEST);
    //=====================================================================


    //=====================================================================
    //  Load shaders and initialize attribute buffers
    //=====================================================================
    //GPU에 넘겨줄 Program 객체
    //initShaders사용하여 shader 로드, 컴파일, 링크하여 Program객체 생성
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    //-------------------------------------------------------------------
    //color 버퍼를 만들고 컬러를 넣음
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    //-------------------------------------------------------------------

    //-------------------------------------------------------------------
    //data를 넣을 버펄르 만들고 데이터를 줌
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    //------------------------------------------------------------------- 

    //getUniformLocation함수로 theta값 가져옴.
    thetaLoc = gl.getUniformLocation(program, "theta");
     
    //=====================================================================


    //=====================================================================
    //버튼 이벤트 리스너 (축에 버튼에 해당하는 축을 넣음)
    //=====================================================================
    document.getElementById( "xButton" ).onclick = function () {
        axis = xAxis;
    };
    document.getElementById( "yButton" ).onclick = function () {
        axis = yAxis;
    };
    document.getElementById( "zButton" ).onclick = function () {
        axis = zAxis;
    };
    //=====================================================================   

    // buttons for viewing parameters
    // document.getElementById("Button1").onclick = function () { near *= 1.1; far *= 1.1; };
    // document.getElementById("Button2").onclick = function () { near *= 0.9; far *= 0.9; };
    // document.getElementById("Button3").onclick = function () { radius *= 2.0; };
    // document.getElementById("Button4").onclick = function () { radius *= 0.5; };
    // document.getElementById("Button5").onclick = function () { rotateTheta += dr; };
    // document.getElementById("Button6").onclick = function () { rotateTheta -= dr; };
    // document.getElementById("Button7").onclick = function () { phi += dr; };
    // document.getElementById("Button8").onclick = function () { phi -= dr; };


    render();
}

//=====================================================================   
function colorCube()
{
    //피라미드는 삼각형 4개, 정육면체 1개
    // triple( 1, 0, 4 );
    // triple( 0, 3, 4 );
    // triple( 3, 2, 4 );
    // triple( 1, 4, 2 );
    // quad(0, 1, 2, 3); // 5
    // quad(4, 5, 6, 7); // 3
    // quad(3, 2, 6, 7); // 4
    // quad(1, 5, 6, 2); // 1
    // quad(0, 4, 7, 3); // 6
    // quad(0, 1, 5, 4); // 2 
    quad(0, 1, 2, 0, 2, 3); //5
    quad(0, 4, 7, 0, 7, 3); // 6
    quad(4, 5, 6, 4, 6, 7); //3
    quad(1, 5, 6, 1, 6, 2); //1
    quad(4, 5, 1, 4, 1, 0); //2
    quad(3, 2, 6, 3, 6, 7); //4

}
//=====================================================================   



//=====================================================================   
//삼각형을 그려줌, abc인자로
//=====================================================================   
/*
    [위에서 쳐다봤을때]
    삼각형 4개 
  1 ㅡㅡㅡㅡㅡㅡ 2
    |*      * |
    |  *  *   |
    |   *4    |  
    | *     * |
   0ㅡㅡㅡㅡㅡㅡ 3
        
*/
//사각뿔의 꼭지 위 점과, 밑 사각형의 점로 삼각형을 그림
function triple(a, b, c){
    //삼각형 4개 정점
    var vertices = [
        vec4( -0.5, -0.5,  -0.5, 1.0 ),//0
        vec4( -0.5, -0.5,  0.5, 1.0 ),//1
        vec4(  0.5, -0.5,  0.5, 1.0 ),//2
        vec4(  0.5, -0.5,  -0.5, 1.0 ),//3
        vec4(    0,  0.5,    0, 1.0 )//4
    ];
    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white
    ];

    
    //삼각형이므로 인자를 3개 받음
    var indices = [ a, b, c ];

    for ( var i = 0; i < indices.length; ++i ) {
        //vertices[a], vertices[b], vertices[c]를 넣음
        points.push( vertices[indices[i]] );
            //평면의 색을 그라데이션효과 처럼 해줌        
        //colors.push( vertexColors[indices[i]] );
    
        //평면이 모두 같은 색(vertexColors[b]으로 되게 해줌 => 2번째 인자를 안겹치게 했음
        colors.push(vertexColors[b]);
        
    }
}
//=====================================================================   







//=====================================================================   
//4개의 인자로, abc, acd 사각형을 그려줌
//=====================================================================   
/*
[밑에서 쳐다봤을때] 
정육면체1개(삼각형 2개) 
        
   4ㅡㅡㅡㅡㅡㅡ7
    |         |
    |         |
    |         |  
    |         |
   0ㅡㅡㅡㅡㅡㅡ3
 =>예제 cube코드를 가져와 사용.       
*/
var colorIndex = 0;
function quad(a, b, c, d, e, f) 
{
    //=> ppt그림 참고함
    var vertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ),//0
        vec4( -0.5,  0.5,  0.5, 1.0 ),//1
        vec4(  0.5,  0.5,  0.5, 1.0 ),//2
        vec4(  0.5, -0.5,  0.5, 1.0 ),//3
        vec4( -0.5, -0.5, -0.5, 1.0 ),//4
        vec4( -0.5,  0.5, -0.5, 1.0 ),//5
        vec4(  0.5,  0.5, -0.5, 1.0 ),//6
        vec4(  0.5, -0.5, -0.5, 1.0 )//7
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

    // // var indices = [ a, b, c, a, c, d ];
    // for ( var i = 0; i < indices.length; ++i ) {
    //     //vertices[a] ~ [b] ~ [c] ~ [a] ~ [c] ~[d]를 넣음
    //     points.push( vertices[indices[i]] );
    //     console.log(`vertices[indices[${i}] => ${vertices[indices[i]]}, indices[i] = ${indices[i]}`);
    //     //colors.push( vertexColors[indices[i]] );
    
    //     // 위 삼각형들의 색상과 겹치지 않게 하기위해 6번째 색 사용 
    //     colors.push(vertexColors[colorIndex]);
        
    // }
    // colorIndex++;
}
//=====================================================================   







 
//=====================================================================   
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    //aixs축 기준으로 각도 2도 만큼
    // theta[0] = -95.0;
    // theta[1] = -45.0;
    theta[axis] += 2.0;
    //uniform 변수로 theta 전달, vertex shader가 그릴수 있게 해줌.
    gl.uniform3fv(thetaLoc, theta);
    
    /* 밑의 코드와 동일 코드
    for(i = 0; i< points.length; i = i+3){ 
        gl.drawArrays( gl.TRIANGLES, i, 3);
    }*/
    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    // // program에 있는 'modelViewMatrix'를 가져옵니다.
    // modelViewMatrixLoc = gl.getUniformLocation(gl.program, "modelViewMatrix");
    // // program에 있는 'projectionMatrix'를 가져옵니다.
    // projectionMatrixLoc = gl.getUniformLocation(gl.program, "projectionMatrix");

    // eye = vec3(radius * Math.sin(rotateTheta) * Math.cos(phi), radius * Math.sin(rotateTheta) * Math.sin(phi), radius * Math.cos(rotateTheta));
    // modelViewMatrix = lookAt(eye, at, up);
    // projectionMatrix = perspective(fovy, aspect, near, far);

    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    // gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    window.requestAnimationFrame( render );
    //render 함수를 애니메이션으로 실행
}
//=====================================================================  