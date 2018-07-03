import {Helper} from '../../../helper';
import {MyPasswordPage} from './password.po';

describe('MyPassword', () => {
  let page: MyPasswordPage;

  beforeEach(() => {
    Helper.login();
    page = new MyPasswordPage();
  });

  afterEach(() => {
    Helper.logout();
  });

  it('should change the password.', () => {
    MyPasswordPage.getCurrentPasswordInput().sendKeys(Helper.getPasswordCredentials());
    MyPasswordPage.getPasswordInput().sendKeys(Helper.getPasswordCredentials() + 'New');
    MyPasswordPage.getConfirmPasswordInput().sendKeys(Helper.getPasswordCredentials() + 'New');
    MyPasswordPage.getSaveButton().click().then(() => {
      expect(Helper.getAlertText()).toEqual('Your password has been updated.');
    });
    // change the password back
    MyPasswordPage.getCurrentPasswordInput().sendKeys(Helper.getPasswordCredentials() + 'New');
    MyPasswordPage.getPasswordInput().sendKeys(Helper.getPasswordCredentials());
    MyPasswordPage.getConfirmPasswordInput().sendKeys(Helper.getPasswordCredentials());
    MyPasswordPage.getSaveButton().click().then(() => {
      expect(Helper.getAlertText()).toEqual('Your password has been updated.');
    });
  });
});
