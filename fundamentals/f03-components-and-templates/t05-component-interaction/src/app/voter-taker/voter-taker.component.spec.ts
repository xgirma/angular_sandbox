import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterTakerComponent } from './voter-taker.component';
import { VoterComponent } from '../voter/voter.component';

describe('VoterTakerComponent', () => {
  let component: VoterTakerComponent;
  let fixture: ComponentFixture<VoterTakerComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterTakerComponent, VoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have voter app', () => {
    expect(compiled.querySelector('app-voter')).toBeDefined();
  });

  it('should have vote', () => {
    expect(compiled.querySelector('h4').textContent)
      .toEqual('Agree: 0, Disagree: 0');
  });
});
