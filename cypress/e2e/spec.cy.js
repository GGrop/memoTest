const URL='http://192.168.0.90:8080/'

context('MemoTest',()=>{

  beforeEach(()=>{
    cy.visit(URL)
    cy.get('#start').click()
  })
  const SQUARES =12

  it('make sure there is a board with squares',()=>{
    cy.get('.gridWrapper').find('.square').should('have.length',SQUARES)
  })
  it('make sure square class are random',()=>{
    cy.get('.square').then(function(squares){
      let actualSquares= []
      squares.each(function(i,square){
        actualSquares.push(square.className)
      })
      cy.visit(URL)
      cy.get('#start').click()

      cy.get('.square').then(function(squares){
        let newSquares=[]
        squares.each(function(i,square){
          newSquares.push(square.className)
        })
        cy.wrap(actualSquares).should('not.deep.equal',newSquares)
      })
    })
  })

  it('make sure square class are random',()=>{
    cy.get('.square').then(function(squares){
      let actualSquares= []
      squares.each(function(i,square){
        actualSquares.push(square.className)
      })
      cy.visit(URL)
      cy.get('#start').click()

      cy.get('.square').then(function(squares){
        let newSquares=[]
        squares.each(function(i,square){
          newSquares.push(square.className)
        })
        cy.wrap(actualSquares).should('not.deep.equal',newSquares)
      })
    })
  })

  it('resolve the game',()=>{
    let pairs
    let pairsList
    let ERRORS = '1'
    let WIN_ALERT = 'Ganaste! Si queres volver a jugar toca empezar'
    cy.get('.square').then(function(squares){
      pairs = handlerPairs(squares)
      pairsList= Object.values(pairs)
      cy.get(pairsList[0][0]).click()
      cy.get(pairsList[3][1]).click()
      pairsList.forEach(function(squarePair){
        cy.get(squarePair[0]).click()
        cy.get(squarePair[1]).click()
      })
    })
    cy.get('#errors').should('have.text', ERRORS)
    cy.get('#estadoDeJuego').should('have.text', WIN_ALERT)
    
  })
})

function handlerPairs(squares){
  let pairs={}
  squares.each(function(i,square){
    const colorClass = square.className.replace('square', '')
    if(pairs[colorClass]){
      pairs[colorClass].push(square)
    }else{
      pairs[colorClass]=[square]
    }
    console.log(pairs)
  })
  return pairs
}