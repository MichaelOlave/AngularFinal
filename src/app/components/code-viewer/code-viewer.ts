import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFileService, ComponentFiles } from './component-file.service';

@Component({
  selector: 'app-code-viewer',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './code-viewer.html',
  styleUrl: './code-viewer.css',
})
export class CodeViewer implements OnInit {
  private fileService = inject(ComponentFileService);

  isOpen = false;
  files: ComponentFiles = {};
  selectedFileName = '';
  selectedFileContent = '';
  fileNames: string[] = [];
  isLoading = false;

  @Input() componentPath: string = '';

  async ngOnInit() {
    if (this.componentPath) {
      await this.loadFiles();
    }
  }

  async loadFiles() {
    this.isLoading = true;
    this.files = await this.fileService.loadComponentFiles(this.componentPath);
    this.fileNames = Object.keys(this.files).sort();

    if (this.fileNames.length > 0) {
      this.selectFile(this.fileNames[0]);
    }

    this.isLoading = false;
  }

  selectFile(fileName: string) {
    this.selectedFileName = fileName;
    this.selectedFileContent = this.files[fileName] || '';
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
