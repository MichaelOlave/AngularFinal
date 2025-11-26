import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-bingo-slider',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
  ],
  templateUrl: './bingo-slider.html',
  styleUrl: './bingo-slider.css',
})
export class BingoSlider {
  @Input() disabled = false;
  @Input() max = 50;
  @Input() min = 2;
  showTicks = false;
  @Input() step = 2;
  thumbLabel = false;
  @Input() title = 'Setting Title';
  @Input() value = 10;

  @Output() valueChange = new EventEmitter<number>();

  onSliderChange(newValue: number): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
