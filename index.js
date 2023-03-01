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

