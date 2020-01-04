import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { NameEditorComponent } from './name-editor.component';

describe('NameEditorComponent', () => {
  let component: NameEditorComponent;
  let fixture: ComponentFixture<NameEditorComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameEditorComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should input/update name', async () => {
    const inputBox = fixture.nativeElement.querySelector('input');
    inputBox.value = 'Foo';
    inputBox.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();
    const value = fixture.nativeElement.querySelector('#getName');

    expect(fixture.componentInstance.name.value).toEqual('Foo');
    expect(inputBox.value).toBe('Foo');
    expect(value.textContent).toContain('Foo');

    const button = fixture.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    await fixture.whenStable();
    const valueAfterUpdate = fixture.nativeElement.querySelector('#getName');
    expect(valueAfterUpdate.textContent).toContain('Nancy');
  });
});
