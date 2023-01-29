import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

//Model
import { Investment } from '../model/investment';

//Mock
import { MOCK_LIST } from './list-investments.mock';

//Service
import { ListInvestmentsService } from './list-investments.service';

describe('ListInvestmentsService', () => {
  let service: ListInvestmentsService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  const URL = 'https://raw.githubusercontent.com/troquatte/fake-server/main/investiments-all.json';
  const mockList: Array<Investment> = MOCK_LIST;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(ListInvestmentsService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`(U) should be list all investments`, (done) => {
    service.list().subscribe({
      next: (res: Array<Investment>) => {
        expect(res[0].name).toEqual('Banco 1');
        expect(res[0].value).toEqual(100);

        expect(res[4].name).toEqual('Banco 5');
        expect(res[4].value).toEqual(100);

        done();
      },
      error: (err) => console.log(err)
    });

    const req = httpTestingController.expectOne(URL);
    req.flush(mockList);

    expect(req.request.method).toEqual('GET');
  });
});
