import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCard } from './film-card';

describe('FilmCard', () => {
  let component: FilmCard;
  let fixture: ComponentFixture<FilmCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
