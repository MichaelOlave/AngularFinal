import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { App } from '../../app';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private appRoot = inject(App);

  @Input() mainText: string = '';
  @Input() componentPath: string = '';
  @Input() showShoutOut: boolean = true;

  async openCodeViewer() {
    await this.appRoot.openCodeViewer(this.componentPath);
  }
}
