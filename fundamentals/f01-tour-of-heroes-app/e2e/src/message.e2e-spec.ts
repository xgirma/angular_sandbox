import { AppPage } from './app.po';
import { AppHeroes } from './heroes.po';
import { Messages } from './messages.po';

describe('Messages', () => {
  let appPage: AppPage;
  let appHeroes: AppHeroes;
  let message: Messages;

  beforeAll(() => {
    appPage = new AppPage();
    appHeroes = new AppHeroes();
    message = new Messages();
    appHeroes.navigateTo();
  });

  it('should have message title', () => {
    expect(message.getTitle()).toEqual('Messages');
  });

  it('should have message', () => {
    expect(message.getMessage()).toEqual('HeroService: fetched heroes');
  });

  it('should clear message', () => {
    message.clickClear();
    expect(message.title.isPresent()).toBeFalsy();
    expect(message.clear.isPresent()).toBeFalsy();
    expect(message.message.isPresent()).toBeFalsy();
  });
});
