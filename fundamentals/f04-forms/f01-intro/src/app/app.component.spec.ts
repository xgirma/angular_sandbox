import {TestBed, async, ComponentFixture, tick, fakeAsync} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the app', () => {
    expect(compiled).toBeTruthy();
  });

  it('reactive form: view -> model', () => {
    const inputBox = fixture.nativeElement.querySelector('#rf01 > input');
    inputBox.value = 'Red';
    inputBox.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
  });

  it('reactive form: model -> view', () => {
    component.favoriteColorControl.setValue('Blue');
    const inputBox = fixture.nativeElement.querySelector('#rf01 > input');

    expect(inputBox.value).toBe('Blue');
  });

  it('reactive form: view -> model -> view', async () => {
    const inputBox = fixture.nativeElement.querySelector('#rf01 > input');
    inputBox.value = 'Yellow';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Yellow');
    expect(inputBox.value).toBe('Yellow');
    expect(compiled.querySelector('#rf01 > div').textContent).toEqual('Yellow');
  });

  it('template-driven form: view -> model', async () => {
    const inputBox = fixture.nativeElement.querySelector('#tf01 > input');
    inputBox.value = 'White';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.favoriteColor).toEqual('White');
  });

  it('template-driven form: model -> view', fakeAsync(() => {
    component.favoriteColor = 'Green';
    fixture.detectChanges();
    tick();

    const inputBox = fixture.nativeElement.querySelector('#tf01 > input');
    expect(inputBox.value).toBe('Green');
  }));

  it('template-drive form: view -> model -> view', async () => {
    const inputBox = fixture.debugElement.query(By.css('#tf01 > input')).nativeElement;
    inputBox.value = 'Brown';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.favoriteColor).toEqual('Brown');
    expect(compiled.querySelector('#tf01 > div').textContent).toEqual('Brown');
  });
});
