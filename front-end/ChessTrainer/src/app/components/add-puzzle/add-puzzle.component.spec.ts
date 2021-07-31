import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPuzzleComponent } from './add-puzzle.component';

describe('AddPuzzleComponent', () => {
  let component: AddPuzzleComponent;
  let fixture: ComponentFixture<AddPuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPuzzleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
