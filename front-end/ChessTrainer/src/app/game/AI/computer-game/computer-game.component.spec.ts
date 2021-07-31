import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerGameComponent } from './computer-game.component';

describe('ComputerGameComponent', () => {
  let component: ComputerGameComponent;
  let fixture: ComponentFixture<ComputerGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
