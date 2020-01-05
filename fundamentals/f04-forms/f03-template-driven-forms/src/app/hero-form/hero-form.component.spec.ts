import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HeroFormComponent } from './hero-form.component';
import {By} from '@angular/platform-browser';

const expectedDiagnostics = {id: 18, name: 'Foo', power: 'Really Smart', alterEgo: 'Chuck Overstreet'};

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroFormComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have power list', () => {
    expect(component.powers.length).toEqual(4);
  });

  it('should set default value', async () => {
    await fixture.whenStable();

    const diagnosticModel = JSON.parse(component.diagnostic);
    expect(diagnosticModel).toEqual(jasmine.objectContaining(expectedDiagnostics));

    const diagnosticsView = JSON.parse(compiled.querySelector('#diagnostic').textContent);
    expect(diagnosticsView).toEqual(jasmine.objectContaining(expectedDiagnostics));

    const name = fixture.debugElement.query(By.css('#name'));
    const alterEgo = fixture.debugElement.query(By.css('#alterEgo'));
    const power = fixture.debugElement.query(By.css('#power'));

    expect((name.nativeElement).value).toEqual(expectedDiagnostics.name);
    expect((alterEgo.nativeElement).value).toEqual(expectedDiagnostics.alterEgo);
    expect((power.nativeElement).value).toEqual(expectedDiagnostics.power);
  });

  it('should have submitted false', () => {
    expect(component.submitted).toBeFalsy();
  });

  // TODO fix
  xit('should update name', async () => {
    const name = fixture.debugElement.query(By.css('input[name="name"]'));
    const nameInput = name.nativeElement;
    nameInput.value = 'Bar';
    nameInput.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      const c = fixture.componentInstance;
      fixture.detectChanges();
      expect(JSON.stringify(fixture.componentInstance.model)).toEqual(jasmine.objectContaining(expectedDiagnostics));
      expect(c.diagnostic).toEqual(jasmine.objectContaining(expectedDiagnostics));
    });
  });

  // TODO fix
  xit('should update name', fakeAsync( () => {
    const name = fixture.nativeElement.querySelector('#un > input');
    name.value = 'Bar';
    name.dispatchEvent(new Event('input'));
    tick();
    const d = fixture.debugElement.query(By.css('#diagnostic'));
    fixture.detectChanges();
    expect(JSON.stringify(fixture.componentInstance.model)).toEqual(jasmine.objectContaining(expectedDiagnostics));
  }));
});
