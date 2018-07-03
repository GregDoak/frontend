import {Helper} from '../../../helper';
import {by, element} from 'protractor';

export class MyTokenPage {
  public constructor() {
    Helper.navigateTo('/my/tokens');
  }

  /**
   * @returns {ElementFinder}
   */
  public static getDeleteButton() {
    return Helper.getElementByName('delete-single-button');
  }

  /**
   * @returns {ElementFinder}
   */
  public static getDeleteAllButton() {
    return Helper.getElementByName('delete-all-button');
  }

  /**
   * @returns {ElementFinder}
   */
  public static getDeleteCurrentButton() {
    return Helper.getElementByName('delete-current-button');
  }

  public static getModalConfirmDelete() {
    return Helper.getElementByCss('.modal-body .btn-danger');
  }
}
