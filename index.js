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
    const shuffledColors = handleColors()
    handleRandomBoard(shuffledColors)
}

const createWrappers=()=>{
    for(let i=0; i<12;i++){
        const $divWrapper = document.createElement('div')
        $divWrapper.className ='wrapper'
        const $divSquare = document.createElement('div')
        $divSquare.id = 'square'
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
    const $squares = document.querySelectorAll('#square')
    $squares.forEach(function($square,i){
        $square.classList = shuffledColors[i]
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
        if($square.id === 'square'){
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
            if(handleAcert($initialSquare,$square)){
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

