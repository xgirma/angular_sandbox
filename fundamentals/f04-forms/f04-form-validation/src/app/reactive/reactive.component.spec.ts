import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ReactiveComponent } from './reactive.component';

describe('ReactiveComponent', () => {
  let component: ReactiveComponent;
  let fixture: ComponentFixture<ReactiveComponent>;
  let compiled: any;
  let form: NgForm;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [NgForm]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ReactiveComponent);
    component = fixture.componentInstance;
    const formElement = fixture.debugElement.query(By.css('form'));
    form = formElement.injector.get(NgForm);
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.powers).toBeTruthy();
    expect(component.hero).toBeTruthy();
    expect(component.heroForm).toBeTruthy();
  });

  it('should submit with valid name', async () => {
    const name = fixture.debugElement.query(By.css('#name')).nativeElement;
    name.value = 'Mr. Boos';
    name.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    expect(form.submitted).toBeFalsy();

    const submit = compiled.querySelector('#submitBtn');
    submit.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const message = compiled.querySelector('#newHero > p');
    const addBtn = compiled.querySelector('#newHero > button');
    expect(message.textContent).toEqual(`You've submitted your hero, Mr. Boos!`);
    expect(addBtn).toBeDefined();
  });

  it('should add a new hero', async () => {
    const submit = compiled.querySelector('#submitBtn');
    submit.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const addBtn = compiled.querySelector('#newHero > button');
    addBtn.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const name = fixture.debugElement.query(By.css('#name')).nativeElement;
    const alterEgo = fixture.debugElement.query(By.css('#alterEgo')).nativeElement;
    const submitBtn = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;

    expect(name.textContent).toEqual('');
    expect(alterEgo.textContent).toEqual('');
    expect(submitBtn.disabled).toBeTruthy();
  });

  it('Name is required', async () => {
    const name = fixture.debugElement.query(By.css('#name')).nativeElement;
    name.value = '';
    name.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    const submitBtn = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
    const resetBtn = fixture.debugElement.query(By.css('#resetBtn')).nativeElement;
    expect(submitBtn.disabled).toBeTruthy();
    expect(resetBtn.disabled).toBeFalsy();

    const control = fixture.componentInstance.heroForm.get('name');
    expect(control.hasError('required')).toBeTruthy();
    const error = fixture.debugElement.query(By.css('#name-required-error')).nativeElement;
    expect(error.textContent).toEqual('Name is required.');
  });

  it('Name must be at least 4 characters long', async () => {
    const name = fixture.debugElement.query(By.css('#name')).nativeElement;
    name.value = 'Jo';
    name.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    const submitBtn = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
    const resetBtn = fixture.debugElement.query(By.css('#resetBtn')).nativeElement;
    expect(submitBtn.disabled).toBeTruthy();
    expect(resetBtn.disabled).toBeFalsy();

    const control = fixture.componentInstance.heroForm.get('name');
    expect(control.hasError('minlength')).toBeTruthy();
    const error = fixture.debugElement.query(By.css('#name-length-error')).nativeElement;
    expect(error.textContent).toEqual('Name must be at least 4 characters long.');
  });

  it('Name cannot be Bob', async () => {
    const name = fixture.debugElement.query(By.css('#name')).nativeElement;
    name.value = 'Bob';
    name.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    const submitBtn = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
    const resetBtn = fixture.debugElement.query(By.css('#resetBtn')).nativeElement;
    expect(submitBtn.disabled).toBeTruthy();
    expect(resetBtn.disabled).toBeFalsy();

    const control = fixture.componentInstance.heroForm.get('name');
    expect(control.hasError('minlength')).toBeTruthy();
    expect(control.hasError('forbiddenName')).toBeTruthy();
    const errorLength = fixture.debugElement.query(By.css('#name-length-error')).nativeElement;
    expect(errorLength.textContent).toEqual('Name must be at least 4 characters long.');

    const errorBob = fixture.debugElement.query(By.css('#no-bob')).nativeElement;
    expect(errorBob.textContent).toEqual('Name cannot be Bob.');
  });

  // TODO fix
  xit('Alter ego is already taken', async () => {
    const name = fixture.debugElement.query(By.css('#name')).nativeElement;
    name.value = 'Sofya';
    name.dispatchEvent(new Event('input'));

    const alterEgo = fixture.debugElement.query(By.css('#alterEgo')).nativeElement;
    alterEgo.value = 'Sofya';
    alterEgo.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    await fixture.whenStable();
  });

  // TODO fix
  xit('Name cannot match alter ego', async () => {
    const alterEgo = fixture.debugElement.query(By.css('#alterEgo')).nativeElement;
    alterEgo.value = 'Eric';
    alterEgo.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    await fixture.whenStable();
  });

  // TODO fix, issue: error will never happen
  xit('Power is required.', () => {});
});
