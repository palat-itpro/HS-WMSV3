import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletpickupComponent } from './palletpickup.component';

describe('PalletpickupComponent', () => {
  let component: PalletpickupComponent;
  let fixture: ComponentFixture<PalletpickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalletpickupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PalletpickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
