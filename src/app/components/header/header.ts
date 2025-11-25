import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  scrolled = signal(false);
  activeSection = signal('hero');
  showVersionDropdown = signal(false);
  router = inject(Router);

  currentRoute = '';

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  navItems = [
    { id: 'hero', label: 'Intro' },
    { id: 'history', label: 'History' },
    { id: 'concepts', label: 'Features' },
    { id: 'project-gallery', label: 'Projects' },
    { id: 'performance', label: 'Performance' },
    { id: 'usage', label: 'Usage' },
    { id: 'future', label: 'Future' },
    { id: 'comparison', label: 'Compare' },
  ];

  dropdownItems = [
    { label: 'Presentation', url: '/' },
    { label: 'Michael Olave', url: '/michael/dashboard' },
    { label: 'Sean Hammond', url: '/sean/dashboard' },
    { label: 'Oskar Laing', url: '/oskar/dashboard' },
    { label: 'Sophia Yeskey', url: '/yeskey/dashboard' },
  ];

  // Scroll Listener
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 50);
  }

  toggleVersionDropdown() {
    this.showVersionDropdown.update((value) => !value);
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
