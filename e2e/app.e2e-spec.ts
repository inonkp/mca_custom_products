import { MCACusomtImagesPage } from './app.po';

describe('mcacusomt-images App', () => {
  let page: MCACusomtImagesPage;

  beforeEach(() => {
    page = new MCACusomtImagesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
