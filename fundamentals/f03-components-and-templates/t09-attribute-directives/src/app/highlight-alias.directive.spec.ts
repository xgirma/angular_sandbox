import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HighlightAliasDirective } from './highlight-alias.directive';
import { AppComponent } from './app.component';
import { HighlighterDirective } from './highlighter.directive';
import { HighlightMeDirective } from './highlight-me.directive';

describe('HighlightAliasDirective', () => {
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
    el = fixture.debugElement.queryAll(By.directive(HighlightAliasDirective));
  });

  it('should have one highlighter element', () => {
    expect(el.length).toEqual(5);
  });

  it('should have no background color', () => {
    const bgColorOne = el[0].nativeElement.style.backgroundColor;
    const bgColorTwo = el[0].nativeElement.style.backgroundColor;
    const bgColorThree = el[0].nativeElement.style.backgroundColor;
    const bgColoFour = el[0].nativeElement.style.backgroundColor;
    const bgColorFive = el[0].nativeElement.style.backgroundColor;
    expect(bgColorOne).toBe('');
    expect(bgColorTwo).toBe('');
    expect(bgColorThree).toBe('');
    expect(bgColoFour).toBe('');
    expect(bgColorFive).toBe('');
  });

  it('should have color on mouse-enter event', () => {
    el[0].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorOne = el[0].nativeElement.style.backgroundColor;
    expect(bgColorOne).toBe('cyan');

    el[1].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorTwo = el[1].nativeElement.style.backgroundColor;
    expect(bgColorTwo).toBe('blue');

    el[2].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorThree = el[2].nativeElement.style.backgroundColor;
    expect(bgColorThree).toBe('red');

    el[3].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorFour = el[3].nativeElement.style.backgroundColor;
    expect(bgColorFour).toBe('cyan');

    el[4].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorFive = el[4].nativeElement.style.backgroundColor;
    expect(bgColorFive).toBe('violet');
  });

  it('should change when color is selected', () => {
    const green = fixture.debugElement.query(By.css('#lightgreen'));
    green.triggerEventHandler('click', {});
    fixture.detectChanges();
    el[3].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorFour = el[3].nativeElement.style.backgroundColor;
    expect(bgColorFour).toBe('lightgreen');

    const yellow = fixture.debugElement.query(By.css('#yellow'));
    yellow.triggerEventHandler('click', {});
    fixture.detectChanges();
    el[3].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorFourNow = el[3].nativeElement.style.backgroundColor;
    expect(bgColorFourNow).toBe('yellow');

    const cyan = fixture.debugElement.query(By.css('#cyan'));
    cyan.triggerEventHandler('click', {});
    fixture.detectChanges();
    el[3].triggerEventHandler('mouseenter', {});
    fixture.detectChanges();

    const bgColorFourAfter = el[3].nativeElement.style.backgroundColor;
    expect(bgColorFourAfter).toBe('cyan');
  });
});
