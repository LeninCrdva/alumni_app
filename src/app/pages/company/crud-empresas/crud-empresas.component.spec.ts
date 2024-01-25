import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEmpresasComponent } from './crud-empresas.component';

describe('CrudEmpresasComponent', () => {
  let component: CrudEmpresasComponent;
  let fixture: ComponentFixture<CrudEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudEmpresasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
