import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileEditorFormBuilderComponent } from './profile-editor-form-builder.component';

const formValueExpected = { firstName: 'Foo', lastName: 'Bar',
  address: { street: '123 Durham Bulls', city: 'Durham', state: 'NC', zip: '27707' } };
const patchValueExpected = { firstName: 'Nancy', lastName: '',
  address: { street: '123 Drew Street', city: '', state: '', zip: '' } };
const mixed = { firstName: 'Nancy', lastName: 'Bar',
  address: { street: '123 Drew Street', city: 'Durham', state: 'NC', zip: '27707' } };

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

