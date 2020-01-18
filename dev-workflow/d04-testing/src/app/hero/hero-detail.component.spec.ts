import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { FormsModule } from "@angular/forms";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { HeroDetailService } from './hero-detail.service';
import { HeroService } from '../model';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [HeroDetailService, HeroService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should convert hero name to Title case', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('input');
    const nameElement: HTMLElement = hostElement.querySelector('span');

    // simulate user entering a name
    nameInput.value = 'quick BROWN fOx';

    // dispatch a DOME event so that Angular learns of input value change
    nameInput.dispatchEvent(new Event('input'));

    // tell Angular to update the display
    fixture.detectChanges();

    expect(nameElement.textContent).toBe('Quick Brown Fox');
  });
});
