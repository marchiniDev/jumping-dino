const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;
let score = 0;

cron = setInterval(() => {
    score++;
    console.log(score);
}, 1597);

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }       
       console.log("space key pressed");
    }    
}

function jump() {
    console.log("jump called");
    isJumping = true;

    let upInterval = setInterval(() => {

        //Parando de subir
        if (position >= 150) {
            clearInterval(upInterval);
            console.log("Stop going Up");

            //Descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    console.log("Stop going Down");
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    console.log("Its going down...");
                    position -= 20;
                    dino.style.bottom = position + "px";
                }
            }, 20);
        } else {
            //Subindo
            console.log("Up we go...");
            position += 20;
            dino.style.bottom = position + "px";
        }
    }, 20);
}

function creatCactus() {

    const cactus = document.createElement("div");
    let cactusPosition = 1000;
    let randomTime = Math.random()*6765;
    
    cactus.classList.add("cactus");
    cactus.style.left = 1000 + "px";
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0  && cactusPosition < 60 && position < 60) {
            
            //Game Over
            clearInterval(leftInterval);
            clearInterval(cron);
            document.body.innerHTML = 
            '<h1 class = "game-over">Game Over</h1><h2 class = "score" id = "score">Score: 0000 </h2>';
            document.getElementById('score').innerHTML = "Score is: " + score;
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + "px";
        }

    }, 20);

    setTimeout(creatCactus, randomTime);
}

creatCactus();
document.addEventListener("keyup", handleKeyUp);