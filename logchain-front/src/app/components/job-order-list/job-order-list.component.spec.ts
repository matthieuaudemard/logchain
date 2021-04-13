import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOrderListComponent } from './job-order-list.component';

describe('EventOrderListComponent', () => {
  let component: JobOrderListComponent;
  let fixture: ComponentFixture<JobOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
