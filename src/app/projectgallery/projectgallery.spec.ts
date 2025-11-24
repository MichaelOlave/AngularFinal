import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projectgallery } from './projectgallery';

describe('Projectgallery', () => {
  let component: Projectgallery;
  let fixture: ComponentFixture<Projectgallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projectgallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Projectgallery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
