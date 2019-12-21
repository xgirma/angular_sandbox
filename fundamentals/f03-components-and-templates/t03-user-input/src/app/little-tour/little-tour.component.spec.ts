import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LittleTourComponent } from './little-tour.component';

describe('LittleTourComponent', () => {
  let component: LittleTourComponent;
  let fixture: ComponentFixture<LittleTourComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LittleTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LittleTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get input from event: add button', async () => {
    spyOn(component, 'addHero').and.callThrough();
    const button = compiled.querySelector('button');
    const inputBox = compiled.querySelector('input');
    const heroes = fixture.debugElement.queryAll(By.css('li'));
    expect(heroes.length).toEqual(4);
    inputBox.value = 'Foo Bar';
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    await fixture.whenStable();

    const heroesNow = fixture.debugElement.queryAll(By.css('li'));
    expect(component.addHero).toHaveBeenCalledTimes(1);
    expect(heroesNow.length).toEqual(5);
    expect(heroesNow[4].nativeElement.textContent).toEqual('Foo Bar');
  });

  it('should get input from event: key.enter', async () => {
    spyOn(component, 'addHero').and.callThrough();
    const inputBox = compiled.querySelector('input');
    const heroes = fixture.debugElement.queryAll(By.css('li'));
    const event = new KeyboardEvent('keyup', {key: 'Enter'});

    expect(heroes.length).toEqual(4);
    inputBox.value = 'Boo Soo';
    inputBox.dispatchEvent(event);

    fixture.detectChanges();
    await fixture.whenStable();

    const heroesNow = fixture.debugElement.queryAll(By.css('li'));
    expect(component.addHero).toHaveBeenCalledTimes(1);
    expect(heroesNow.length).toEqual(5);
    expect(heroesNow[4].nativeElement.textContent).toEqual('Boo Soo');
  });

  it('should get input from event: key.enter + blur', async () => {
    spyOn(component, 'addHero').and.callThrough();
    const inputBox = compiled.querySelector('input');
    const heroes = fixture.debugElement.queryAll(By.css('li'));
    const event = new KeyboardEvent('keyup', {key: 'Enter'});

    // TODO
  });
});
