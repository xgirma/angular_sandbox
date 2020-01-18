import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from "./banner.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('BannerComponent (default)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});

describe('BannerComponent (minimal)', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      declarations: [BannerComponent]
    });

    const fixture = TestBed.createComponent(BannerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});

describe('BannerComponent (more tests)', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  // fixture.nativeElement
  it('should contain "Test Tour of Heroes', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('Test Tour of Heroes');
  });

  // fixture.nativeElement -> query
  it('should contain "Test Tour of Heroes', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const title = bannerElement.querySelector('h1');
    expect(title.textContent).toContain('Test Tour of Heroes');
  });

  // fixture.debugElement.nativeElement -> query
  it('should contain "Test Tour of Heroes', () => {
    const bannerDebug: DebugElement = fixture.debugElement;
    const bannerElement: HTMLElement = bannerDebug.nativeElement;
    const header = bannerElement.querySelector('h1');
    expect(header.textContent).toContain('Test Tour of Heroes');
  });

  // fixture.debugElement -> query By css
  it('should contain "Test Tour of Heroes', () => {
    const bannerDebug: DebugElement = fixture.debugElement;
    const headerDebug = bannerDebug.query(By.css('h1'));
    const header: HTMLElement = headerDebug.nativeElement;
    expect(header.textContent).toContain('Test Tour of Heroes');
  });
});
