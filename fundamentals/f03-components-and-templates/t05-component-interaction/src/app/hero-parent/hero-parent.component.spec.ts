import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeroParentComponent } from './hero-parent.component';
import { HeroChildComponent } from '../hero-child/hero-child.component';

describe('HeroParentComponent', () => {
  let component: HeroParentComponent;
  let fixture: ComponentFixture<HeroParentComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroParentComponent, HeroChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroParentComponent);
    component = fixture.componentInstance;
    component.heroes = ['Foo', 'bar'];
    component.master = 'King';
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have hero-child app', () => {
    expect(compiled.querySelector('app-hero-child')).toBeDefined();
    const heroes = fixture.debugElement.queryAll(By.css('app-hero-child'));
    expect(heroes.length).toEqual(2);
  });

  it('should render', () => {
    expect(compiled.querySelector('h3').textContent)
      .toEqual(`King controls 2 heroes`);
  });
});
