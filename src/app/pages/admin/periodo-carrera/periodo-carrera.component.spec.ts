import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoCarreraComponent } from './periodo-carrera.component';

describe('PeriodoCarreraComponent', () => {
  let component: PeriodoCarreraComponent;
  let fixture: ComponentFixture<PeriodoCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeriodoCarreraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeriodoCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
