import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './michael/components/toast/toast';
import { Header } from './components/header/header';
import { CodeViewer } from './components/code-viewer/code-viewer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Header, CodeViewer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('AngularFinal');

  @ViewChild(CodeViewer) codeViewer?: CodeViewer;

  async openCodeViewer(componentPath: string) {
    if (this.codeViewer) {
      this.codeViewer.componentPath = componentPath;
      // Wait a tick to ensure the change is registered
      await Promise.resolve();
      await this.codeViewer.loadFiles();
      this.codeViewer.open();
    }
  }
}
