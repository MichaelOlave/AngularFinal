import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Timeline } from '../components/timeline/timeline';
import { CoreConcepts } from '../components/core-concepts/core-concepts';
import { Performance } from '../components/performance/performance';
import { CaseStudies } from '../components/case-studies/case-studies';
import { Comparisons } from '../components/comparisons/comparisons';
import { EcosystemCommunity } from '../components/ecosystem-community/ecosystem-community';
import { Future } from '../components/future/future';
import { Footer } from '../components/footer/footer';
import { CodeTerminal } from '../components/code-terminal/code-terminal';
import { FileService } from '../utils/pull-file-lines';

@Component({
  selector: 'app-presentation',
  imports: [
    CommonModule,
    Timeline,
    CoreConcepts,
    Performance,
    CaseStudies,
    Comparisons,
    EcosystemCommunity,
    Future,
    Footer,
    CodeTerminal,
  ],
  templateUrl: './presentation.html',
  styleUrl: './presentation.css',
})
export class Presentation implements OnInit {
  scrolled = signal(false);
  activeSection = signal('hero');
  activeFile = signal('app.ts');
  codeLines = signal<string[]>([]);

  constructor(private fileService: FileService) {}

  async ngOnInit() {
    this.codeLines.set(await this.fileService.getFileLines('app.ts'));
    console.log(this.codeLines());
  }

  navItems = [
    { id: 'hero', label: 'Intro' },
    { id: 'history', label: 'History' },
    { id: 'concepts', label: 'Features' },
    { id: 'performance', label: 'Performance' },
    { id: 'usage', label: 'Usage' },
    { id: 'future', label: 'Future' },
    { id: 'comparison', label: 'Compare' },
  ];
}
