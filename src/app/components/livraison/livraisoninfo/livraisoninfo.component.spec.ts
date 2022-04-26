import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisoninfoComponent } from './livraisoninfo.component';

describe('LivraisoninfoComponent', () => {
  let component: LivraisoninfoComponent;
  let fixture: ComponentFixture<LivraisoninfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivraisoninfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivraisoninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
