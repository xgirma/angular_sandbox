import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HighlightDirective } from './highlight.directive';
import { AppComponent } from './app.component';
import { HighlightMeDirective } from './highlight-me.directive';
import { HighlightAliasDirective } from './highlight-alias.directive';

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        HighlightDirective,
        HighlightMeDirective,
        AppComponent,
        HighlightAliasDirective ]
    }).createComponent(AppComponent);
    fixture.detectChanges();
    el = fixture.debugElement.queryAll(By.directive(HighlightDirective));
  });

  it('should have one highlight element', () => {
    expect(el.length).toEqual(1);
  });

  it('should color background "skyblue"', () => {
    const bgColor = el[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('skyblue');
  });
});
