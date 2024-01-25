import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciasLaboralesComponent } from './referencias-laborales.component';

describe('ReferenciasLaboralesComponent', () => {
  let component: ReferenciasLaboralesComponent;
  let fixture: ComponentFixture<ReferenciasLaboralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReferenciasLaboralesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferenciasLaboralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
