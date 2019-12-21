import { browser, by, element } from 'protractor';

export class Dashboard {
  title = element(by.css('app-dashboard > h3'));
  heroes = element.all(by.css('h4'));

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitle() {
    return this.title.getText() as Promise<string>;
  }

  getHeroName(index) {
    return this.heroes.get(index).getText() as Promise<string>;
  }

  selectHero(index) {
    return this.heroes.get(index).click() as Promise<void>;
  }
}
