var canvas = document.getElementById("c1");
// 创建渲染上下人
var gl = canvas.getContext("webgl");
// vector shader
const vectShaderText = `
// 一个属性变量，将会从缓冲中获取数据
attribute vec4 a_position;
// 所有着色器都有一个main方法
void main() {

    // gl_Position 是一个顶点着色器主要设置的变量
    gl_Position = a_position;
}`;



// fragment shader
const fragShaderText = `
precision mediump float;
void main() {
// gl_FragColor是一个片段着色器主要设置的变量
gl_FragColor = vec4(0, 0.5, 1, 0.5); // 返回“瑞迪施紫色”
}`;




var vertexShader = createShader(gl, gl.VERTEX_SHADER, vectShaderText);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderText);
var program = createProgram(gl, vertexShader, fragmentShader);

// 找到GLSL属性a_position

var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

// 属性值从缓冲中获取数据，所以我们创建一个缓冲
var positionBuffer = gl.createBuffer();

// 绑定绑定点
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// 通过绑定点想缓冲中存放数据
var positions = [
  0, 0,
   1, 0,
    1, 1,
    0,0,
    0,1,
    1,1
  ];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// ========以上代码属于初始代码，仅在页面加载时运行一次=================
// ========以下代码属于渲染部分=======================================
// 将webgl渲染空间尺寸匹配画布空间
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

//  清除画布，颜色rgb(0,0,0,0)---透明色
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);

// 接下来需要告诉WebGL怎么从之前准备的缓冲中获取数据给着色器中的属性。

// 启用对应属性
gl.enableVertexAttribArray(positionAttributeLocation);

// 将绑定点绑定到缓冲数据（positionBuffer）
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// 从缓冲中读取数据的方式
// 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
var size = 2; // 每次迭代运行提取两个单位数据
var type = gl.FLOAT; // 每个单位的数据类型是32位浮点型
var normalize = false; // 不需要归一化数据
var stride = 0; // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
// 每次迭代运行运动多少内存到下一个数据开始点
var offset = 0; // 从缓冲起始位置开始读取
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 6;
gl.drawArrays(primitiveType, offset, count);
