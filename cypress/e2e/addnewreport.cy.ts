import newReport from '../support/page-object/newReport.cy';

import { faker } from '@faker-js/faker';

describe('User Report', () => {
  it('Add new report', () => {
    newReport.visit();
  })
  
})

it('newreport', function() {
  cy.visit('http://localhost:3000/')
  
});