import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    component.name = 'Foo';
    component.didVote = false;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should agree', () => {
    const agree = compiled.querySelector('#agree');
    const disagree = compiled.querySelector('#disagree');
    expect(agree.disabled).toBeFalsy();
    expect(disagree.disabled).toBeFalsy();

    spyOn(component, 'vote').and.callThrough();
    agree.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(agree.disabled).toBeTruthy();
    expect(disagree.disabled).toBeTruthy();
    expect(component.vote).toHaveBeenCalledTimes(1);
  });

  it('should disagree', () => {
    const agree = compiled.querySelector('#agree');
    const disagree = compiled.querySelector('#disagree');
    expect(agree.disabled).toBeFalsy();
    expect(disagree.disabled).toBeFalsy();

    spyOn(component, 'vote').and.callThrough();
    disagree.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(agree.disabled).toBeTruthy();
    expect(disagree.disabled).toBeTruthy();
    expect(component.vote).toHaveBeenCalledTimes(1);
  });
});
