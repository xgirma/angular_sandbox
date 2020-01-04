import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileEditorFormBuilderComponent } from './profile-editor-form-builder.component';
import { By } from '@angular/platform-browser';

const formValueExpected = { firstName: 'Foo', lastName: 'Bar',
  address: { street: '123 Durham Bulls', city: 'Durham', state: 'NC', zip: '27707' } };
const patchValueExpected = { firstName: 'Nancy', lastName: '',
  address: { street: '123 Drew Street', city: '', state: '', zip: '' } };
const mixed = { firstName: 'Nancy', lastName: 'Bar',
  address: { street: '123 Drew Street', city: 'Durham', state: 'NC', zip: '27707' } };
const expectedAliases = { firstName: 'Nancy', lastName: '',
  address: { street: '123 Drew Street', city: '', state: '', zip: '' },
  aliases: [ 'Tom', 'Bob' ] };

describe('ProfileEditorFormBuilderComponent', () => {
  let component: ProfileEditorFormBuilderComponent;
  let fixture: ComponentFixture<ProfileEditorFormBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditorFormBuilderComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditorFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit profile',  async () => {
    await commonTest(fixture);

    const value = fixture.nativeElement.querySelector('#formValue > span');
    const formValue = JSON.parse(value.textContent);
    expect(formValue).toEqual(jasmine.objectContaining(formValueExpected));
  });

  it('should update partial form value', async () => {
    const updateButton = fixture.nativeElement.querySelector('#updateProfile > button');
    updateButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    await fixture.whenStable();

    const value = fixture.nativeElement.querySelector('#formValue > span');
    const formValue = JSON.parse(value.textContent);
    expect(formValue).toEqual(jasmine.objectContaining(patchValueExpected));
  });

  it('should only update required fields', async () => {
    await commonTest(fixture);

    const value = fixture.nativeElement.querySelector('#formValue > span');
    const formValue = JSON.parse(value.textContent);
    expect(formValue).toEqual(jasmine.objectContaining(formValueExpected));

    const updateButton = fixture.nativeElement.querySelector('#updateProfile > button');
    updateButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    await fixture.whenStable();

    const valueAfterUpdate = fixture.nativeElement.querySelector('#formValue > span');
    const formValueAfterUpdate = JSON.parse(valueAfterUpdate.textContent);
    expect(formValueAfterUpdate).toEqual(jasmine.objectContaining(mixed));
  });

  it('first-name is required', async () => {
    const submitButton = fixture.nativeElement.querySelector('form > button');
    expect(submitButton.disabled).toBeTruthy();
    const formStatus = fixture.nativeElement.querySelector('#formStatus > p');
    expect(formStatus.textContent).toContain('INVALID');

    const firstName = fixture.nativeElement.querySelector('#firstName > input');
    firstName.value = 'Foo';
    firstName.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    const submitButtonAfter = fixture.nativeElement.querySelector('form > button');
    expect(submitButtonAfter.disabled).toBeFalsy();
    const formStatusAfter = fixture.nativeElement.querySelector('#formStatus > p');
    expect(formStatusAfter.textContent).toContain('VALID');
  });

  it('should add alias', async () => {
    const updateButton = fixture.nativeElement.querySelector('#updateProfile > button');
    updateButton.dispatchEvent(new Event('click'));
    const addAliasButton = fixture.nativeElement.querySelector('#alias > button');
    addAliasButton.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    await fixture.whenStable();

    const aliases = fixture.debugElement.queryAll(By.css('#alias > div > label > input'));
    expect(aliases.length).toEqual(2);
    const a = aliases[0].nativeElement;
    const b = aliases[1].nativeElement;
    a.value = 'Tom';
    a.dispatchEvent(new Event('input'));
    b.value = 'Bob';
    b.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    const value = fixture.nativeElement.querySelector('#formValue > span');
    const formValue = JSON.parse(value.textContent);
    expect(formValue).toEqual(jasmine.objectContaining(expectedAliases));
  });
});

async function commonTest(fixture) {
  const firstName = fixture.nativeElement.querySelector('#firstName > input');
  firstName.value = 'Foo';
  firstName.dispatchEvent(new Event('input'));

  const lastName = fixture.nativeElement.querySelector('#lastName > input');
  lastName.value = 'Bar';
  lastName.dispatchEvent(new Event('input'));

  const street = fixture.nativeElement.querySelector('#street > input');
  street.value = '123 Durham Bulls';
  street.dispatchEvent(new Event('input'));

  const city = fixture.nativeElement.querySelector('#city > input');
  city.value = 'Durham';
  city.dispatchEvent(new Event('input'));

  const state = fixture.nativeElement.querySelector('#state > input');
  state.value = 'NC';
  state.dispatchEvent(new Event('input'));

  const zip = fixture.nativeElement.querySelector('#zip > input');
  zip.value = '27707';
  zip.dispatchEvent(new Event('input'));

  fixture.detectChanges();
  await fixture.whenStable();
}

