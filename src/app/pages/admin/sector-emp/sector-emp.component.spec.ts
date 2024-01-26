import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorEmpComponent } from './sector-emp.component';

describe('SectorEmpComponent', () => {
  let component: SectorEmpComponent;
  let fixture: ComponentFixture<SectorEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectorEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectorEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
