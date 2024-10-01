var SERVER_URL = "https://cours-qualite.groupe-esiea.fr/esieaFront/";



beforeEach(() => {
  cy.visit(SERVER_URL);
  cy.viewport(1024, 768)
});


describe('ajouter une voiture, ok', () => {
  it('passes', () => {
    cy.intercept('POST', 'https://cours-qualite.groupe-esiea.fr/esieaBack/rest/voiture/add/').as('addCar');
    cy.wait(500);
    cy.contains('a', 'Ajouter une voiture').click(); 

    cy.get('#marque').type('Citroen');
    cy.get('#modele').type('C3');
    cy.get('#finition').type('Picasso');
    cy.get('#carburant').select('Diesel');
    cy.get('#km').type('110000');

    cy.get('#annee').type('2020');
    cy.get('#prix').type('3800');

    cy.get('#nouvelleVoiture').click();
    cy.wait('@addCar').its('response.statusCode').should('eq', 200);

  })

})

describe('ajouter une voiture, tous les champs sont vides', () => { 
  it('passes', () => {
    cy.intercept('POST', 'https://cours-qualite.groupe-esiea.fr/esieaBack/rest/voiture/add/').as('addCar');
    cy.wait(500);

    cy.contains('a', 'Ajouter une voiture').click().wait(1000); 

    cy.get('#marque');
    cy.get('#modele');
    cy.get('#finition');
    cy.get('#carburant');
    cy.get('#km');

    cy.get('#annee');
    cy.get('#prix');

    cy.get('#nouvelleVoiture').click();
    cy.wait('@addCar').its('response.statusCode').should('eq', 500);

  })
 })


 describe('ajouter une voiture, un champ numérique ne doit pas accpéter du texte', () => { 
  it('passes', () => {
    cy.intercept('POST', 'https://cours-qualite.groupe-esiea.fr/esieaBack/rest/voiture/add/').as('addCar');
    cy.wait(500);

    cy.contains('a', 'Ajouter une voiture').click().wait(1000); 

    cy.get('#marque').type('Citroen');
    cy.get('#modele').type('C3');
    cy.get('#finition').type('Picasso');
    cy.get('#carburant').select('Diesel');
    cy.get('#km').type('text here');

    cy.get('#annee').type('2020');
    cy.get('#prix').type('3800');

    cy.get('#nouvelleVoiture').click();
    cy.wait('@addCar').its('response.statusCode').should('eq', 500);

  })
 })


 describe('consulter une liste de voiture', () => { 
  it('passes', () => {
    cy.get('tbody').should('exist'); 
    cy.get('tbody').find('tr').first().should('exist');
  })
 })


 describe('consulter le détail d’une voiture', () => { 
  it('passes', () => {
    cy.intercept('GET', 'https://cours-qualite.groupe-esiea.fr/esieaBack/rest/voiture/get/*').as('getCarDetail');

    cy.get('tbody').should('exist'); 
    cy.get('tbody').find('tr').first().should('exist');
    cy.get('tbody').find('tr').first().find('td').last().find('a').click();
    cy.wait('@getCarDetail').its('response.statusCode').should('eq', 200);

    cy.get('#contenuVoiture').within(() => {
      cy.get('label').contains('Marque :').next('span.infoVoiture').invoke('text').should('not.be.empty');
      cy.get('label').contains('Modèle :').next('span.infoVoiture').invoke('text').should('not.be.empty');
      cy.get('label').contains('Finition :').next('span.infoVoiture').invoke('text').should('not.be.empty');
      cy.get('label').contains('Carburant :').next('span.infoVoiture').invoke('text').should('not.be.empty');
      cy.get('label').contains('Kilométrage :').next('span.infoVoiture').invoke('text').should('not.be.empty');
      cy.get('label').contains('Année :').next('span.infoVoiture').invoke('text').should('not.be.empty');
      cy.get('label').contains('Prix :').next('span.infoVoiture').invoke('text').should('not.be.empty');
    });
  })
 })


 describe('rechercher une voiture, par marque', () => { 
  it('passes', () => {
    cy.get('#saisieRecherche').type('Citroen');
    cy.get('button[type="submit"].rechercher.button').click();
    cy.get('tbody').should('exist'); 
    cy.get('tbody').find('tr').first().should('exist');
    cy.get('tbody').find('tr').first().find('td').first().should('contain.text', 'Citroen');
  })
 })

 describe('rechercher une voiture, par modèle', () => { 
  it('passes', () => {
    cy.wait(100);
    cy.get('#saisieRecherche').type('C3');
    cy.get('button[type="submit"].rechercher.button').click();
    cy.get('tbody').should('exist'); 
    cy.get('tbody').find('tr').first().should('exist');
    cy.get('tbody').find('tr').first().find('td').eq(1).should('contain.text', 'C3');  })
 })

 describe('rechercher une voiture, par finition', () => { 
  it('passes', () => {
    cy.wait(100);
    cy.get('#saisieRecherche').type('Picasso');
    cy.get('button[type="submit"].rechercher.button').click();
    cy.get('tbody').should('exist'); 
    cy.get('tbody').find('tr').first().should('exist');
    cy.get('tbody').find('tr').first().find('td').eq(2).should('contain.text', 'Picasso');  })
 })
 describe('Suppression voiture', () => { 
  it('passes', () => {
    
    cy.intercept('POST', 'https://cours-qualite.groupe-esiea.fr/esieaBack/rest/voiture/del/').as('delCar');

    cy.wait(100);
    cy.get('#saisieRecherche').type('Citroen');
    cy.get('button[type="submit"].rechercher.button').click();
    cy.get('tbody').should('exist'); 
    cy.get('tbody').find('tr').first().should('exist');
    cy.get('tbody').find('tr').first().find('td').last().find('a').click();
    cy.get('#divSupprimer').should('exist');

    cy.get('#divSupprimer').first().find('button').click();

    cy.wait('@delCar').its('response.statusCode').should('eq', 200);

 })
})


 