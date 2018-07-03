import {Helper} from '../../../helper';

export class MyPasswordPage {
  public constructor() {
    Helper.navigateTo('/my/password');
  }

  /**
   * @returns {ElementFinder}
   */
  public static getSaveButton() {
    return Helper.getElementByCss('.btn-primary');
  }

  /**
   * @returns {ElementFinder}
   */
  public static getCurrentPasswordInput() {
    return Helper.getElementByName('currentPassword');
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
  public static getConfirmPasswordInput() {
    return Helper.getElementByName('confirmPassword');
  }
}
