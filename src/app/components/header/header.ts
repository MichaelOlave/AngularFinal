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
  showMobileMenu = signal(false);
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const mobileMenu = target.closest('.mobile-menu-container');
    const hamburgerButton = target.closest('.hamburger-button');

    if (!mobileMenu && !hamburgerButton && this.showMobileMenu()) {
      this.closeMobileMenu();
    }
  }

  toggleVersionDropdown() {
    this.showVersionDropdown.update((value) => !value);
  }

  toggleMobileMenu() {
    this.showMobileMenu.update((value) => !value);
  }

  closeMobileMenu() {
    this.showMobileMenu.set(false);
  }

  // Smooth Scroll
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection.set(id);
      this.closeMobileMenu();
    }
  }
}
