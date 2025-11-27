import { Component, OnInit, Input, inject, ViewChild, ElementRef, AfterViewInit, SimpleChanges, OnChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';
import { ComponentFileService, ComponentFiles } from './component-file.service';

@Component({
  selector: 'app-code-viewer',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './code-viewer.html',
  styleUrl: './code-viewer.css',
  encapsulation: ViewEncapsulation.None,
})
export class CodeViewer implements OnInit, AfterViewInit, OnChanges {
  private fileService = inject(ComponentFileService);
  private sanitizer = inject(DomSanitizer);

  @ViewChild('codeElement', { static: false }) codeElement?: ElementRef<HTMLElement>;

  isOpen = false;
  files: ComponentFiles = {};
  selectedFileName = '';
  selectedFileContent = '';
  highlightedContent: SafeHtml = '';
  fileNames: string[] = [];
  isLoading = false;

  @Input() componentPath: string = '';

  async ngOnInit() {
    if (this.componentPath) {
      await this.loadFiles();
    }
  }

  ngAfterViewInit() {
    this.highlightCode();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['componentPath'] && !changes['componentPath'].firstChange && this.componentPath) {
      this.loadFiles();
    }
  }

  async loadFiles() {
    this.isLoading = true;
    this.files = await this.fileService.loadComponentFiles(this.componentPath);
    this.fileNames = Object.keys(this.files).sort();

    if (this.fileNames.length > 0) {
      this.selectFile(this.fileNames[0]);
      // Wait for DOM to update before highlighting
      setTimeout(() => this.highlightCode(), 50);
    }

    this.isLoading = false;
  }

  selectFile(fileName: string) {
    this.selectedFileName = fileName;
    this.selectedFileContent = this.files[fileName] || '';
    setTimeout(() => this.highlightCode(), 0);
  }

  private getLanguageFromFileName(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    const languageMap: { [key: string]: string } = {
      ts: 'typescript',
      js: 'javascript',
      html: 'html',
      css: 'css',
      scss: 'scss',
      json: 'json',
      xml: 'xml',
      py: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      rb: 'ruby',
      go: 'go',
      rs: 'rust',
    };
    return languageMap[ext] || 'plaintext';
  }

  private highlightCode() {
    if (this.codeElement && this.selectedFileContent) {
      const codeEl = this.codeElement.nativeElement;
      const language = this.getLanguageFromFileName(this.selectedFileName);

      try {
        const highlighted = hljs.highlight(this.selectedFileContent, {
          language,
          ignoreIllegals: true,
        });
        codeEl.innerHTML = highlighted.value;
        codeEl.className = `hljs language-${language}`;
      } catch (e) {
        // Fallback to plain text if highlighting fails
        codeEl.innerHTML = '';
        codeEl.textContent = this.selectedFileContent;
        codeEl.className = 'hljs';
      }
    }
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
