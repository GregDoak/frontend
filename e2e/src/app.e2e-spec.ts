import {AppPage} from './app.po';
import {credentials} from '../../src/environments/credentials';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should not be able to login with missing credentials.', () => {
    AppPage.navigateTo('/');
    AppPage.getElementByCss('.btn-primary').click().then(() => {
      expect(AppPage.getElementByName('username').getAttribute('class')).toMatch('is-invalid');
      expect(AppPage.getElementByName('password').getAttribute('class')).toMatch('is-invalid');
    });
  });

  it('should not be able to login with invalid credentials.', () => {
    AppPage.navigateTo('/');
    AppPage.getElementByName('username').sendKeys('InvalidUser');
    AppPage.getElementByName('password').sendKeys('InvalidPassword');
    AppPage.getElementByCss('.btn-primary').click().then(() => {
      expect(AppPage.getElementByCss('app-alert p').getText()).toEqual('Invalid credentials, please try your username and password again.');
    });
  });

  it('should be able to login with valid credentials.', () => {
    AppPage.navigateTo('/');
    AppPage.getElementByName('username').sendKeys(credentials.username);
    AppPage.getElementByName('password').sendKeys(credentials.password);
    AppPage.getElementByCss('.btn-primary').click().then(() => {
      expect(AppPage.getBrowser().getCurrentUrl()).toEqual(AppPage.getBrowser().baseUrl + '/');
    });
  });

  it('should logout and redirect back to login.', () => {
    AppPage.navigateTo('/');
    expect(AppPage.getElementByCss('.fa-cogs').isDisplayed()).toBeTruthy();
    AppPage.getElementByCss('.fa-cogs').click().then(() => {
      AppPage.getElementByCss('.cogs-logout').click().then(() => {
        expect(AppPage.getBrowser().getCurrentUrl()).toEqual(AppPage.getBrowser().baseUrl + '/login');
      });
    });
  });
});
