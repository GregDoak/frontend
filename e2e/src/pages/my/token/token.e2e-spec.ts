import {Helper} from '../../../helper';
import {MyTokenPage} from './token.po';

describe('MyTokens', () => {
  let page: MyTokenPage;

  beforeEach(() => {
    Helper.login();
    page = new MyTokenPage();
  });

  afterEach(() => {
    Helper.logout();
  });

  it('should delete a single token.', () => {
    MyTokenPage.getDeleteButton().click().then(() => {
      MyTokenPage.getModalConfirmDelete().click().then(() => {
        expect(Helper.getAlertText()).toEqual('You have deleted a login token.');
      });
    });
  });

  it('should delete the current token and redirect back to login.', () => {
    MyTokenPage.getDeleteCurrentButton().click().then(() => {
      MyTokenPage.getModalConfirmDelete().click().then(() => {
        expect(Helper.getCurrentUrl()).toEqual(Helper.getBaseUrlWithPath('login'));
        Helper.login();
      });
    });
  });

  it('should delete all tokens and redirect back to login.', () => {
    MyTokenPage.getDeleteAllButton().click().then(() => {
      MyTokenPage.getModalConfirmDelete().click().then(() => {
        expect(Helper.getCurrentUrl()).toEqual(Helper.getBaseUrlWithPath('login'));
        Helper.login();
      });
    });
  });
});
