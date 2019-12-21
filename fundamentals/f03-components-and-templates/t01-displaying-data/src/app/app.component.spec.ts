import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

const manyHeroes = [
  {id: 1, name: 'Windstorm'},
  {id: 2, name: 'Bombasto'},
  {id: 3, name: 'Magneta'},
  {id: 4, name: 'Tornado'}];

const fewHeroes = [
  {id: 3, name: 'Bombasto'}];

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`heroes > 3`, async () => {
    compiled.heroes = manyHeroes;
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      const message = compiled.querySelector('#message').textContent;
      expect(message).toEqual('There are many heroes!');
    });
  });

  it('heroes < 3', async () => {
    compiled.heroes = fewHeroes;
    fixture.detectChanges();

    await fixture.whenStable().then(() => {
      expect(compiled.querySelector('#message').length).toBeUndefined();
    });
  });
});
