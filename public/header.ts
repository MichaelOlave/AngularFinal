import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  scrolled = signal(false);
  activeSection = signal('hero');

  navItems = [
    { id: 'hero', label: 'Intro' },
    { id: 'history', label: 'History' },
    { id: 'concepts', label: 'Features' },
    { id: 'performance', label: 'Performance' },
    { id: 'usage', label: 'Usage' },
    { id: 'future', label: 'Future' },
    { id: 'comparison', label: 'Compare' },
  ];

  // Scroll Listener
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 50);
  }

  // Smooth Scroll
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection.set(id);
    }
  }
}
