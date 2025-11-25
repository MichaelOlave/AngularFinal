import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoBallSpinner } from './bingo-ball-spinner';

describe('BingoBallSpinner', () => {
  let component: BingoBallSpinner;
  let fixture: ComponentFixture<BingoBallSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BingoBallSpinner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BingoBallSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
