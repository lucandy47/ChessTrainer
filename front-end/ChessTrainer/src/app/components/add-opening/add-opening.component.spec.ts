import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpeningComponent } from './add-opening.component';

describe('AddOpeningComponent', () => {
  let component: AddOpeningComponent;
  let fixture: ComponentFixture<AddOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOpeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
