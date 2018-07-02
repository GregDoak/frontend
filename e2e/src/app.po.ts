import {browser, by, element} from 'protractor';

export class AppPage {
  /**
   * @param {string} destination
   * @returns {promise.Promise<any>}
   */
  public static navigateTo(destination: string) {
    return browser.get(destination);
  }

  /**
   * @returns {ProtractorBrowser}
   */
  public static getBrowser() {
    return browser;
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
}
