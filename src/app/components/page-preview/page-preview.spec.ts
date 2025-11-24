import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePreview } from './page-preview';

describe('PagePreview', () => {
  let component: PagePreview;
  let fixture: ComponentFixture<PagePreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagePreview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagePreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
