import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererdashboardComponent } from './delivererdashboard.component';

describe('DelivererdashboardComponent', () => {
  let component: DelivererdashboardComponent;
  let fixture: ComponentFixture<DelivererdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelivererdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelivererdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
