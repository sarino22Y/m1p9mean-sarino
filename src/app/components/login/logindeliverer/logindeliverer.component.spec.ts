import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogindelivererComponent } from './logindeliverer.component';

describe('LogindelivererComponent', () => {
  let component: LogindelivererComponent;
  let fixture: ComponentFixture<LogindelivererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogindelivererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogindelivererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
