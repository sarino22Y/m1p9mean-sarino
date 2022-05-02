import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatSoldComponent } from './plat-sold.component';

describe('PlatSoldComponent', () => {
  let component: PlatSoldComponent;
  let fixture: ComponentFixture<PlatSoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatSoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatSoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
