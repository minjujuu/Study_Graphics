var color = 'rgba(255, 0, 0, 1.0)';

// draw(): 사각형을 그릴 캔버스가 로드될 때 호출되는 함수입니다.
function draw() {
    var canvas_1 = document.getElementById('rectSketchBook');
    var canvas_2 = document.getElementById('randomRectSketchBook');
    // 캔버스를 가져오지 못할 경우 로그를 출력합니다.
    if(!canvas_1 || !canvas_2) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }
}

// setColor(): 팔레트에서 선택한 색깔로 그려질 사각형의 색상을 결정합니다.
function setColor(obj) {
    switch(obj.id) {
        case "green":
            color = 'rgba(0, 128, 0, 1.0)';
            break;
        case "blue":
            color = 'rgba(54, 80, 223, 1.0)';
            break;
        case "red":
            color = 'rgba(255, 0, 0, 1.0)';
            break;
        case "yellow":
            color = 'rgba(233, 230, 67, 1.0)';
            break;
        case "violet":
            color = 'rgba(238, 130, 238, 1.0)';
            break;
    }
}

// drawRectAtClick(): 팔레트에서 선택한 색깔로 그려질 사각형의 색상을 결정합니다.
function drawRectAtClick(e) {
    // html에서 rectSketchBook의 Id를 가진 element를 가져옵니다.
    var canvas = document.getElementById('rectSketchBook');
    if(!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }
    // html에서 Log의 Id를 가진 element를 가져옵니다.
    var logElem = document.getElementById('Log');
    // 클릭한 위치를 출력합니다.  
    logElem.innerHTML = e.clientX + ',' + e.clientY; 

    // 2차원 렌더링 컨텍스트를 나타내는 CanvasRenderingContext2D (en-US) 객체를 생성합니다.
    var ctx = canvas.getContext('2d'); 
    // 도형을 채우는 색을 설정합니다.
    ctx.fillStyle = color;

    // 시작점이 (x, y)이고 크기가 20x20인 사각형을 그립니다.
    ctx.fillRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 20, 20);
}

// drawRectAtClick(): 팔레트에서 선택한 색깔로 그려질 사각형의 색상을 결정합니다.
function drawRandomRectAtClick(e) {
    // html에서 rectSketchBook의 Id를 가진 element를 가져옵니다.
    var canvas = document.getElementById('randomRectSketchBook');
    if(!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }
    // html에서 Log의 Id를 가진 element를 가져옵니다.
    var logElem = document.getElementById('Log');
    // 클릭한 위치를 출력합니다.  
    logElem.innerHTML = e.clientX + ',' + e.clientY; 

    // 2차원 렌더링 컨텍스트를 나타내는 CanvasRenderingContext2D (en-US) 객체를 생성합니다.
    var ctx = canvas.getContext('2d'); 

    // 랜덤의 색상을 결정합니다.
    var randomColorR = Math.random() * 255;
    var randomColorG = Math.random() * 255;
    var randomColorB = Math.random() * 255;

    // 도형을 채우는 색을 설정합니다.
    ctx.fillStyle = `rgba(${randomColorR}, ${randomColorG}, ${randomColorB}, 1.0)`;
    // 랜덤의 크기를 결정합니다.
    var randomWidth = Math.random() * 50;
    var randomHeight = Math.random() * 50;
    // 시작점이 (x, y)이고 크기가 랜덤인 사각형을 그립니다.
    ctx.fillRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, randomWidth, randomHeight);
}