import {browser, by, element} from 'protractor';
import {credentials} from '../../src/environments/credentials';

export class Helper {

  /**
   * @returns {any}
   */
  public static getAlertText() {
    return Helper.getElementByCss('app-alert p').getText();
  }

  /**
   * @returns {string}
   */
  public static getBaseUrl() {
    return Helper.getBrowser().baseUrl + '/';
  }

  /**
   * @param {string} path
   * @returns {string}
   */
  public static getBaseUrlWithPath(path = '') {
    return Helper.getBaseUrl() + path;
  }

  /**
   * @returns {ProtractorBrowser}
   */
  public static getBrowser() {
    return browser;
  }

  /**
   * @returns {any}
   */
  public static getCurrentUrl() {
    return Helper.getBrowser().getCurrentUrl();
  }

  /**
   * @param {string} selector
   * @returns {ElementFinder}
   */
  public static getElementByCss(selector: string) {
    return element(by.css(selector));
  }

  /**
   * @param {string} selector
   * @returns {ElementFinder}
   */
  public static getElementByName(selector: string) {
    return element(by.name(selector));
  }

  /**
   * @returns {string}
   */
  public static getPasswordCredentials() {
    return credentials.password;
  }

  /**
   * @returns {string}
   */
  public static getUsernameCredentials() {
    return credentials.username;
  }

  /**
   * @param {string} destination
   * @returns {promise.Promise<any>}
   */
  public static navigateTo(destination: string) {
    return browser.get(destination);
  }

  public static login() {
    Helper.navigateTo('/login');
    Helper.getElementByName('username').sendKeys(Helper.getUsernameCredentials());
    Helper.getElementByName('password').sendKeys(Helper.getPasswordCredentials());
    Helper.getElementByCss('.btn-primary').click().then(() => {
      expect(Helper.getCurrentUrl()).toEqual(Helper.getBaseUrl());
    });
  }

  public static logout() {
    expect(Helper.getElementByCss('.fa-cogs').isDisplayed()).toBeTruthy();
    Helper.getElementByCss('.fa-cogs').click().then(() => {
      Helper.getElementByCss('.cogs-logout').click().then(() => {
        expect(Helper.getCurrentUrl()).toEqual(Helper.getBaseUrl() + 'login');
      });
    });
  }
}
