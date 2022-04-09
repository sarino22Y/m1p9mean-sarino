import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadernotloggedinComponent } from './headernotloggedin.component';

describe('HeadernotloggedinComponent', () => {
  let component: HeadernotloggedinComponent;
  let fixture: ComponentFixture<HeadernotloggedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadernotloggedinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadernotloggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
