import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionesFormComponent } from './postulaciones-form.component';

describe('PostulacionesFormComponent', () => {
  let component: PostulacionesFormComponent;
  let fixture: ComponentFixture<PostulacionesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostulacionesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostulacionesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
