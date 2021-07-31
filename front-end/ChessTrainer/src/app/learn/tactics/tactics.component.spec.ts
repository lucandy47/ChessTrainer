import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticsComponent } from './tactics.component';

describe('TacticsComponent', () => {
  let component: TacticsComponent;
  let fixture: ComponentFixture<TacticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
