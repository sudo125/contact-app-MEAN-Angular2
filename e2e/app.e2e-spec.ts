import { ContactBookPage } from './app.po';

describe('contact-book App', function() {
  let page: ContactBookPage;

  beforeEach(() => {
    page = new ContactBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
