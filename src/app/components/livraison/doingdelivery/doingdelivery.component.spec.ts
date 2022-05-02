import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoingdeliveryComponent } from './doingdelivery.component';

describe('DoingdeliveryComponent', () => {
  let component: DoingdeliveryComponent;
  let fixture: ComponentFixture<DoingdeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoingdeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoingdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
