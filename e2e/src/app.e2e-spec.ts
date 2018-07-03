import {AppPage} from './app.po';
import {Helper} from './helper';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should be at the login page.', () => {
    expect(Helper.getCurrentUrl()).toEqual(Helper.getBaseUrlWithPath('login'));
  });

  it('should redirect back to the login page if not logged in.', () => {
    Helper.navigateTo('/');
    expect(Helper.getCurrentUrl()).toEqual(Helper.getBaseUrlWithPath('login'));
  });

  it('should not be able to login with missing credentials.', () => {
    AppPage.getLoginButton().click().then(() => {
      expect(AppPage.getUsernameInput().getAttribute('class')).toMatch('is-invalid');
      expect(AppPage.getPasswordInput().getAttribute('class')).toMatch('is-invalid');
    });
  });

  it('should not be able to login with invalid credentials.', () => {
    AppPage.getUsernameInput().sendKeys('InvalidUser');
    AppPage.getPasswordInput().sendKeys('InvalidPassword');
    AppPage.getLoginButton().click().then(() => {
      expect(Helper.getAlertText()).toEqual('Invalid credentials, please try your username and password again.');
    });
  });

  it('should be able to login with valid credentials.', () => {
    Helper.login();
  });

  it('should logout and redirect back to login.', () => {
    Helper.logout();
  });
});
