import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { KeyupComponent } from './keyup/keyup.component';
import { LittleTourComponent } from './little-tour/little-tour.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        KeyupComponent,
        LittleTourComponent
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

  it('should bind click event', async () => {
    spyOn(component, 'onClickMe').and.callThrough();
    const button = compiled.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.onClickMe).toHaveBeenCalledTimes(1);
    expect(compiled.querySelector('p').textContent).toEqual('You are my hero!');
  });
});
