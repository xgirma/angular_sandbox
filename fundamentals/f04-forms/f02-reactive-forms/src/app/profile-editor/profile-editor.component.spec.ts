import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileEditorComponent } from './profile-editor.component';

const formValueExpected = { firstName: 'Foo', lastName: 'Bar' };

describe('ProfileEditorComponent', () => {
  let component: ProfileEditorComponent;
  let fixture: ComponentFixture<ProfileEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditorComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit profile', async () => {
    const firstName = fixture.nativeElement.querySelector('#firstName > input');
    firstName.value = 'Foo';
    firstName.dispatchEvent(new Event('input'));

    const lastName = fixture.nativeElement.querySelector('#lastName > input');
    lastName.value = 'Bar';
    lastName.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    const value = fixture.nativeElement.querySelector('#formValue > span');
    const formValue = JSON.parse(value.textContent);
    expect(formValue).toEqual(jasmine.objectContaining(formValueExpected));

  });
});
