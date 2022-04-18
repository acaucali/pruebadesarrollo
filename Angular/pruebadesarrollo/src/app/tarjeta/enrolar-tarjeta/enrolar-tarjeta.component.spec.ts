import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolarTarjetaComponent } from './enrolar-tarjeta.component';

describe('EnrolarTarjetaComponent', () => {
  let component: EnrolarTarjetaComponent;
  let fixture: ComponentFixture<EnrolarTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolarTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolarTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
