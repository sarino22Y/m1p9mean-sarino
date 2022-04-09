import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderloggedinComponent } from './headerloggedin.component';

describe('HeaderloggedinComponent', () => {
  let component: HeaderloggedinComponent;
  let fixture: ComponentFixture<HeaderloggedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderloggedinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderloggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
