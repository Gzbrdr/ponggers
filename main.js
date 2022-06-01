const ball = document.getElementById('ball')
const gameScreen = document.getElementById('gameScreen')
const topBar = document.getElementById('topBar')
const bottomBar = document.getElementById('bottomBar')
const bars = document.getElementsByClassName('bar')

const player1 = {width: 0, height: 0, positionX: 0, positionY: 0, points: 0}
const player2 = {width: 0, height: 0, positionX: 0, positionY: 0, points: 0}
const players = [player1, player2]

function setDefaultBars(){
    for (barNumber = 0; barNumber < 2; barNumber++){
        players[barNumber].width = gameScreen.clientWidth/5,                                         
        players[barNumber].height = gameScreen.clientHeight/100,
        players[barNumber].positionX = gameScreen.clientWidth/2,
        players[barNumber].points = 0  
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
    player.positionX += direction*gameScreen.clientWidth/100
}

const keyMoves = {
    key_a(){
        movePlayer(player1, direction = -1)
    },
    key_d(){
        movePlayer(player1, direction = 1)
    },
    key_arrowleft(){
        movePlayer(player2, direction = -1)
    },
    key_arrowright(){
        movePlayer(player2, direction = 1)
    }
}

const handleKeys = {}

document.addEventListener('keydown', (keyDownEvent) => {
    let keyPressed = `key_${keyDownEvent.key}`
    keyPressed = keyPressed.toLowerCase()
    const keyPressedMoveExists = keyMoves[keyPressed]
    if (keyPressedMoveExists) {
        handleKeys[keyPressed] = keyPressed
    }
})

document.addEventListener('keyup', (keyUpEvent) => {
    let keyPressed = `key_${keyUpEvent.key}`
    keyPressed = keyPressed.toLowerCase()
    delete handleKeys[keyPressed]
})

//OBRIGADO FILIPE DESCHAMPS
setInterval(function gameFrames() {   
    for (const x in handleKeys) {
        // console.log(x);
        keyToUse = handleKeys[x]
        keyMoves[keyToUse]()
    }
    setBarsStyle()
},10)
setDefaultBars()    