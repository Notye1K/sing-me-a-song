/// <reference types="cypress" />


describe("end to end", () => {
    const name = 'Feel Invincible'
    const link = "https://youtu.be/Qzw6A2WC5Qo"
    const name2 = "Legendary";
    const link2 = "https://youtu.be/DApP8dCZOdU";
    it('all routes', () => {
        cy.request("DELETE", "http://localhost:5000/delete")
        .then(() => {
            cy.visit("http://localhost:3000");
            cy.get('input:first').click().type(name)
            cy.get("input:last").click().type(link);
            cy.get('button').click()
            cy.get("article svg:first").click();
            cy.get("article svg:first").click();
            cy.get("article svg:last").click(); //1

            cy.get("input:first").click().type(name2);
            cy.get("input:last").click().type(link2);
            cy.intercept("POST", "http://localhost:5000/recommendations").as('create')
            cy.get("button").click();
            cy.wait('@create')
            cy.get("article").should(($article) => {
              expect($article.first()).to.contain(name2);
            });
            cy.get("article:first svg:first").click();
            cy.get("article:first svg:last").click();

            cy.contains("Top").click()
            cy.url().should("equal", "http://localhost:3000/top");
            cy.get("article:last svg:first").click()
            cy.get("article:last svg:first").click();

            cy.get('article').should($article => {
                expect($article.first()).to.contain(name2)
                expect($article.first()).to.contain(2);
            })
            
            cy.contains("Random").click()
            cy.url().should("equal", "http://localhost:3000/random");

            cy.get("article svg:first").click().click()
            cy.get("article svg:last").click()

        })

    })
})