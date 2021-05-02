import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesordersComponent } from './salesorders.component';

describe('SalesordersComponent', () => {
  let component: SalesordersComponent;
  let fixture: ComponentFixture<SalesordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
