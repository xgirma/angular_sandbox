import { by, element, } from 'protractor';

export class HeroDetail {
  title = element(by.css('app-hero-detail > div > h2'));
  id = element(by.css('app-hero-detail > div > div:nth-child(2)'));
  name = element(by.css('input'));

  getTitle() {
    return this.title.getText() as Promise<string>;
  }

  getId() {
    return this.id.getText() as Promise<string>;
  }

  setName(name) {
    this.name.clear();
    return this.name.sendKeys(name) as Promise<any>;
  }
}
