import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearFlowchartComponent } from './linear-flowchart.component';

describe('LinearFlowchartComponent', () => {
  let component: LinearFlowchartComponent;
  let fixture: ComponentFixture<LinearFlowchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearFlowchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearFlowchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
