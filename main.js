const gameBall = document.getElementById('ball')
const gameScreen = document.getElementById('gameScreen')
const bars = document.getElementsByClassName('bar')

const gameWidth = gameScreen.clientWidth
const gameHeight = gameScreen.clientHeight

const player1 = {width: 0, height: 0, positionX: 0, positionY: 0, velocity: 0, strength: 1, points: 0, direction: 1}
const player2 = {width: 0, height: 0, positionX: 0, positionY: 0, velocity: 0, strength: 1, points: 0, direction: -1}
const players = [player1, player2]

const ball = {
    width: gameWidth/100,
    height: gameWidth/100,
    positionX: gameWidth/2, 
    positionY: gameHeight/2,
    velocityX: 0,
    velocityY: gameWidth/100 - (gameWidth/100)/10,
    startVelocityY: gameWidth/100 - (gameWidth/100)/10,
}

gameBall.style.width = (ball.width) + 'px'
gameBall.style.height = (ball.height) + 'px'
gameBall.style.left = (ball.positionX - ball.width/2) + 'px'
gameBall.style.top = (ball.positionY - ball.width/2) + 'px'

function startGame() {
    setDefaultBars()
    setBarsStyle()
    setBallPosition()
}
startGame()

function setDefaultBars(){
    for (barNumber = 0; barNumber < 2; barNumber++){
        players[barNumber].width = gameWidth/5,                                         
        players[barNumber].height = gameWidth/100,
        players[barNumber].positionX = gameWidth/2-(players[barNumber].width/2),
        players[barNumber].velocity = gameWidth/100        
    }
    players[0].positionY = - 2 * players[0].height
    players[1].positionY = gameScreen.clientHeight-players[1].height*3 // adjust player location
}

function setBarsStyle() {
    for (barNumber = 0; barNumber < 2; barNumber++){
        bars[barNumber].style.width = `${players[barNumber].width}px`
        bars[barNumber].style.height =  `${players[barNumber].height}px`
        bars[barNumber].style.left = `${players[barNumber].positionX}px`
        bars[barNumber].style.top = `${players[barNumber].positionY}px`
    }
    bars[1].style.transform = `translateY(-${players[0].height}px)`
    bars[0].style.transform = `translateY(+${players[0].height*2}px)`
}
function setDefaultBall() {
    ball.width = gameWidth/100
    ball.height = gameWidth/100
    ball.positionX = gameWidth/2,
    ball.positionY = gameHeight/2
    ball.velocityX = gameWidth/100
    ball.velocityY = gameWidth/100 - (gameWidth/100)/2
    ball.startVelocityY = gameWidth/100 - (gameWidth/100)/2
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
    gameBall.style.left = Math.floor(gameBallPosX) + 'px'
    gameBall.style.top = Math.floor(gameBallPosY) + 'px'
}

function checkBallCollisions() {
    const ballInsideGame = ball.positionY > 0 && ball.positionY < gameHeight-ball.height
    const directionY = Math.sign(ball.velocityY)
    const directionX = Math.sign(ball.velocityX)

    function ballWallCollision() {
        const ballHitbox = ball.positionX*directionX + ball.width/2 + ball.width/2*directionX
        const gameLimit = gameWidth / 2 + (gameWidth / 2 * directionX)
        const ballHitedWall = (ballHitbox >= gameLimit)
        if (ballHitedWall && ballInsideGame) {
            ball.velocityX *= -1
        }
    }
    function ballPlayersCollision() {
        const player = playerByBallDirectionY(directionY)
        const ballNextLocation = ball.positionY*directionY + ball.velocityY
        const ballHitbox = ballNextLocation + ball.height/2 - ball.height/2*directionY
        const ballHitedBarWidth = (ball.positionX >= player.positionX) && (ball.positionX <= player.positionX + player.width)
        const ballHitedBarHeight = (ballHitbox >= player.positionY) || ballHitbox >= (player.positionY + player.height)
        const ballHitedBar = (ballHitedBarWidth && ballHitedBarHeight)
        if (ballHitedBar && ballInsideGame) {
            ball.velocityY = randomizeYvelocity(ball.velocityY) * player.strength
            const ballAngle = ball.positionX/(gameWidth/100) - (player.positionX + player.width/2)/(gameWidth/100)
            ball.velocityX = ballAngle
        }
    }
    function randomizeYvelocity(velo){
        const invertedDirection = -(Math.sign(velo))
        velo = Math.random()*ball.startVelocityY/4+ball.startVelocityY
        velo *= invertedDirection
        return velo
    }
    function playerByBallDirectionY(direction) {
        const x = direction
        return players[Math.round((x/2 + 1/2))] //return players[0] or players[1]
    }
    function ballPointsCollision() {
        if (!ballInsideGame) {
            console.log(ball.positionY);
            setDefaultBall()
            ball.velocityX = 0
            ball.velocityY = 0
        }
    }
    ballPointsCollision()
    ballWallCollision()
    ballPlayersCollision()
}

function loadFrames(){
    Object.keys(handleKeys).forEach(element => {
        const keyHandled = element
        keyActions[keyHandled]()        
    }) //OBRIGADO AUGUSTO

    setBarsStyle()
    loadgameBallPosition()
    checkBallCollisions()
}

setInterval(loadFrames,0.017*1000)