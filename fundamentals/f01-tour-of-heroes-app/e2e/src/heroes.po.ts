import { browser, by, element, ExpectedConditions as EC } from 'protractor';

export class AppHeroes {
  body = element(by.css('body'));
  title = element(by.css('app-heroes > h2'));
  list = element.all(by.css('.heroes > li > a'));

  navigateTo() {
    browser.get(browser.baseUrl + `/heroes`);
    return browser.wait(EC.presenceOf(this.body), 5000) as Promise< void>;
  }

  getTitle() {
    return this.title.getText() as Promise<string>;
  }

  getHeroDetail(index) {
    const el = element.all(by.css(`.heroes > li:nth-child(${index}) > a`));
    return el.getText() as Promise<string>;
  }

  selectHero(index) {
    const el = element.all(by.css(`.heroes > li:nth-child(${index}) > a`));
    return el.click() as Promise<any>;
  }
}
