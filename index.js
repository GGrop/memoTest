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

