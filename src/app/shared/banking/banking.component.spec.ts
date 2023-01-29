import { ComponentFixture, TestBed } from '@angular/core/testing';

//Components
import { BankingComponent } from './banking.component';
import { ListComponent } from '../investments/components/list/list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BankingComponent', () => {
  let component: BankingComponent;
  let fixture: ComponentFixture<BankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingComponent, ListComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`(U) getPoupanca(): should have poupanca value = 10`, () => {
    expect(component.getPoupanca).toEqual(10);
  });

  it(`(U) getCarteira(): should have carteira value = 50`, () => {
    expect(component.getCarteira).toEqual(50);
  });

  it(`(U) setSacar(): should transfer poupanca from carteira`, () => {
    component.setSacar('10');
    
    expect(component.getPoupanca).toEqual(0);
    expect(component.getCarteira).toEqual(60);
  });

  it(`(U) setSacar(): should not transfer poupanca when poupanca < value or value is NaN`, () => {
    expect(component.setSacar('string')).not.toBeTruthy();
    expect(component.setSacar('100')).not.toBeTruthy();

    expect(component.getPoupanca).toEqual(10);
    expect(component.getCarteira).toEqual(50);
  });

  it(`(I) setSacar(): should transfer poupanca from carteira`, () => {
    let element = fixture.debugElement.nativeElement;

    element.querySelector('#input-sacar').value = '10';
    element.querySelector('#sacar').click();

    fixture.detectChanges();

    expect(element.querySelector('#get-carteira').textContent).toEqual('60');
  });

  it(`(U) setDepositar(): should transfer carteira from poupanca`, () => {
    component.setDepositar('50');

    expect(component.getCarteira).toEqual(0);
    expect(component.getPoupanca).toEqual(60);
  });

  it(`(U) setDepositar(): should not transfer carteira when carteira < value or value is NaN`, () => {
    expect(component.setDepositar('string')).not.toBeTruthy();
    expect(component.setDepositar('100')).not.toBeTruthy();

    expect(component.getPoupanca).toEqual(10);
    expect(component.getCarteira).toEqual(50);
  });

  it(`(I) setDepositar(): should transfer carteira from poupanca`, () => {
    let element = fixture.debugElement.nativeElement;

    element.querySelector('#input-depositar').value = '10';
    element.querySelector('#depositar').click();

    fixture.detectChanges();

    expect(element.querySelector('#get-poupanca').textContent).toEqual('20');
  });

});
