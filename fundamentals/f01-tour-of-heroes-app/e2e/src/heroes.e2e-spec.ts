import { AppHeroes } from './heroes.po';
import { HEROES } from '../mock-heroes';

describe('AppHeroes', () => {
  let page: AppHeroes;

  beforeAll(() => {
    page = new AppHeroes();
    page.navigateTo();
    page.selectHero(0);
  });

  it('should have a list of heroes', () => {
    HEROES.forEach((hero, index) => {
      expect(page.getHeroDetail(index + 1)).toEqual([`${hero.id} ${hero.name}`]);
    });
  });

  it(`should have title`, () => {
    expect(page.getTitle()).toEqual('My Heroes');
  });
});
