import {TestBed, async, ComponentFixture} from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HeroChildComponent } from './hero-child/hero-child.component';
import { HeroParentComponent } from './hero-parent/hero-parent.component';
import { NameParentComponent } from './name-parent/name-parent.component';
import { NameChildComponent } from './name-child/name-child.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeroChildComponent,
        HeroParentComponent,
        NameParentComponent,
        NameChildComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have parent app', () => {
    expect(compiled.querySelector('app-hero-parent')).toBeDefined();
  });

  it('should have name parent app', () => {
    expect(compiled.querySelector('app-name-parent')).toBeDefined();
  });
});
