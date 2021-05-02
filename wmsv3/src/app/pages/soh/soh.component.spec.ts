import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SohComponent } from './soh.component';

describe('SohComponent', () => {
  let component: SohComponent;
  let fixture: ComponentFixture<SohComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SohComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SohComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
