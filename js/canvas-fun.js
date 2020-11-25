
var canvas = document.getElementById("screen");
var ctx = canvas.getContext("2d");

//settings
var backgroundColor = "#000000";

//space for global variables. You may need some :)
var width = document.getElementById("width").value;
var recursion = document.getElementById("recursion").value;

//implement your drawing here.
function draw(){
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("JavaScript Canvas Sierpiński Triangle", 0, 15); 
    ctx.font = "10px Arial";
    ctx.fillText("Depth: " + recursion, 0, 40); 
    ctx.fillText("Width: " + width, 0, 50); 
    
    ctx.translate((canvas.width / 2) - width / 2, canvas.height / 2);
    var h = Math.tan(60 * (Math.PI / 180)) * width/2;
    var x = Math.sqrt(Math.pow(width,2) - Math.pow(h,2));

    ctx.beginPath();
    ctx.moveTo(x,-h);
    ctx.lineTo(-x,h);
    ctx.lineTo((width*2)-x,h);
    ctx.closePath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();

    drawTriangle(recursion,width);
}

function drawTriangle(j,width){

    if(j <= 0){
        return;
    }

    var h = Math.sqrt(3) * width / 2;
    var x = (h/2) / Math.tan(60 * (Math.PI / 180));

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(width,0);
    ctx.lineTo(width/2,h);
    ctx.closePath();

    var colored = document.getElementById("colors").value;
    var filled = document.getElementById("fill").value;

    if(colored == 1){
        var gradient = ctx.createLinearGradient(0, 0, 800, 800);
        gradient.addColorStop("0", rainbow(recursion,j));
        gradient.addColorStop("1", rainbow(recursion,j));
        ctx.strokeStyle = gradient;
        ctx.fillStyle = gradient;
    }else{
        ctx.strokeStyle = "#FFFFFF";
        ctx.fillStyle = "#FFFFFF";
    }

    if(filled == 1){
        ctx.fill();
    }

    ctx.stroke();

    //translate 1
    ctx.save();
    ctx.translate((-width/2) + x,h/2);
    drawTriangle(j - 1, width / 2);
    ctx.restore();

    //translate 2
    ctx.save();
    ctx.translate((width/2) + x,h/2);
    drawTriangle(j - 1, width / 2);
    ctx.restore();

    //translate 2
    ctx.save();
    ctx.translate((width/2)-x,-h/2);
    drawTriangle(j - 1, width / 2);
    ctx.restore();
}

//calculate, sort, or do whatever you want here
function update(){
    width = document.getElementById("width").value;
    recursion = document.getElementById("recursion").value;
}

//clear the canvas
function clear(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//if the user changes the size of the window we have do recalculate
function resizeCanvas(){
    canvas.width = window.innerWidth - 20;
    //let us keep this sixteen by nine
    canvas.height = ((window.innerWidth) / 16) * 9;
}

//let us call the function once at the start to get the user's canvas size
resizeCanvas();

window.addEventListener('resize', resizeCanvas);

//this block will call the function clear, update, and draw all the time
function loop() {
    clear();
    update();
    draw();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
