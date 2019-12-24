import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HighlightMeDirective } from './highlight-me.directive';
import { AppComponent } from './app.component';
import { HighlighterDirective } from './highlighter.directive';
import { HighlightAliasDirective } from './highlight-alias.directive';

describe('HighlightMeDirective', () => {
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
    el = fixture.debugElement.queryAll(By.directive(HighlightMeDirective));
  });

  it('should have one highlight-me element', () => {
    expect(el.length).toEqual(3);
  });

  it('should have no background color', () => {
    const bgColorOne = el[0].nativeElement.style.backgroundColor;
    const bgColorTwo = el[0].nativeElement.style.backgroundColor;
    const bgColorThree = el[0].nativeElement.style.backgroundColor;
    expect(bgColorOne).toBe('');
    expect(bgColorTwo).toBe('');
    expect(bgColorThree).toBe('');
  });

  it('should have color on mouse-enter event', () => {
    el[0].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorOne = el[0].nativeElement.style.backgroundColor;
    expect(bgColorOne).toBe('yellow');

    el[1].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorTwo = el[1].nativeElement.style.backgroundColor;
    expect(bgColorTwo).toBe('orange');

    el[2].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorThree = el[2].nativeElement.style.backgroundColor;
    expect(bgColorThree).toBe('cyan');
  });
});
