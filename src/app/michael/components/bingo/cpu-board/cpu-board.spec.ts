import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuBoard } from './cpu-board';

describe('CpuBoard', () => {
  let component: CpuBoard;
  let fixture: ComponentFixture<CpuBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpuBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpuBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
