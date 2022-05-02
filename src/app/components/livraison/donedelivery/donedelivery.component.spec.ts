import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonedeliveryComponent } from './donedelivery.component';

describe('DonedeliveryComponent', () => {
  let component: DonedeliveryComponent;
  let fixture: ComponentFixture<DonedeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonedeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonedeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
