import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HighlighterDirective } from './highlighter.directive';
import { AppComponent } from './app.component';
import { HighlightMeDirective } from './highlight-me.directive';
import { HighlightAliasDirective } from './highlight-alias.directive';

describe('HighlighterDirective', () => {
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        HighlighterDirective,
        HighlightMeDirective,
        AppComponent,
        HighlightAliasDirective ]
    }).createComponent(AppComponent);
    fixture.detectChanges();
    el = fixture.debugElement.queryAll(By.directive(HighlighterDirective));
  });

  it('should have one highlighter element', () => {
    expect(el.length).toEqual(1);
  });

  it('should have no background color', () => {
    const bgColor = el[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('');
  });

  it('should have yellow on mouse-enter event', () => {
    el[0].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColor = el[0].nativeElement.style.backgroundColor;
    expect(bgColor).toBe('yellow');
  });
});
