import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnloadreportComponent } from './unloadreport.component';

describe('UnloadreportComponent', () => {
  let component: UnloadreportComponent;
  let fixture: ComponentFixture<UnloadreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnloadreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnloadreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
