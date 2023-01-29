import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Investment } from '../../model/investment';
import { MOCK_LIST } from '../../services/list-investments.mock';
import { ListInvestmentsService } from '../../services/list-investments.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: ListInvestmentsService;

  const mockList: Array<Investment> = MOCK_LIST;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    service = TestBed.inject(ListInvestmentsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) investments: should list investmentsbe be filled`, () => {
    spyOn(service, 'list').and.returnValue(of(mockList));

    component.ngOnInit();
    fixture.detectChanges();

    expect(service.list).toHaveBeenCalledWith();
    expect(component.investments.length).toEqual(5);

    expect(component.investments[0].name).toEqual('Banco 1');
    expect(component.investments[0].value).toEqual(100);
    expect(component.investments[4].name).toEqual('Banco 5');
    expect(component.investments[4].value).toEqual(100);

    // expect(investments.length).toBe(4);
    // expect(investments[0].name).toContain('Itaú');
    // expect(investments[3].name).toContain('Inter');
  });

  it(`(I) investments: should list investmentsbe be filled`, () => {
    spyOn(service, 'list').and.returnValue(of(mockList));

    component.ngOnInit();
    fixture.detectChanges();

    let investments = fixture.debugElement.nativeElement.querySelectorAll('.list-items');

    expect(investments.length).toEqual(5);
    expect(investments[0].textContent.trim()).toEqual('Banco 1 | 100');
    expect(investments[4].textContent.trim()).toEqual('Banco 5 | 100');
  });
});
