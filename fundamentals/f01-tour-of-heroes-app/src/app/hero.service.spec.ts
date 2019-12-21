import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let heroService: HeroService;
  let messageService: MessageService;
  let httpMock: HttpTestingController;
  const invalidRequestBody = 'Invalid request parameters';
  const invalidRequestOptions = { status: 404, statusText:  'Bad Request' };
  const errorMessage = 'failed: Http failure response for api/heroes: 404 Bad Request';

  const mockHeroes: Hero[] = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ HeroService, MessageService ]
    });
    heroService = TestBed.get(HeroService);
    messageService = TestBed.get(MessageService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it(`should get heroes`, () => {
    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn(messageService, 'add').and.callThrough();

    heroService.getHeroes().subscribe( (heroes: Hero[]) => {
      expect(heroes.length).toEqual(3);
      expect(heroes[0].id).toEqual(11);
      expect(heroes[0].name).toEqual(`Dr Nice`);
    });

    const request = httpMock.expectOne( `api/heroes`, 'call to getHeroes');
    expect(request.request.method).toBe('GET');
    request.flush(mockHeroes);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('getHeroes', [  ]);
    expect(logSpy).toHaveBeenCalledWith('fetched heroes');
    expect(addSpy).toHaveBeenCalledWith('HeroService: fetched heroes');
  });

  it('should handle error: getHeroes', () => {
    const expectedLog = `getHeroes ${errorMessage}`;
    const expectedMessage = `HeroService: getHeroes ${errorMessage}`;

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn(messageService, 'add').and.callThrough();

    heroService.getHeroes().subscribe( (heroes: Hero[]) => {
      expect(heroes.length).toEqual(0);
    });

    const request = httpMock.expectOne( `api/heroes`, 'call to getHeroes');
    expect(request.request.method).toBe('GET');
    request.flush(invalidRequestBody, invalidRequestOptions);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('getHeroes', [ ]);
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it(`should get hero`, () => {
    const expectedLog = 'fetched hero id=11';
    const expectedMessage = 'HeroService: fetched hero id=11';

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn(messageService, 'add').and.callThrough();

    heroService.getHero(11).subscribe(hero => {
      expect(hero.id).toEqual(11);
      expect(hero.name).toEqual(`Dr Nice`);
    });

    const request = httpMock.expectOne( `api/heroes/11`, 'call to getHero');
    expect(request.request.method).toBe('GET');
    request.flush(mockHeroes[0]);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('getHero id=11');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should handle error: getHero', () => {
    const errorMsg = 'failed: Http failure response for api/heroes/13: 404 Bad Request';
    const expectedLog = `getHero id=13 ${errorMsg}`;
    const expectedMessage = `HeroService: getHero id=13 ${errorMsg}`;

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn(messageService, 'add').and.callThrough();

    heroService.getHero(13).subscribe( response => {
      expect(response).toBeUndefined();
    });

    const request = httpMock.expectOne( `api/heroes/13`, 'call to getHero');
    expect(request.request.method).toBe('GET');
    request.flush(invalidRequestBody, invalidRequestOptions);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('getHero id=13');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should update hero', () => {
    const expectedLog = 'updated hero id=12';
    const expectedMessage = 'HeroService: updated hero id=12';

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn(messageService, 'add').and.callThrough();

    heroService.updateHero(mockHeroes[1]).subscribe( response => {
      expect(response).toEqual(mockHeroes[1]);
    });

    const request = httpMock.expectOne('api/heroes', 'call to updateHero');
    expect(request.request.method).toEqual('PUT');
    request.flush(mockHeroes[1]);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('updateHero');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should handle error: updateHero', () => {
    const expectedLog = `updateHero ${errorMessage}`;
    const expectedMessage = `HeroService: updateHero ${errorMessage}`;

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn(messageService, 'add').and.callThrough();

    heroService.updateHero(mockHeroes[1]).subscribe( response => {
      expect(response).toBeUndefined();
    });

    const request = httpMock.expectOne('api/heroes', 'call to updateHero');
    expect(request.request.method).toEqual('PUT');
    request.flush(invalidRequestBody, invalidRequestOptions);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('updateHero');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should add a hero', () => {
    const expectedLog = 'added hero w/id=13';
    const expectedMessage = 'HeroService: added hero w/id=13';

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn(messageService, 'add').and.callThrough();

    heroService.addHero(mockHeroes[2]).subscribe(response => {
      expect(response).toEqual(mockHeroes[2]);
    });

    const request = httpMock.expectOne('api/heroes', `call to addHero`);
    expect(request.request.method).toEqual('POST');
    request.flush(mockHeroes[2]);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('addHero');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should handle error: addHero', () => {
    const expectedLog = `addHero ${errorMessage}`;
    const expectedMessage = `HeroService: addHero ${errorMessage}`;

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn(messageService, 'add').and.callThrough();

    heroService.addHero(mockHeroes[2]).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const request = httpMock.expectOne('api/heroes', `call to addHero`);
    expect(request.request.method).toEqual('POST');
    request.flush(invalidRequestBody, invalidRequestOptions);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('addHero');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should delete hero', () => {
    const hero = { id: 100, name: 'Matt' };
    const expectedLog = `deleted hero id=100`;
    const expectedMessage = `HeroService: deleted hero id=100`;

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn<any>(messageService, 'add').and.callThrough();

    heroService.deleteHero(hero).subscribe( response => {
      expect(response).toEqual(hero);
    });

    const request = httpMock.expectOne('api/heroes/100', `call to deleteHero`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(hero);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('deleteHero');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should handle error', () => {
    const hero = { id: 100, name: 'Matt' };
    const expectedLog = `deleteHero failed: Http failure response for api/heroes/100: 404 Bad Request`;
    const expectedMessage = `HeroService: deleteHero failed: Http failure response for api/heroes/100: 404 Bad Request`;

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn<any>(messageService, 'add').and.callThrough();

    heroService.deleteHero(hero).subscribe( response => {
      expect(response).toBeUndefined();
    });

    const request = httpMock.expectOne('api/heroes/100', `call to deleteHero`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(invalidRequestBody, invalidRequestOptions);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('deleteHero');
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it('should search for hero', () => {
    const name = 'Narco';
    const expectedLog = `found heroes matching "Narco"`;
    const expectedMessage = `HeroService: found heroes matching "Narco"`;

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn<any>(messageService, 'add').and.callThrough();

    heroService.searchHeroes(name).subscribe( response => {
      expect(response).not.toBeUndefined();
      }
    );

    const request = httpMock.expectOne(`api/heroes/?name=${name}`, `call to searchHeroes`);
    expect(request.request.method).toEqual('GET');
    request.flush(mockHeroes[1]);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('searchHeroes', [  ]);
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });

  it(`should handle error: searchHeroes`, () => {
    const name = 'Foo';
    const expectedLog = `searchHeroes failed: Http failure response for api/heroes/?name=Foo: 404 Bad Request`;
    const expectedMessage = `HeroService: searchHeroes failed: Http failure response for api/heroes/?name=Foo: 404 Bad Request`;

    const handleErrorSpy = spyOn<any>(heroService, 'handleError').and.callThrough();
    const logSpy = spyOn<any>(heroService, 'log').and.callThrough();
    const addSpy = spyOn<any>(messageService, 'add').and.callThrough();

    heroService.searchHeroes(name).subscribe( response => {
      expect(response).toEqual( [ ]);
    });

    const request = httpMock.expectOne(`api/heroes/?name=${name}`, `call to searchHeroes`);
    expect(request.request.method).toEqual('GET');
    request.flush(invalidRequestBody, invalidRequestOptions);

    expect(handleErrorSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(addSpy).toHaveBeenCalledTimes(1);

    expect(handleErrorSpy).toHaveBeenCalledWith('searchHeroes', [  ]);
    expect(logSpy).toHaveBeenCalledWith(expectedLog);
    expect(addSpy).toHaveBeenCalledWith(expectedMessage);
  });
});
