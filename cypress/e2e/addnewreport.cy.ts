import newReport from '../support/page-object/newReport.cy';

import { faker } from '@faker-js/faker';

describe('User Report', () => {
  it('Add new report', () => {
    newReport.visit();
    cy.get('#nama').type('bianca');
    cy.get('#telepon').type('08654323451');
    cy.get('#email').type('bianca@mailme.com');
    cy.get('#laporanForm input[placeholder="--"]').click();
    cy.get('#laporanForm input[placeholder="--"]').type('sampah sembarangan mengakibatkan banjir');
    cy.get('#kategori').select('4');
    cy.get('#lokasi').type('jln. mawar 125');
    cy.get('#deskripsi').type('banyak tumpukan sampah di sisi sungai mngakibatkan bau tidak sedap saat banjir');
    cy.get('#laporanForm button.text-white').click();
    cy.get('#laporanForm div.alert').click();
  })
  
})