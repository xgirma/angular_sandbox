# Testing 

## TODO

## Component Testing Basics

### Testing component class 

```javascript
@Component({
  selector: 'lightswitch-comp',
  template: `
    <button (click)="clicked()">Click me!</button>
    <span>{{message}}</span>`
})
export class LightswitchComponent {
  isOn = false;
  clicked() { this.isOn = !this.isOn; }
  get message() { return `The light is ${this.isOn ? 'On' : 'Off'}`; }
}

```

```javascript
describe('LightSwitchComp', () => {
  it('#clicked() should set #message to "is on"', () => {
    const component = new LightswitchComponent();
    expect(component.message).toMatch(/is off/i, 'off at first');
    component.clicked();
    expect(component.message).toMatch(/is on/i, 'on after clicked');
  });
});

```

Testing component with @Input and @Output

```javascript
export class DashboardHeroComponent {
  @Input() hero: Hero;
  @Output() selected = new EventEmitter<Hero>();
  click() { this.selected.emit(this.hero); }
}

```

```javascript
it('raises the selected event when clicked', () => {
  const comp = new DashboardHeroComponent();
  const hero: Hero = { id: 42, name: 'Test' };
  comp.hero = hero;

  comp.selected.subscribe((selectedHero: Hero) => expect(selectedHero).toBe(hero));
  comp.click();
});

```

Component with dependencies require `Testbed` to create both the component and its dependencies. 

```javascript
export class WelcomeComponent  implements OnInit {
  welcome: string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.welcome = this.userService.isLoggedIn ?
      'Welcome, ' + this.userService.user.name : 'Please log in.';
  }
}

```

```javascript
import {TestBed} from "@angular/core/testing";
import {WelcomeComponent} from "./welcome.component";
import {UserService} from "../model";

class MockUserService {
  isLoggedIn = true;
  user = { name: 'Test User' };
}

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WelcomeComponent,
        {provide: UserService, useClass: MockUserService}
      ]
    });

    component = TestBed.get(WelcomeComponent);
    userService = TestBed.get(UserService);
  });

  it('should not have welcome message after construction', () => {
    expect(component.welcome).toBeUndefined();
  });

  it('should welcome logged in user after Angular calls ngOnInit', () => {
    component.ngOnInit();
    expect(component.welcome).toContain(userService.user.name);
  });

  it('should ask user to log in if not logged in after ngOnInit', () => {
    userService.isLoggedIn = false;
    component.ngOnInit();
    expect(component.welcome).not.toContain(userService.user.name);
    expect(component.welcome).toContain('Please log in');
  });
});

```

### Testing component template (DOM)

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: '<h1>{{title}}</h1>',
  styles: ['h1 { color: green; font-size: 350%}']
})
export class BannerComponent {
  title = 'Test Tour of Heroes';
}

```

```javascript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from "./banner.component";
import { DebugElement } from "@angular/core";
import {By} from "@angular/platform-browser";

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

```

### Component Test Scenarios

#### Component binding
```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: '<h1>{{title}}</h1>',
  styles: ['h1 { color: green; font-size: 350%}']
})
export class BannerComponent {
  title = 'Test Tour of Heroes';
}

```

```javascript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from "./banner.component";

describe('BannerComponent (binding)', () => {
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

```

Automatic change detection

The BannerComponent tests frequently call detectChanges. Some testers prefer that the Angular test environment run change detection automatically.

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  template: '<h1>{{title}}</h1>',
  styles: ['h1 { color: green; font-size: 350%}']
})
export class BannerComponent {
  title = 'Test Tour of Heroes';
}

```

```javascript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from "./banner.component";
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

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

```

#### Change an input value with dispatchEvent()

TODO 

WARN: 'Spec 'DashboardHeroComponent raises the selected event when clicked' has no expectations.'
 
