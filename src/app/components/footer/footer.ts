import { Component, Input } from '@angular/core';
import { CodeViewer } from '../code-viewer/code-viewer';

@Component({
  selector: 'app-footer',
  imports: [CodeViewer],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  @Input() mainText: string = '';
  @Input() componentPath: string = '';
  @Input() showShoutOut: boolean = true;
}
