import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { NgForm, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TemplateDrivenComponent } from './template-driven.component';

describe('TemplateDrivenComponent', () => {
  let component: TemplateDrivenComponent;
  let fixture: ComponentFixture<TemplateDrivenComponent>;
  let form: NgForm;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDrivenComponent ],
      imports: [ FormsModule ],
      providers: [NgForm]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(TemplateDrivenComponent);
    component = fixture.componentInstance;
    const formElement = fixture.debugElement.query(By.css('form'));
    form = formElement.injector.get(NgForm);
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.hero).toBeTruthy();
    expect(component.powers).toBeTruthy();
  });

  // TODO use fakeAsync
  it('should submit with valid name', async () => {
    const name = 'Mr. Boos';
    fixture.componentInstance.hero.name = name;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.hero.name).toEqual(name);
    expect(form.submitted).toBeFalsy();

    const submit = compiled.querySelector('#submitBtn');
    submit.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(form.submitted).toBeTruthy();

    const message = compiled.querySelector('#newHero > p');
    const addBtn = compiled.querySelector('#newHero > button');
    expect(message.textContent).toEqual(`You've submitted your hero, ${name}!`);
    expect(addBtn).toBeDefined();
  });

  it('Name must be at least 4 characters long.', fakeAsync( () => {
    const name = fixture.debugElement.query(By.css('#name')).nativeElement;
    name.value = 'bob';
    name.dispatchEvent(new Event('input'));
    tick();

    expect(form.submitted).toBeFalsy();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const submit = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
      const reset = fixture.debugElement.query(By.css('#resetBtn')).nativeElement;
      expect(submit.disabled).toBeTruthy();
      expect(reset.disabled).toBeFalsy();

      const control = form.control.get('name');
      expect(control.hasError('minlength')).toBe(true);

      const lengthError = compiled.querySelector('#name-length-error');
      expect(lengthError.textContent).toEqual('Name must be at least 4 characters long.');
    });
  }));

  // TODO test custom validator
  xit('Name cannot be Bob', fakeAsync(() => {
    const name = fixture.debugElement.query(By.css('#name')).nativeElement;
    name.value = 'bob';
    name.dispatchEvent(new Event('input'));
    tick();

    expect(form.submitted).toBeFalsy();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const submit = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
      expect(submit.disabled).toBeTruthy();
      const control = form.control.get('name');
      expect(control.hasError('minlength')).toBeTruthy();
      expect(control.hasError('forbiddenName')).toBeTruthy(); // error
    });
  }));

  it('Name is required', fakeAsync(() => {
    const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    tick();

    expect(form.submitted).toBeFalsy();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const submit = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
      const reset = fixture.debugElement.query(By.css('#resetBtn')).nativeElement;
      expect(submit.disabled).toBeTruthy();
      expect(reset.disabled).toBeFalsy();

      const control = form.control.get('name');
      expect(control.hasError('required')).toBe(true);

      const error = fixture.debugElement.query(By.css('#name-required-error')).nativeElement;
      expect(error.textContent).toEqual('Name is required.');
    });
  }));

  it('should reset', fakeAsync(() => {
    const reset = fixture.debugElement.query(By.css('#resetBtn')).nativeElement;
    reset.dispatchEvent(new Event('click'));
    tick();

    expect(form.submitted).toBeFalsy();
    fixture.whenStable().then(() => {
      const submit = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
      expect(submit.disabled).toBeFalsy();
      expect(reset.disabled).toBeFalsy();

      const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;
      const alterEgoInput = fixture.debugElement.query(By.css('#alterEgo')).nativeElement;
      expect(nameInput.textContent).toEqual('');
      expect(alterEgoInput.textContent).toEqual('');

      // TODO add for dropdown
    });
  }));

  // TODO fix
  xit('Alter ego is already taken', fakeAsync( () => {
    const alterEgo = fixture.debugElement.query(By.css('#alterEgo')).nativeElement;
    alterEgo.value = 'Eric';
    alterEgo.dispatchEvent(new Event('blur'));
    tick();

    expect(form.submitted).toBeFalsy();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const submit = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
      const reset = fixture.debugElement.query(By.css('#resetBtn')).nativeElement;
      expect(submit.disabled).toBeFalsy();
      expect(reset.disabled).toBeFalsy();

      const control = form.control.get('alterEgo');
      expect(control.hasError('uniqueAlterEgo')).toBe(true);

      // const alterEgoError = compiled.querySelector('.alter-ego-errors > div');
      // expect(alterEgoError.textContent).toEqual('Alter ego is already taken.');
    });
  }));

  // TODO fix
  xit('Name cannot match alter ego.', fakeAsync(() => {
    const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;
    const alterEgoInput = fixture.debugElement.query(By.css('#alterEgo')).nativeElement;
    nameInput.value = 'Sofia';
    nameInput.dispatchEvent(new Event('input'));
    alterEgoInput.value = 'Sofia';
    alterEgoInput.dispatchEvent(new Event('input'));

    tick();

    expect(form.submitted).toBeFalsy();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const submit = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
      const reset = fixture.debugElement.query(By.css('#resetBtn')).nativeElement;
      expect(submit.disabled).toBeTruthy();
      expect(reset.disabled).toBeFalsy();
    });
  }));

  // TODO fix, issue: error will never happen
  xit('Power is required.', fakeAsync(() => {}));
});
