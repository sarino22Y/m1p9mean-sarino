import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterekalyComponent } from './registerekaly.component';

describe('RegisterekalyComponent', () => {
  let component: RegisterekalyComponent;
  let fixture: ComponentFixture<RegisterekalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterekalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterekalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
