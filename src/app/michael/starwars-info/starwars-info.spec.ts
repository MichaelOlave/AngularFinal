import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarwarsInfo } from './starwars-info';

describe('StarwarsInfo', () => {
  let component: StarwarsInfo;
  let fixture: ComponentFixture<StarwarsInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarwarsInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarwarsInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
