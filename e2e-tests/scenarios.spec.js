'use strict';
var path = require('path');
var util = require('./util');
var EC = protractor.ExpectedConditions;

describe('fhir app', function() {

  var title = element(by.id('siteName'));
  let mainPageURL = '/lforms-fhir-app/';

  describe('Main View', function() {

    it('should render a page without any data', function() {
      browser.ignoreSynchronization = false;
      browser.get(mainPageURL);
      browser.wait(function() {
        return title.isDisplayed();
      }, 5000);
      expect(element.all(by.css('.panel-heading .panel-title')).first().getText()).
        toMatch(/Saved QuestionnaireResponses/);
    });

  });

  describe("Load Button", function() {
    var height = element(by.id('/8302-2/1')),
        weight = element(by.id('/29463-7/1')),
        bmi = element(by.id('/39156-5/1'));

    it("should load a Questionnaire file", function() {
      browser.ignoreSynchronization = false;
      browser.get(mainPageURL);
      browser.wait(function() {
        return title.isDisplayed();
      }, 5000);
      util.uploadForm('weight-height-questionnaire.json');

      browser.waitForAngular();
      browser.wait(EC.textToBePresentInElement(element(by.css('.lf-form-title')), "Weight"), 5000);

      // BMI
      height.sendKeys("70");
      expect(bmi.getAttribute('value')).toBe("");
      weight.sendKeys("70");
      expect(bmi.getAttribute('value')).toBe("22.1");
      height.clear();
      height.sendKeys("80");
      expect(bmi.getAttribute('value')).toBe("17");
    });
  });

});
