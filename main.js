const ball = document.getElementById('ball')
const gameScreen = document.getElementById('gameScreen')
const topBar = document.getElementById('topBar')
const bottomBar = document.getElementById('bottomBar')
const bars = document.getElementsByClassName('bar')

const player1 = {width: 0, height: 0, positionX: 0, positionY: 0, velocity: 0, points: 0}
const player2 = {width: 0, height: 0, positionX: 0, positionY: 0, velocity: 0, points: 0}
const players = [player1, player2]

const gameWidth = gameScreen.clientWidth

function setDefaultBars(){
    for (barNumber = 0; barNumber < 2; barNumber++){
        players[barNumber].width = gameWidth/10,                                         
        players[barNumber].height = gameScreen.clientHeight/100,
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
}
//OBRIGADO SOR

const keyActions = {
    ArrowLeft(){
        movePlayer(player1, direction = -1)
    },
    ArrowRight(){
        movePlayer(player1, direction = 1)
    },
    KeyA(){
        movePlayer(player2, direction = -1)
    },
    KeyD(){
        movePlayer(player2, direction = 1)
    }
}
//OBRIGADO FILIPE DESCHAMPS

const handleKeys = {}

document.addEventListener('keydown', (keyDownEvent) => {
    const keyPressed = keyDownEvent.code
    const keyPressedActionExists = keyActions[keyPressed]
    if (keyPressedActionExists) {
        console.log(keyPressed);
        handleKeys[keyPressed] = keyPressed
    }
})

document.addEventListener('keyup', (keyUpEvent) => {
    const keyPressed = keyUpEvent.code
    delete handleKeys[keyPressed]
})

setInterval(function gameFrames() {   
    for (const objElements in handleKeys) {
        const keyHandled = handleKeys[objElements]
        keyActions[keyHandled]()
    }
    setBarsStyle()
},30)
setDefaultBars()    