import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroChildComponent } from './hero-child.component';

describe('HeroChildComponent', () => {
  let component: HeroChildComponent;
  let fixture: ComponentFixture<HeroChildComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroChildComponent);
    component = fixture.componentInstance;
    component.hero = 'Foo';
    component.masterName = 'King';
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(compiled.querySelector('h3').textContent).toEqual('Foo says:');
  });

  it('should have message', () => {
    expect(compiled.querySelector('p').textContent).toEqual('I, Foo, I am at your service, King');
  });
});
