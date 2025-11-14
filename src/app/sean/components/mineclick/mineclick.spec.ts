import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { Mineclick } from './mineclick';

describe('Mineclick', () => {
  let component: Mineclick;
  let fixture: ComponentFixture<Mineclick>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mineclick],
      providers: [ChangeDetectorRef],
    }).compileComponents();

    fixture = TestBed.createComponent(Mineclick);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with zero dirt blocks', () => {
    expect(component.dirtBlocks).toBe(0);
  });

  it('should have blocks data', () => {
    expect(component.blocksData).toBeDefined();
    expect(component.blocksData.length).toBeGreaterThan(0);
  });

  it('should have upgrades data', () => {
    expect(component.upgrades).toBeDefined();
    expect(component.upgrades.length).toBeGreaterThan(0);
  });
});
