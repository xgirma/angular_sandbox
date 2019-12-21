// import { AppHeroes } from './heroes.po';
import { HeroDetail } from './hero-detail.po';
import { Dashboard } from './dashboard.po';

describe('HeroDetail', () => {
  // let appPage: AppHeroes;
  let heroDetailPage: HeroDetail;
  let dashboard: Dashboard;

  beforeAll(() => {
    // appPage = new AppHeroes();
    heroDetailPage = new HeroDetail();
    dashboard = new Dashboard();
    dashboard.navigateTo();
    dashboard.selectHero(0);
    // appPage.selectHero(0);
  });

  it('should have title', () => {
    // expect(heroDetailPage.getTitle()).toEqual('DR NICE Details');
    expect(heroDetailPage.getTitle()).toEqual('NARCO Details');
  });

  it(`should have id`, () => {
    // expect(heroDetailPage.getId()).toEqual('id: 11');
    expect(heroDetailPage.getId()).toEqual('id: 12');
  });

  it('should have editable hero name', async () => {
    await heroDetailPage.setName('Dr. Foo');
    expect(heroDetailPage.getTitle()).toEqual('DR. FOO Details');
  });
});
