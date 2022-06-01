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
        players[barNumber].width = gameWidth/5,                                         
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
        bars[barNumber].style.left = `${players[barNumber].positionX-player1.width/2}px`
        bars[barNumber].style.top = `${players[barNumber].positionY}px`
    }
}

function movePlayer(player, direction) {
    const gameLimit = gameWidth / 2 + (gameWidth / 2 * direction - player.width / 2) - player.velocity
    const playerCollided = (player.positionX*direction <= gameLimit)
    if (playerCollided) {
        player.positionX += player.velocity*direction
        // player.positionX = gameLimit
    }
}

const keyActions = {
    key_arrowleft(){
        movePlayer(player1, direction = -1)
    },
    key_arrowright(){
        movePlayer(player1, direction = 1)
    },
    key_a(){
        movePlayer(player2, direction = -1)
    },
    key_d(){
        movePlayer(player2, direction = 1)
    }
}
//OBRIGADO FILIPE DESCHAMPS

const handleKeys = {}

document.addEventListener('keydown', (keyDownEvent) => {
    const keyPressed = `key_${keyDownEvent.key.toLowerCase()}`
    const keyPressedActionExists = keyActions[keyPressed]
    if (keyPressedActionExists) {
        handleKeys[keyPressed] = keyPressed
    }
})

document.addEventListener('keyup', (keyUpEvent) => {
    let keyPressed = `key_${keyUpEvent.key}`
    keyPressed = keyPressed.toLowerCase()
    delete handleKeys[keyPressed]
})

setInterval(function gameFrames() {   
    for (const objElements in handleKeys) {
        const keyHandled = handleKeys[objElements]
        keyActions[keyHandled]()
    }
    setBarsStyle()
},10)
setDefaultBars()    