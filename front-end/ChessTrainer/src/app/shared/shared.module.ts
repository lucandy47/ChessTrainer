import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzleItemComponent } from './puzzle-item/puzzle-item.component';



@NgModule({
  declarations: [PuzzleItemComponent],
  imports: [
    CommonModule
  ],
  exports:[PuzzleItemComponent]
})
export class SharedModule { }
