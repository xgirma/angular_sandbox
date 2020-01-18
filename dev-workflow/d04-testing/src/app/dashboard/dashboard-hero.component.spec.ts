import {DashboardHeroComponent} from "./dashboard-hero.component";
import {Hero} from "../model";

describe('DashboardHeroComponent', () => {

  it('raises the selected event when clicked', () => {
    const component = new DashboardHeroComponent();
    const hero: Hero = { id: 42, name: 'Test' };
    component.hero = hero;

    component.selected.subscribe((selectedHero: Hero) =>
      expect(selectedHero).toBe(hero)
    );
    component.click();
  });
});

