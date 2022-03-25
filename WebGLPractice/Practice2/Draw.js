function draw() {
    var canvas = document.getElementById('example');
    if(!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
    ctx.fillRect(120, 10, 150, 150);
}

function clickProc00(e) {
    // html에서 example 이라는 아이디를 가진 element를 가져옴
    var canvas = document.getElementById('example');
    if(!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }
    // html에서 Log 라는 아이디를 가진 element를 가져옴 
    var logElem = document.getElementById('Log');
    // innerHTML: HTML요소의 표시 내용을 동적으로 변경 
    logElem.innerHTML = e.clientX + ',' + e.clientY; // 마우스 클릭 위치 출력

    var ctx = canvas.getContext('2d'); // 2d로 그림
    ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
    // e.clientX 같은 경우는 현재 보이는 브라우저 화면 기준이라 우리가 클릭한 정확한 위치가 아님
    // 근데 우리는 canvas 내에 그려야 하니까 canvas 기준 위치여야 함
    // 따라서 canvas.offsetLeft 같은 것을 통해 canvas가 body로부터 얼마나 떨어져 있는지에 대한 값 활용
    ctx.fillRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 50, 50);
}