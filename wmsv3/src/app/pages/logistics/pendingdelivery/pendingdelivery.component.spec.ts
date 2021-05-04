import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingdeliveryComponent } from './pendingdelivery.component';

describe('PendingdeliveryComponent', () => {
  let component: PendingdeliveryComponent;
  let fixture: ComponentFixture<PendingdeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingdeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingdeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
