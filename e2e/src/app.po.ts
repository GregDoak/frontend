import {Helper} from './helper';

export class AppPage {
  public constructor() {
    Helper.navigateTo('/');
  }

  /**
   * @returns {ElementFinder}
   */
  public static getLoginButton() {
    return Helper.getElementByCss('.btn-primary');
  }

  /**
   * @returns {ElementFinder}
   */
  public static getPasswordInput() {
    return Helper.getElementByName('password');
  }

  /**
   * @returns {ElementFinder}
   */
  public static getUsernameInput() {
    return Helper.getElementByName('username');
  }
}
