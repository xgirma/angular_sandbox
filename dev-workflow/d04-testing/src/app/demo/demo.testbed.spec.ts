// Testing services with the TestBed

import {MasterService, ValueService} from './demo';
import {TestBed} from "@angular/core/testing";

describe('ValueService with TestBed', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.get(ValueService);
  });

  it('#getValue should return real value', () => {
    expect(service.getValue()).toBe('real value');
    service.setValue('new value');
    expect(service.getValue()).toBe('new value');
  });
});

describe('MasterService with TestBed', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }
      ]
    });
    masterService = TestBed.get(MasterService);
    valueServiceSpy = TestBed.get(ValueService);
  });

  it('#getValue sould return stubbed value from a spy', () => {
    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);

    expect(masterService.getValue()).toBe(stubValue, 'service returned stub value');
    expect(valueServiceSpy.getValue.calls.count()).toBe(1, 'spy method was called once');
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
  });
});
