import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NameParentComponent } from './name-parent.component';
import { NameChildComponent } from '../name-child/name-child.component';

describe('NameParentComponent', () => {
  let component: NameParentComponent;
  let fixture: ComponentFixture<NameParentComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameParentComponent, NameChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameParentComponent);
    component = fixture.componentInstance;
    component.names = ['Foo', 'Bar'];
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name-child app', () => {
    expect(compiled.querySelector('app-name-child')).toBeDefined();
    const names = fixture.debugElement.queryAll(By.css('app-name-child'));
    expect(names.length).toEqual(2);
  });

  it('should have title', () => {
    expect(compiled.querySelector('h3').textContent)
      .toEqual('Master controls 2 names');
  });
});
