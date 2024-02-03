import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaReportComponent } from './empresa-report.component';

describe('EmpresaReportComponent', () => {
  let component: EmpresaReportComponent;
  let fixture: ComponentFixture<EmpresaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpresaReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpresaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
