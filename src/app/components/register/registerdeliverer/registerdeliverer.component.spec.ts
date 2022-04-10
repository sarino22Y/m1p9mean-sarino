import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterdelivererComponent } from './registerdeliverer.component';

describe('RegisterdelivererComponent', () => {
  let component: RegisterdelivererComponent;
  let fixture: ComponentFixture<RegisterdelivererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterdelivererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterdelivererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
