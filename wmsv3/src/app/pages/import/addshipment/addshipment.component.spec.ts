import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddshipmentComponent } from './addshipment.component';

describe('AddshipmentComponent', () => {
  let component: AddshipmentComponent;
  let fixture: ComponentFixture<AddshipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddshipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddshipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
