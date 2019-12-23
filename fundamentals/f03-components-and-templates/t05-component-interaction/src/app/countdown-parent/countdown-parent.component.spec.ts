import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountdownParentComponent } from './countdown-parent.component';
import { CountdownTimerComponent } from '../countdown-timer/countdown-timer.component';

describe('CountdownParentComponent', () => {
  let component: CountdownParentComponent;
  let fixture: ComponentFixture<CountdownParentComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountdownParentComponent, CountdownTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have countdown timer app', () => {
    expect(compiled.querySelector('app-countdown-timer')).toBeDefined();
  });

  it(`should have start button`, () => {
    const timer = {
      start: () => {},
      stop: () => {},
      seconds: 0
    };

    spyOn(timer, 'start').and.returnValue(undefined);
    spyOn(timer, 'stop').and.returnValue(undefined);

    const start = compiled.querySelector('#start');
    const end = compiled.querySelector('#end');

    start.dispatchEvent(new Event('click'));
    end.dispatchEvent(new Event('click'));

    // TODO mock and assert
    // expect(timer.start).toHaveBeenCalledTimes(1);
    // expect(timer.stop).toHaveBeenCalledTimes(1);
  });
});
