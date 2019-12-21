import { Dashboard } from './dashboard.po';

describe('Dashboard', () => {
  let page: Dashboard;

  beforeAll(() => {
    page = new Dashboard();
    page.navigateTo();
  });

  it('should have title', () => {
    expect(page.getTitle()).toEqual('Top Heroes');
  });

  it(`should have heroes`, () => {
    expect(page.getHeroName(0)).not.toEqual('');
    expect(page.getHeroName(1)).not.toEqual('');
    expect(page.getHeroName(2)).not.toEqual('');
    expect(page.getHeroName(3)).not.toEqual('');
  });
});
