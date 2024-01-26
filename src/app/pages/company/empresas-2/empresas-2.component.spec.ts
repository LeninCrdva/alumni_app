import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empresas2Component } from './empresas-2.component';

describe('Empresas2Component', () => {
  let component: Empresas2Component;
  let fixture: ComponentFixture<Empresas2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Empresas2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Empresas2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
