import {TestBed, async, ComponentFixture} from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HeroChildComponent } from './hero-child/hero-child.component';
import { HeroParentComponent } from './hero-parent/hero-parent.component';
import { NameParentComponent } from './name-parent/name-parent.component';
import { NameChildComponent } from './name-child/name-child.component';
import { VersionParentComponent } from './version-parent/version-parent.component';
import { VersionChildComponent } from './version-child/version-child.component';
import { VoterTakerComponent } from './voter-taker/voter-taker.component';
import { VoterComponent } from './voter/voter.component';

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
        NameChildComponent,
        VersionParentComponent,
        VersionChildComponent,
        VoterTakerComponent,
        VoterComponent
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

  it('should have version parent app', () => {
    expect(compiled.querySelector('app-version-parent')).toBeDefined();
  });

  it('should have voter taker app', () => {
    expect(compiled.querySelector('app-voter-taker')).toBeDefined();
  });
});
