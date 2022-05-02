import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatRemainsComponent } from './plat-remains.component';

describe('PlatRemainsComponent', () => {
  let component: PlatRemainsComponent;
  let fixture: ComponentFixture<PlatRemainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatRemainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatRemainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
