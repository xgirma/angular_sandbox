import { by, element } from 'protractor';

export class Messages {
  title = element(by.css('app-messages > div > h2'));
  clear = element(by.css('app-messages > div > button'));
  message = element(by.css('.msg'));

  getTitle() {
    return this.title.getText() as Promise<string>;
  }

  clickClear() {
    return this.clear.click() as Promise<void>;
  }

  getMessage() {
    return this.message.getText() as Promise<string>;
  }
}
