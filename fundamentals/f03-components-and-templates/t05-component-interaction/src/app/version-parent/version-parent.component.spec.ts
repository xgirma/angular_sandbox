import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionParentComponent } from './version-parent.component';
import { VersionChildComponent } from '../version-child/version-child.component';

describe('VersionParentComponent', () => {
  let component: VersionParentComponent;
  let fixture: ComponentFixture<VersionParentComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionParentComponent, VersionChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have version child app', () => {
    expect(compiled.querySelector('app-version-child')).toBeDefined();
  });

  it('should increase minor version', () => {
    const minor = component.minor;
    spyOn(component, 'newMinor').and.callThrough();
    const button = compiled.querySelector('#minor');

    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.minor).toBeGreaterThan(minor);
    expect(component.newMinor).toHaveBeenCalledTimes(1);
  });

  it('should increase major version', () => {
    const major = component.major;
    spyOn(component, 'newMajor').and.callThrough();
    const button = compiled.querySelector('#major');

    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.major).toBeGreaterThan(major);
    expect(component.minor).toEqual(0);
    expect(component.newMajor).toHaveBeenCalledTimes(1);
  });
});
