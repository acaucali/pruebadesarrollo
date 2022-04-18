import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarTarjetaComponent } from './consultar-tarjeta.component';

describe('ConsultarTarjetaComponent', () => {
  let component: ConsultarTarjetaComponent;
  let fixture: ComponentFixture<ConsultarTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
