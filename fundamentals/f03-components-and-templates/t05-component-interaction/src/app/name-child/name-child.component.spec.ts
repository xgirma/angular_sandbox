import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameChildComponent } from './name-child.component';

describe('NameChildComponent', () => {
  let component: NameChildComponent;
  let fixture: ComponentFixture<NameChildComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameChildComponent);
    component = fixture.componentInstance;
    component.name = 'Foo';
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display name', () => {
    expect(compiled.querySelector('p').textContent).toEqual('Foo');
  });

  it('should display message when no name', () => {
    component.name = '';
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent).toEqual('<no name set>');
  });
});
