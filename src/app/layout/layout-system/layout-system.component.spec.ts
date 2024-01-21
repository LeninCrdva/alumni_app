import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSystemComponent } from './layout-system.component';

describe('LayoutSystemComponent', () => {
  let component: LayoutSystemComponent;
  let fixture: ComponentFixture<LayoutSystemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutSystemComponent]
    });
    fixture = TestBed.createComponent(LayoutSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
