import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnularTransaccionComponent } from './anular-transaccion.component';

describe('AnularTransaccionComponent', () => {
  let component: AnularTransaccionComponent;
  let fixture: ComponentFixture<AnularTransaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnularTransaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnularTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
