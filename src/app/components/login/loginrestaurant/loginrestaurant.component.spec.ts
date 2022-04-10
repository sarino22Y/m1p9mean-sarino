import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginrestaurantComponent } from './loginrestaurant.component';

describe('LoginrestaurantComponent', () => {
  let component: LoginrestaurantComponent;
  let fixture: ComponentFixture<LoginrestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginrestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginrestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
