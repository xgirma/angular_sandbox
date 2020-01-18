import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from "./banner.component";
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('BannerComponent (manual detectChanges)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let header: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    header = fixture.nativeElement.querySelector('h1');
  });

  it('no title in the DOM after createComponent()', () => {
    expect(header.textContent).not.toContain(component.title);
    expect(header.textContent).toBe('');
  });

  it('should display original title after detectChanges()', () => {
    fixture.detectChanges();
    expect(header.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'test title';
    fixture.detectChanges();
    expect(header.textContent).toContain('test title');
  });
});

// ComponentFixtureAutoDetect
describe('BannerComponent (auto detectChanges)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let header: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      providers: [ { provide: ComponentFixtureAutoDetect, useValue: true } ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    header = fixture.nativeElement.querySelector('h1');
  });

  it('should display original title', () => {
    expect(header.textContent).toContain(component.title);
  });

  it('should still see original title after component.title changed', () => {
    const oldTitle = component.title;
    component.title = 'test title';
    expect(header.textContent).toContain(oldTitle);
    expect(header.textContent).not.toContain(component.title);
  });

  it('should display updated title after hard detectChanges', () => {
    const oldTitle = component.title;
    component.title = 'test title';
    fixture.detectChanges();
    expect(header.textContent).not.toContain(oldTitle);
    expect(header.textContent).toContain(component.title);
  });
});
