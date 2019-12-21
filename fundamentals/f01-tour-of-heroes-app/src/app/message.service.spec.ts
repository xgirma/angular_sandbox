import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let messageService: MessageService;

  beforeEach(() => {
      TestBed.configureTestingModule({});
      messageService = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(messageService).toBeTruthy();
  });

  it('should add message', () => {
    messageService.add('Message 1');
    messageService.add('Message 2');
    expect(messageService.messages.length).toEqual(2);
    expect(messageService.messages[0]).toEqual('Message 1');
    expect(messageService.messages[1]).toEqual('Message 2');
  });

  it('should clear message', () => {
    messageService.add('Message 3');
    messageService.clear();
    expect(messageService.messages.length).toEqual(0);
  });
});
