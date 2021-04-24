import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineOrderListComponent } from './pipeline-order-list.component';

describe('PipelineOrderListComponent', () => {
  let component: PipelineOrderListComponent;
  let fixture: ComponentFixture<PipelineOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
