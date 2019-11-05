var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var cocks = [];
var bullet = [];
var timer = 0;
var jet = {
    x: 300,
    y: 500
};
var score = 0;

var cockimg = new Image();
cockimg.src = 'cock_48.png';

var bulletimg = new Image();
bulletimg.src = 'face_32.png';

var jetimg = new Image();
jetimg.src = 'fly_64.png';

var fonimg = new Image();
fonimg.src = 'fon.jpg';

canvas.addEventListener('mousemove', function (event) {
    jet.x = event.offsetX;
    jet.y = event.offsetY;
});

// canvas.addEventListener("keydown", direction);
// function direction(e) {
//     if (e.keyCode == 65)
//     {jet.x = event.offsetX; jet.y = 0;}
//     else if (e.keyCode == 68)
//     {jet.x = 0; jet.y = event.offsetX;}
// }


cocks.push({
    x: 0,
    y: 0,
    dx: 3,
    dy: 6
});


fonimg.onload = function () {
    game();
}

function game() {

    update();
    render();
    requestAnimationFrame(game);
}

function update() {
    timer++;
    score;
    if (timer % 10 == 0) {
        cocks.push({
            x: Math.random() * 600,
            y: -50,
            dx: Math.random() * 3 - 2,
            dy: Math.random() * 2 + 2,
            del: 0
        });
    }


    if (timer % 10 == 0) {
        // bullet.push({
        //     x: jet.x + 10,
        //     y: jet.y,
        //     dx: 0,
        //     dy: -5.2
        // });
        bullet.push({
            x: jet.x + 10,
            y: jet.y,
            dx: 1,
            dy: -5.4
        });
        bullet.push({
            x: jet.x + 10,
            y: jet.y,
            dx: -1,
            dy: -5.4
        });
    }

    for (i in bullet) {
        bullet[i].x = bullet[i].x + bullet[i].dx;
        bullet[i].y = bullet[i].y + bullet[i].dy;

        if (bullet[i].y < -30) bullet.splice(i, 1);
    }

    for (i in cocks) {
        cocks[i].x = cocks[i].x + cocks[i].dx;
        cocks[i].y = cocks[i].y + cocks[i].dy;

        if (cocks[i].x >= 552 || cocks[i].x < 0) cocks[i].dx = -cocks[i].dx;
        // if (cocks[i].y >= 600) cocks.splice(i, 1);
        if (cocks[i].y >= 600) 
        {
            alert('Вы зверски уничтожили '+score+' петушка(ов). Обновите страницу чтобы начать новую игру.');
        }
    
        for (j in bullet) {
  
            if (Math.abs(cocks[i].x + 25 - bullet[j].x - 15) < 50 && Math.abs(cocks[i].y - bullet[j].y) < 25) {

                cocks[i].del = 1;
                bullet.splice(j, 1);
                score++;
                break;
            }
        }

        if (cocks[i].del == 1) cocks.splice(i, 1);

    }
}

function render() {
    context.drawImage(fonimg, 0, 0, 600, 600);
    context.drawImage(jetimg, jet.x, jet.y);
    for (i in bullet)
        context.drawImage(bulletimg, bullet[i].x, bullet[i].y, 28, 28);
    for (i in cocks)
        context.drawImage(cockimg, cocks[i].x, cocks[i].y, 48, 48);
        context.fillStyle = "#00ff62";
	    context.font = "bold 30pt Arial";
	    context.fillText("Убито: " +score+'',50,50);
}
