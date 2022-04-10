import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginekalyComponent } from './loginekaly.component';

describe('LoginekalyComponent', () => {
  let component: LoginekalyComponent;
  let fixture: ComponentFixture<LoginekalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginekalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginekalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
