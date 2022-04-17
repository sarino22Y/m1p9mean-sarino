import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkalydashboardComponent } from './ekalydashboard.component';

describe('EkalydashboardComponent', () => {
  let component: EkalydashboardComponent;
  let fixture: ComponentFixture<EkalydashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkalydashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EkalydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
