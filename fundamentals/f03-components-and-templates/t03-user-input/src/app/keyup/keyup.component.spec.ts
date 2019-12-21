import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyupComponent } from './keyup.component';

describe('KeyupComponent', () => {
  let component: KeyupComponent;
  let fixture: ComponentFixture<KeyupComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get input from $event object', async () => {
    spyOn(component, 'onKey').and.callThrough();
    const inputBox = compiled.querySelector('#one > input');
    inputBox.value = 'Foo';
    inputBox.dispatchEvent(new Event('keyup'));
    inputBox.value = 'Bar';
    inputBox.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.onKey).toHaveBeenCalledTimes(2);
    // expect(component.onKey).toHaveBeenCalledWith(); // TODO
    expect(compiled.querySelector('#one > p').textContent).toEqual('Foo | Bar | ');
  });

  it('should get input from typed $event object', async () => {
    spyOn(component, 'onKeyWithEventType').and.callThrough();
    const inputBox = compiled.querySelector('#two > input');
    inputBox.value = 'Bar';
    inputBox.dispatchEvent(new Event('keyup'));
    inputBox.value = 'Foo';
    inputBox.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.onKeyWithEventType).toHaveBeenCalledTimes(2);
    // expect(component.onKeyWithEventType).toHaveBeenCalledWith(); // TODO
    expect(compiled.querySelector('#two > p').textContent).toEqual('Bar | Foo | ');
  });

  it('should get input from template reference variable', async () => {
    spyOn(component, 'onKeyWithRefVariable').and.callThrough();
    const inputBox = compiled.querySelector('#three > input');
    inputBox.value = 'Bob';
    inputBox.dispatchEvent(new Event('keyup'));
    inputBox.value = 'Pop';
    inputBox.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.onKeyWithRefVariable).toHaveBeenCalledTimes(2);
    // expect(component.onKeyWithRefVariable).toHaveBeenCalledWith('Bob' , 'Pop'); // TODO
    expect(compiled.querySelector('#three > p').textContent).toEqual('Bob | Pop | ');
  });

  it('should get input with key event filtering', async () => {
    const event = new KeyboardEvent('keyup', {key: 'Enter'});
    spyOn(component, 'onEnter').and.callThrough();
    const inputBox = compiled.querySelector('#four > input');
    inputBox.value = 'Bob';
    inputBox.dispatchEvent(event);

    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.onEnter).toHaveBeenCalledTimes(1);
    expect(component.onEnter).toHaveBeenCalledWith('Bob');
    expect(compiled.querySelector('#four > p').textContent).toEqual('Bob');
  });

  it('should get input with key event filtering and blur', () => {
    // TODO
  });
});
