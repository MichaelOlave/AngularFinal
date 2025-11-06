import { Component } from '@angular/core';
import { NgxDarkVeilComponent } from '@omnedia/ngx-dark-veil';
import { NgxGradientTextComponent } from '@omnedia/ngx-gradient-text';

@Component({
  selector: 'app-home',
  imports: [NgxDarkVeilComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
