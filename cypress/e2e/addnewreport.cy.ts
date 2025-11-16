import newReport from '../support/page-object/helper.cy';

describe('User Report', () => {
  it('Add new report', () => {
    newReport.visitHomepage();
    newReport.firstName();
    newReport.phoneNumber();
    newReport.email();
    newReport.title();
    cy.get('#kategori').select('4');
    newReport.address();
    newReport.description();
    cy.get('#laporanForm button.text-white').click();
    cy.get('#laporanForm div.alert').should('contain', "Berhasil Menambahkan Laporan");
  })
  
})