import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoSlider } from './bingo-slider';

describe('BingoSlider', () => {
  let component: BingoSlider;
  let fixture: ComponentFixture<BingoSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BingoSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BingoSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
