const $board = document.querySelector('.gridWrapper');
const $buttonStart = document.querySelector('#start')
let $initialSquare = null
let errors = 0
const $errors = document.querySelector('#errors')
$errors.textContent = errors

$buttonStart.onclick=function(){
    createWrappers()
    configureGame()
    startGame()
}

const configureGame=()=>{
    $buttonStart.classList.add('hide');
    handleRestartErrors()
    const shuffledColors = handleColors()
    handleRandomBoard(shuffledColors)
}

const createWrappers=()=>{
    for(let i=0; i<12;i++){
        const $divWrapper = document.createElement('div')
        $divWrapper.className ='wrapper'
        const $divSquare = document.createElement('div')
        $divSquare.className = 'square'
        $divWrapper.appendChild($divSquare)
        $board.appendChild($divWrapper)
    }
}

const handleColors=()=>{
    const colorsClass = ['redSquare', 'purpleSquare', 'pinkSquare','yellowSquare', 'greenSquare', 'blueSquare']
    const pairColorsClass = colorsClass.concat(colorsClass)
    pairColorsClass.sort(function(){
        return 0.5 - Math.random()
    })
    return pairColorsClass
}

const handleRandomBoard=(shuffledColors)=>{
    const $squares = document.querySelectorAll('.square')
    $squares.forEach(function($square,i){
        $square.classList.add(shuffledColors[i])
        
        // $square.className = 'shuffledColors[i]'
        // console.log($square.classList)
    })
}

const startGame=()=>{
    handleStartGameAlert()
    handleClick()
}

const handleStartGameAlert=()=>{
    const $alert = document.querySelector('#estadoDeJuego')
    $alert.classList.remove('alert-success')
    $alert.classList.add('alert-primary')
    $alert.textContent = 'Suerte jugador!'
}

const handleClick=()=>{
    $board.onclick = function(e){
        let $square = e.target
        if($square.classList.contains('square')){
            handleUserPlay($square)
        }
    }
}

const handleUserPlay=($square)=>{
    handleSquareVisibility($square, '1')
    if($initialSquare === null){
        $initialSquare = $square
    }else{
        if($initialSquare === $square){
            return
        }else{
            if(handlePlayerHit($initialSquare,$square)){
                removeSquare($initialSquare)
                removeSquare($square)
            }else{
                handleSquareVisibility2($initialSquare)
                handleSquareVisibility2($square)
                handleErrors()
            }
        }
        $initialSquare = null
    }
}

const handleSquareVisibility=($square)=>{
        $square.style.opacity='1'
}
const handleSquareVisibility2=($square)=>{
    setTimeout(function(){
        $square.style.opacity='0'
    },300)
}

const handlePlayerHit=($initialSquare,$square)=>{
    return $initialSquare.className === $square.className
}

const removeSquare=($square)=>{
    setTimeout(function(){
        $square.parentElement.classList.add('done')
        $square.remove()
        checkWinCondition()
    },500)
}

const checkWinCondition=()=>{
    let $remainingSquares = document.querySelectorAll('.square').length
    if($remainingSquares===0){
        $buttonStart.classList.remove('hide');
        handleWinAlert()
        removeOldBoard()
    }
}

const handleErrors=()=>{
    errors++
    $errors.textContent = errors
}
const handleRestartErrors=()=>{
    errors=0
    $errors.textContent = errors
}

const handleWinAlert=()=>{
    const $alert = document.querySelector('#estadoDeJuego')
    $alert.classList.remove('alert-primary')
    $alert.classList.add('alert-success')
    $alert.textContent = 'Ganaste! Si queres volver a jugar toca empezar'
}

const removeOldBoard=()=>{
    document.querySelectorAll('.wrapper').forEach(function($divWrapper){
        $divWrapper.remove()
    })
}