import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSelect } from './time-select';

describe('TimeSelect', () => {
  let component: TimeSelect;
  let fixture: ComponentFixture<TimeSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(TimeSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
