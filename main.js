const ball = document.getElementById('ball')
const gameScreen = document.getElementById('gameScreen')
const topBar = document.getElementById('topBar')
const bottomBar = document.getElementById('bottomBar')
const bars = document.getElementsByClassName('bar')

const gameWidth = gameScreen.clientWidth
const gameHeight = gameScreen.clientHeight

const player1 = {width: 0, height: 0, positionX: 0, positionY: 0, velocity: 0, points: 0}
const player2 = {width: 0, height: 0, positionX: 0, positionY: 0, velocity: 0, points: 0}
const players = [player1, player2]

const ballAtributes = {
    width: gameWidth/100,
    height:gameWidth/100,
    positionX: gameWidth/2, 
    positionY: gameHeight/2,
    velocityX: 10,
    velocityY: 10
}

ball.style.width = (ballAtributes.width) + 'px'
ball.style.height = (ballAtributes.height) + 'px'
ball.style.left = (ballAtributes.positionX - ballAtributes.width/2) + 'px'
ball.style.top = (ballAtributes.positionY-ballAtributes.width/2) + 'px'

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
        players[barNumber].positionX = gameWidth/2,
        players[barNumber].velocity = gameWidth/100
    }
    players[0].positionY = gameScreen.clientHeight-players[1].height*2
    players[1].positionY = 0
}

function setBarsStyle() {
    for (barNumber = 0; barNumber < 2; barNumber++){
        bars[barNumber].style.width = `${players[barNumber].width}px`
        bars[barNumber].style.height =  `${players[barNumber].height}px`
        // bars[barNumber].style.left = `${players[barNumber].positionX-player1.width/2}px`
        bars[barNumber].style.left = `${players[barNumber].positionX-player1.width/2}px`
        bars[barNumber].style.top = `${players[barNumber].positionY}px`
    }
}
 
function setBallPosition() {
    ball.style.left = `${ballAtributes.positionX-ballAtributes.width/2}px`
    ball.style.top = `${ballAtributes.positionY-ballAtributes.height/2}px`
}

function movePlayer(player, direction) {
    const playerNextLocation = player.positionX*direction + player.velocity
    const gameLimit = gameWidth / 2 + (gameWidth / 2 * direction)
    const gameLimitAdjust = gameLimit - player.width / 2
    const playerCollided = (playerNextLocation >= gameLimitAdjust)
    if (playerCollided) {
        player.positionX = gameLimit-player.width/2*direction
    }
    else {
        player.positionX = playerNextLocation*direction
    }
}//OBRIGADO SOR ROGER

const keyActions = {
    ArrowLeft(){
        let left = -1
        movePlayer(player1, left)
    },
    ArrowRight(){
        let right = 1
        movePlayer(player1, right)
    },
    KeyA(){
        let left = -1
        movePlayer(player2, left)
    },
    KeyD(){
        let right = 1
        movePlayer(player2, right)
    }
}//OBRIGADO FILIPE DESCHAMPS

const handleKeys = {}

document.addEventListener('keydown', (keyDownEvent) => {
    const keyPressed = keyDownEvent.code
    const keyPressedActionExists = keyActions[keyPressed]
    if (keyPressedActionExists) {
        handleKeys[keyPressed] = keyPressed
    }
})

document.addEventListener('keyup', (keyUpEvent) => {
    const keyPressed = keyUpEvent.code
    delete handleKeys[keyPressed]
})

function loadBallPosition() {
    const ballPosX = ballAtributes.positionX += ballAtributes.velocityX
    const ballPosY = ballAtributes.positionY += ballAtributes.velocityY
    ball.style.left = ballPosX + 'px'
    ball.style.top = ballPosY + 'px'
}
function checkBallColisions() {
    function checkWallColision() {
        const directionX = Math.sign(ballAtributes.velocityX)
        const ballHitbox = ballAtributes.positionX*directionX + ballAtributes.width/2 + ballAtributes.width/2*directionX
        const gameLimit = gameWidth / 2 + (gameWidth / 2 * directionX)
        const ballHitedWall = (ballHitbox >= gameLimit)
        console.log();
        if (ballHitedWall) {
            ballAtributes.velocityX *= -1
        }
    }
    function checklolColision() {
        const directionY = Math.sign(ballAtributes.velocityY)
        const ballHitbox = ballAtributes.positionY*directionY + ballAtributes.height/2 + ballAtributes.height/2*directionY
        const gameLimit = gameHeight / 2 + (gameHeight / 2 * directionY)
        const ballHitedWall = (ballHitbox >= gameLimit)
        if (ballHitedWall) {
            ballAtributes.velocityY *= -1
        }
    }
    checkWallColision()
    checklolColision()
}

function loadFrames(){
    for (const elements in handleKeys) {
        const keyHandled = handleKeys[elements]
        keyActions[keyHandled]()
    }
    setBarsStyle()
    loadBallPosition()
    checkBallColisions()
}

setInterval(loadFrames,0.017*1000)