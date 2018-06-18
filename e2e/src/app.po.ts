import {browser, by, element} from 'protractor';

export class AppPage {
  public static navigateTo() {
    return browser.get('/');
  }

  public static setFormUsername() {
    return element(by.name('username')).sendKeys('jackfedrick@gmail.com');
  }

  public static setFormPassword() {
    return element(by.name('password')).sendKeys('jackfedrick@gmail.com');
  }

  public static getAlertText() {
    return element(by.css('app-alert p')).getText();
  }

  public static getFormButton() {
    return element(by.css('.btn-primary'));
  }
}
