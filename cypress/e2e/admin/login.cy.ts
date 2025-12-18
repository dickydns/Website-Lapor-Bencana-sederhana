import newReport from '../../support/page-object/helper.cy';

describe('Login Admin', () => {
    it('Unsuccessfully login', () => {
      newReport.visitLoginDashbard();
      newReport.fillEmail();
      newReport.fillWrongPassword();
      cy.get('#main-wrapper button.btn').click();
  
      cy.url().should('eq', 'http://localhost:3000/admin');
  
      cy.get('#main-wrapper div.alert').should('be.visible');
      cy.get('#main-wrapper div.alert').should('contain', 'Email atau password salah');
    });
  
    it('Successfully login with valid credentials', () => {
      newReport.visitLoginDashbard();
      newReport.fillEmail();
      newReport.fillPassword();
      cy.get('#main-wrapper button.btn').click();
  
      cy.url().should('eq', 'http://localhost:3000/admin/dashboard');
  
    });
  });

  