import { Component } from '@angular/core';
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
  disabled = false;
  max = 50;
  min = 2;
  showTicks = false;
  step = 2;
  thumbLabel = false;
  value = 2;
}
