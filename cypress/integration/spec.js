//1
describe('my first test', () => {
    it('Does not do much', () => {
        expect(true).to.equal(true)
    })
});

//2
describe('visits our site', ()=>{
    it('visits localhost:3000', ()=>{
        cy.visit('http://localhost:3000')
    })
})

//3
describe('should click doctor button on landing page', ()=>{
   it('shouldl click the doctor button and be redirected to login form', ()=>{
       cy.visit('http://localhost:3000')
       cy.get('.doc_link')
       .click()
   })
})

//4
describe('should click patient button on landing page', ()=>{
    it('should click patient button and be redirected to associated login form', ()=>{
        cy.visit('http://localhost:3000')
        cy.get('.pat_link')
        .click()
    })
})

//5
describe('visits doctor login form', ()=>{
    it('should visit localhost:3000/doctorlogin', ()=>{
        cy.visit('http://localhost:3000/#/doctorlogin')
    })
})

//6
describe('can type in email on doctor login form', ()=>{
    it('should type in email address', ()=>{
        cy.visit('http://localhost:3000/#/doctorlogin')
        cy.get('.login_fields > input')
        
        .first()
        .type('jeremy@egan.com')
    })
})

//7
describe('can type in password on doctor login form', ()=>{
    it('should type in password', ()=>{
        cy.visit('http://localhost:3000/#/doctorlogin')
        cy.get('.login_fields > input')
        .last()
        .type('hhhhhh')
    })
})

//8
describe('can click login button on doctor login form', ()=>{
    it('should click login button', ()=>{
        cy.visit('http://localhost:3000/#/doctorlogin')
        cy.get('.login_fields > button')
        .click()
    })
})

//9
describe('can click register button on doctor login form', ()=>{
    it('should click register button', ()=>{
        cy.visit('http://localhost:3000/#/doctorlogin')
        cy.get('.register_btn')
        .click()
    })
})

//10
describe('can visit the doctor registration page', ()=>{
    it('visits doctor registration page', ()=>{
        cy.visit('http://localhost:3000/#/doctorregister')
       

    })
})

//11 
describe('can input first name on doctor registration form', ()=>{
    it('inputs first name in input', ()=>{
        cy.visit('http://localhost:3000/#/doctorregister')
        cy.get('.login_fields > input' )
        .first()
        .type('Bobby')
    })
})

//12
describe('can input last name on doctor registration form', ()=>{
    it('inputs last name in input', ()=>{
        cy.visit('http://localhost:3000/#/doctorregister')
        cy.get('.login_fields > input').eq(2)
       
        .type('Brown')
    })
})

//13
describe('can input email on doctor registration form', ()=>{
    it('inputs email in input', ()=>{
        cy.visit('http://localhost:3000/#/doctorregister')
        cy.get('.login_fields > input').eq(3)
        .type('Bobby@Brown.com')
    })
})

//14
describe('can input pin on doctor registration form', ()=>{
    it('inputs pin in input', ()=>{
        cy.visit('http://localhost:3000/#/doctorregister')
        cy.get('.login_fields > input').eq(4)
        .type('5555')
    })
})

//15
describe('can input office in input', ()=>{
    it('inputs doctors office in input', ()=>{
        cy.visit('http://localhost:3000/#/doctorregister')
        cy.get('.login_fields > input').eq(5)
        .type('Bobbers Private Practice')
    })
})

//16

describe('can hit patient registration page', ()=>{
    it('hits patient registration page', ()=>{
        cy.visit('http://localhost:3000/#/patientregister')
    })
})

//17
describe('can type in first name in input', ()=>{
    it('types in patient first name in first input', ()=>{
        cy.visit('http://localhost:3000/#/patientregister')
        cy.get('.login_fields > input')
        .first()
        .type('Melody')
    })
})

//18
describe('can type in last name in input', ()=>{
    it('types in patient last name in second input', ()=>{
        cy.visit('http://localhost:3000/#/patientregister')
        cy.get('.login_fields > input').eq(2)
        .type('Vincent')

    })
})

//19
describe('can type in email in input', ()=>{
    it('types in patient email in third input', ()=>{
        cy.visit('http://localhost:3000/#/patientregister')
        cy.get('.login_fields > input').eq(3)
        .type('Melody@Vincent.com')
    })
})

//20
describe('can type in password in input', ()=>{
    it('types in patient password in fourth input', ()=>{
        cy.visit('http://localhost:3000/#/patientregister')
        cy.get('.login_fields > input').eq(4)
        .type('MelodyRules')
    })
})