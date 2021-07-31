import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleOptionsComponent } from './puzzle-options.component';

describe('PuzzleOptionsComponent', () => {
  let component: PuzzleOptionsComponent;
  let fixture: ComponentFixture<PuzzleOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
