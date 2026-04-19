import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCounter } from './type-counter';

describe('TypeCounter', () => {
  let component: TypeCounter;
  let fixture: ComponentFixture<TypeCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeCounter],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
