import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptycontainerComponent } from './emptycontainer.component';

describe('EmptycontainerComponent', () => {
  let component: EmptycontainerComponent;
  let fixture: ComponentFixture<EmptycontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptycontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptycontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
