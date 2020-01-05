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

  beforeEach(() => {
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

  it('should have name length > 4 character', async () => {
    fixture.componentInstance.hero.name = 'Foo';
    fixture.detectChanges();

    expect(form.submitted).toBeFalsy();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const submit = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
      expect(submit.disabled).toBeTruthy();

      const control = form.control.get('name');
      expect(control.hasError('minlength')).toBe(true);
    });
  });

  it('should have name', async () => {
    fixture.componentInstance.hero.name = '';
    fixture.detectChanges();

    expect(form.submitted).toBeFalsy();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const submit = fixture.debugElement.query(By.css('#submitBtn')).nativeElement;
      expect(submit.disabled).toBeTruthy();

      const control = form.control.get('name');
      expect(control.hasError('required')).toBe(true);
    });
  });

  // TODO
  xit('should reset', () => {});
});
