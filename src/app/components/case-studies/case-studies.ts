import { Component, OnInit, signal } from '@angular/core';
import { loadJSON } from '../../utils/load-json';

interface CaseStudy {
  id: string;
  name: string;
  type: string;
  description: string;
  impact: string;
  logoColor: string;
}

@Component({
  selector: 'app-case-studies',
  imports: [],
  templateUrl: './case-studies.html',
  styleUrl: './case-studies.css',
})
export class CaseStudies implements OnInit {
  caseStudies = signal<CaseStudy[]>([]);

  ngOnInit() {
    loadJSON<CaseStudy[]>('case-studies.json').then((data) => {
      this.caseStudies.set(data);
    });
  }
}
