var color = 'rgba(255, 0, 0, 1.0)';

function draw() {
    var canvas = document.getElementById('example');
    if(!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }
}

// 팔레트에서 선택한 색깔로 그려질 사각형의 색상을 결정
function SetColor(obj) {
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

function clickProc00(e) {

    var canvas = document.getElementById('example');
    if(!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    var logElem = document.getElementById('Log');
    logElem.innerHTML = e.clientX + ',' + e.clientY; 

    var ctx = canvas.getContext('2d'); 
    ctx.fillStyle = color;
    ctx.fillRect(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, 20, 20);
}