import { faker } from '@faker-js/faker';

class newHelper {
    visitHomepage() {
      cy.visit('http://localhost:3000');
    }

    visitLoginDashbard() {
      cy.visit('http://localhost:3000/admin');
    }

    firstName(){
      const firstName = faker.person.firstName();
  
      cy.get('#nama').click();
      cy.get('#nama').type(firstName);
    }
    phoneNumber(){
      const phoneNumber = faker.phone.number({ style: 'international' })

      cy.get('#telepon').type(phoneNumber);
    }
    email(){
      const email = faker.internet.exampleEmail()

      cy.get('#email').type(email);
    }
    title(){
      const title = faker.lorem.paragraph({ min: 1, max: 2 })

      cy.get('#laporanForm input[placeholder="--"]').type(title);
    }
    address(){
      const address = faker.location.streetAddress()

      cy.get('#lokasi').type(address);
    }
    description(){
      const description = faker.lorem.paragraph({ min: 3, max: 7 })

      cy.get('#deskripsi').type(description);
    }

    fillEmail(){
      cy.get('#exampleInputEmail1').type(Cypress.env('user_email'));
    }

    fillPassword(){
      cy.get('#exampleInputPassword1').type(Cypress.env('user_password'));
    }

    fillWrongPassword(){
      cy.get('#exampleInputPassword1').type(Cypress.env('wrong_password'));
    }
}
  
  export default new newHelper;
  