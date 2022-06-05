const gameBall = document.getElementById('ball')
const gameScreen = document.getElementById('gameScreen')
const bars = document.getElementsByClassName('bar')

const gameWidth = gameScreen.clientWidth
const gameHeight = gameScreen.clientHeight

const player1 = {width: gameWidth/5, height: 0, positionX: 0, positionY: 0, velocity: 0, points: 0}
const player2 = {width: 0, height: 0, positionX: 0, positionY: 0, velocity: 0, points: 0}
const players = [player1, player2]

const ball = {
    width: gameWidth/100,
    height: gameWidth/100,
    positionX: gameWidth/2, 
    positionY: gameHeight/2,
    velocityX: 10,
    velocityY: 10
}

gameBall.style.width = (ball.width) + 'px'
gameBall.style.height = (ball.height) + 'px'
gameBall.style.left = (ball.positionX - ball.width/2) + 'px'
gameBall.style.top = (ball.positionY-ball.width/2) + 'px'

function startGame() {
    setDefaultBars()
    setBarsStyle()
    setBallPosition()
}
startGame()

function setDefaultBars(){
    for (barNumber = 0; barNumber < 2; barNumber++){
        players[barNumber].width = gameWidth/5,                                         
        players[barNumber].height = gameHeight/100,
        players[barNumber].positionX = gameWidth/2-(players[barNumber].width/2),
        players[barNumber].velocity = gameWidth/100
    }
    players[1].positionY = gameScreen.clientHeight-players[0].height*3
    players[0].positionY = players[0].height
}

function setBarsStyle() {
    for (barNumber = 0; barNumber < 2; barNumber++){
        bars[barNumber].style.width = `${players[barNumber].width}px`
        bars[barNumber].style.height =  `${players[barNumber].height}px`
        bars[barNumber].style.left = `${players[barNumber].positionX}px`
        bars[barNumber].style.top = `${players[barNumber].positionY}px`
    }
}
 
function setBallPosition() {
    gameBall.style.left = `${ball.positionX-ball.width/2}px`
    gameBall.style.top = `${ball.positionY-ball.height/2}px`
}

function movePlayer(player, direction) {
    const playerNextLocation = player.positionX*direction + player.velocity
    const gameLimit = gameWidth / 2 + (gameWidth / 2 * direction)
    const gameLimitAdjust = gameLimit - (player.width/2 + player.width/2*direction)
    const playerCollided = (playerNextLocation >= gameLimitAdjust)
    if (playerCollided) {
        player.positionX = gameLimitAdjust
    }
    else {
        player.positionX = playerNextLocation*direction
    }
}//OBRIGADO SOR ROGER

const keyActions = {
    ArrowLeft(){
        const left = -1
        movePlayer(player1, left)
    },
    ArrowRight(){
        const right = 1
        movePlayer(player1, right)
    },
    KeyA(){
        const left = -1
        movePlayer(player2, left)
    },
    KeyD(){
        const right = 1
        movePlayer(player2, right)
    }
}//OBRIGADO FILIPE DESCHAMPS

const handleKeys = {}

document.addEventListener('keydown', (keyDownEvent) => {
    const keyPressed = keyDownEvent.code
    const keyPressedActionExists = keyActions[keyPressed]
    if (keyPressedActionExists) {
        handleKeys[keyPressed] = true
    }
})

document.addEventListener('keyup', (keyUpEvent) => {
    const keyPressed = keyUpEvent.code
    delete handleKeys[keyPressed]
})

function loadgameBallPosition() {
    const gameBallPosX = ball.positionX += ball.velocityX
    const gameBallPosY = ball.positionY += ball.velocityY
    gameBall.style.left = gameBallPosX + 'px'
    gameBall.style.top = gameBallPosY + 'px'
}

function checkgameBallColisions() {
    function playerByBallDirection(direction) {
        const x = direction
        return players[(x/2 + 1/2)] //return players[0] or players[1]
    }
    function ballWallColision() {
        const directionX = Math.sign(ball.velocityX)
        const ballHitbox = ball.positionX*directionX + ball.width/2 + ball.width/2*directionX
        const gameLimit = gameWidth / 2 + (gameWidth / 2 * directionX)
        const ballHitedWall = (ballHitbox >= gameLimit)
        if (ballHitedWall) {
            // console.log(ballHitbox);
            ball.velocityX *= -1
        }
    }
    function ballPlayersColision() {
        const directionY = Math.sign(ball.velocityY)
        const ballNextLocation = ball.positionY*directionY + ball.velocityY
        const ballHitbox = ballNextLocation + ball.width/2 - ball.width/2*directionY
        const player = playerByBallDirection(directionY)        
        const playerHitboxWidth = (ball.positionX >= player.positionX) && (ball.positionX <= player.positionX + player.width)
        const hitboxHeight = (ballHitbox >= player.positionY) || ballHitbox >= (player.positionY - player.height*2)
        const playerHitboxHeight = hitboxHeight && !(ballHitbox > player.positionY)
        const ballHitedBarY = (playerHitboxWidth && playerHitboxHeight)
        if (ballHitedBarY) {            
            ball.velocityY = (Math.random()+10)*-(Math.sign(ball.velocityY))
        }
    }
    ballWallColision()
    ballPlayersColision()
}

function loadFrames(){
console.log(handleKeys)
    Object.keys(handleKeys).forEach(element => {
        console.log(element);
        const keyHandled = element
        keyActions[keyHandled]()        
    }) //OBRIGADO AUGUSTO

    setBarsStyle()
    loadgameBallPosition()
    checkgameBallColisions()
}

setInterval(loadFrames,0.017*1000)