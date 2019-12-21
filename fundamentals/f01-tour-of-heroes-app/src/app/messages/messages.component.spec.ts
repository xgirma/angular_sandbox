import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MessagesComponent } from './messages.component';
import { MessageService } from '../message.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let messageService: MessageService;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    messageService = TestBed.get(MessageService);
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  afterEach(() => {
    messageService.messages = [];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', async () => {
    messageService.messages.push('HeroService: fetched heroes');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('h2').textContent).toEqual('Messages');
  });

  it('should have a message', async () => {
    messageService.messages.push('HeroService: fetched heroes');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('.msg').textContent)
      .toEqual('HeroService: fetched heroes');
  });

  it('should clear message', async () => {
    messageService.messages.push('HeroService: fetched heroes');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('.msg').textContent)
      .toEqual('HeroService: fetched heroes');

    const clear = fixture.debugElement.query(By.css('button'));
    clear.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(messageService.messages).toEqual([]);
    expect(compiled.querySelector('h2')).toBeNull();
    expect(compiled.querySelector('button')).toBeNull();
    expect(compiled.querySelector('.msg')).toBeNull();
  });
});
