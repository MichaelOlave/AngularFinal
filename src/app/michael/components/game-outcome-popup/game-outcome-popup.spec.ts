import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOutcomePopup } from './game-outcome-popup';

describe('GameOutcomePopup', () => {
  let component: GameOutcomePopup;
  let fixture: ComponentFixture<GameOutcomePopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameOutcomePopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameOutcomePopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
