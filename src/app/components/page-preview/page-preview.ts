import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-preview',
  imports: [],
  templateUrl: './page-preview.html',
  styleUrls: ['./page-preview.css'],
})
export class PagePreview implements AfterViewInit {
  @Input() component!: Type<any>;
  @Input() route!: string;

  @ViewChild('previewHost', { read: ViewContainerRef }) host!: ViewContainerRef;
  @ViewChild('card', { static: true }) cardEl!: ElementRef<HTMLDivElement>;
  @ViewChild('scaledContent', { static: true }) contentEl!: ElementRef<HTMLDivElement>;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.host.createComponent(this.component);

    setTimeout(() => {
      requestAnimationFrame(() => this.applyScale());
    }, 50);

    window.addEventListener('resize', () => this.applyScale());
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => this.applyScale());
  }

  applyScale() {
    const card = this.cardEl.nativeElement;
    const content = this.contentEl.nativeElement;

    const viewportWidth = 1400;
    content.style.width = `${viewportWidth}px`;

    const scale = card.clientWidth / viewportWidth;
    content.style.transform = `scale(${scale})`;
  }

  navigateWithZoom() {
    const card = this.cardEl.nativeElement;

    void card.offsetWidth;

    card.classList.add('animate-zoom-in');

    setTimeout(() => {
      this.router.navigate([this.route]);
    }, 350);
  }
}
