import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOrderListComponent } from './log-order-list.component';

describe('EventOrderListComponent', () => {
  let component: LogOrderListComponent;
  let fixture: ComponentFixture<LogOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
