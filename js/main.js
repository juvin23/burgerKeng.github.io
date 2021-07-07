const MAX_IDLE_TIME = 10 ; //second
var idleTime = 0;
setInterval(function(){
    idleTime++;
    
    window.addEventListener('load', resetTimer, true);
    let events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'onclick', 'onkeydown','onload'];
    events.forEach(function(name) {
        document.addEventListener(name, resetTimer, true);
    });

    function resetTimer() {
        idleTime = 0;
    }
},1000);

window.onload = () =>{
    let canvas = document.getElementById("canvas");
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");
    
    let img = new Image();
    img.src = "imgs/logo/logo-b.png";

    img.onload = () => {
        // ctx.drawImage(img, 17, -4 , 55, 55);
    }
    let x = 0;
    let y = 0;
    let boxW = 55;
    let boxH = 55;
    let canvasH = canvas.clientHeight;
    let canvasW = canvas.clientWidth;
    let vx = 1;
    let vy = 1;

        function render(){
            ctx.clearRect(0,0, canvasW, canvasH);
            ctx.strokeRect(0,0, canvasW, canvasH);
            ctx.drawImage(img, x, y, boxW, boxH);
            x += vx;
            y += vy;
        
            if(x+boxW >= canvasW || x <= 0){
                vx *= -1;
            }
            if(y+boxH  >= canvasH || y <= 0){
                vy *= -1;
            }
        }

    setInterval(function(){
        if (idleTime > MAX_IDLE_TIME){
            canvas.style.zIndex = "50";
            requestAnimationFrame(render);
        }
        else{
            ctx.clearRect(0,0, canvasW, canvasH);
            canvas.style.zIndex = "-1";
        }
    },1000/240);
}