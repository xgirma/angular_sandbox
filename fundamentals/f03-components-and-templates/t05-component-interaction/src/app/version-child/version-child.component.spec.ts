import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VersionChildComponent } from './version-child.component';

describe('VersionChildComponent', () => {
  let component: VersionChildComponent;
  let fixture: ComponentFixture<VersionChildComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionChildComponent);
    component = fixture.componentInstance;
    component.major = 10;
    component.minor = 5;
    component.changeLog = ['init', 'add test'];
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show version info', () => {
    spyOn(component, 'ngOnChanges').and.callThrough();
    expect(compiled.querySelector('h3').textContent).toEqual('Version 10.5');
    expect(compiled.querySelector('h4').textContent).toEqual('Change log:');
    const changes = fixture.debugElement.queryAll(By.css('li'));
    expect(changes.length).toEqual(2);
  });
});
