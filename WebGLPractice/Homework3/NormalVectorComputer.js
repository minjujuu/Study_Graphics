/* 201914302 박민주
   컴퓨터그래픽스 Homework3 */

// 점 v1, v2, v3 로 구성된 삼각형에 대하여 Normal vector 를 구하시오.
// 1. 점 v1, v2, v3 는 CCW order 로 주어진 삼각형을 구성한다.
// 2. javaScript 에서 function computerNormal(v1, v2, v3) 를 구현하시오.

Vector3 = function(x, y, z) {this.x = x; this.y = y; this.z = z;};
Coordinate = function(x, y, z) {this.x = x; this.y = y; this.z = z;};

start();

function start() {
    // ex 1> output normal vector: (2, 2, 1)
    var vertexP1 = new Coordinate(0, 2, 2);
    var vertexP2 = new Coordinate(0, 1, 4);
    var vertexP3 = new Coordinate(1, 1, 2);
    computerNormal(vertexP1, vertexP2, vertexP3);

    // ex 2> output normal vector: (16, -20, 8)
    vertexP1 = new Coordinate(0, 0, 0);
    vertexP2 = new Coordinate(2, 4, 6);
    vertexP3 = new Coordinate(-1, 2, 7);
    computerNormal(vertexP1, vertexP2, vertexP3);

    // ex 3> output normal vector: (1, 1, 1)
    vertexP1 = new Coordinate(1, 0, 0);
    vertexP2 = new Coordinate(0, 1, 0);
    vertexP3 = new Coordinate(0, 0, 1);
    computerNormal(vertexP1, vertexP2, vertexP3);
}   


function computerNormal(v1, v2, v3) {

    // 삼각형 평면의 두 벡터
    var vec1 = substraction(v2, v1);
    var vec2 = substraction(v3, v1);

    // normal Vector = vec1 x vec2 (외적)
    var normalX = (vec1.y * vec2.z) - (vec1.z * vec2.y);
    var normalY = (vec1.z * vec2.x) - (vec1.x * vec2.z);
    var normalZ = (vec1.x * vec2.y) - (vec1.y * vec2.x);

    var normalVector3 = {normalX, normalY, normalZ};

    console.log(`[computerNormal] normal Vector => ${normalX}, ${normalY}, ${normalZ}`);

    return normalVector3;
}

function substraction(v1, v2) {
    let x = v1.x - v2.x;
    let y = v1.y - v2.y;
    let z = v1.z - v2.z;

    return new Vector3(x, y, z);
}