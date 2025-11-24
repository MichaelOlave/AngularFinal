import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-terminal',
  imports: [],
  templateUrl: './code-terminal.html',
  styleUrl: './code-terminal.css',
})
export class CodeTerminal {
  @Input() fileName!: string;
  @Input() codeLines!: string[];
}
