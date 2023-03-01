const URL='http://192.168.0.90:8080/'

context('MemoTest',()=>{

  beforeEach(()=>{
    cy.visit(URL)
  })
  const SQUARES =12
    it('click button start',()=>{
      cy.get('#start').click()
    });

    it('make sure there is a board',()=>{
      cy.get('#start').click()
      cy.get('.gridWrapper').find('.Square').should('have.length',SQUARES)
    })

})

// estructura:

// context:
// context:
//   describe:
//     it:
//       cy:
//       cy:
//       cy:
//   describe:
//     it:
//       cy:
//       cy:
//       cy: