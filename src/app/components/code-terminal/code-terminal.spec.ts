import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTerminal } from './code-terminal';

describe('CodeTerminal', () => {
  let component: CodeTerminal;
  let fixture: ComponentFixture<CodeTerminal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeTerminal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeTerminal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
