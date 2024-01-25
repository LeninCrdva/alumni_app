import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertasDeTrabajoComponent } from './ofertas-de-trabajo.component';

describe('OfertasDeTrabajoComponent', () => {
  let component: OfertasDeTrabajoComponent;
  let fixture: ComponentFixture<OfertasDeTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfertasDeTrabajoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfertasDeTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
