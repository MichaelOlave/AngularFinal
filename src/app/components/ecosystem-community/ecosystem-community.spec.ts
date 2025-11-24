import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcosystemCommunity } from './ecosystem-community';

describe('EcosystemCommunity', () => {
  let component: EcosystemCommunity;
  let fixture: ComponentFixture<EcosystemCommunity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcosystemCommunity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcosystemCommunity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
