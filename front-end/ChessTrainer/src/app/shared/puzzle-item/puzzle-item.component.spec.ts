import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleItemComponent } from './puzzle-item.component';

describe('PuzzleItemComponent', () => {
  let component: PuzzleItemComponent;
  let fixture: ComponentFixture<PuzzleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
