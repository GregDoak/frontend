import {AppPage} from './app.po';
import {browser} from 'protractor';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should not be able to login with invalid credentials', () => {
    AppPage.navigateTo();
    AppPage.setFormUsername();
    AppPage.setFormPassword();
    AppPage.getFormButton().click().then(() => {
      expect(AppPage.getAlertText()).toEqual('Invalid credentials, please try your username and password again.');
    });
  });
});
