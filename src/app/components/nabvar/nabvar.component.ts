
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.scss']
})
export class NabvarComponent implements OnInit,OnDestroy {
  private scrollThreshold = 50;
  private scrollEvent!: () => void;
  isNavbarCollapsed = true;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.scrollEvent = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.scrollEvent);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollEvent);
  }

  handleScroll(): void {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > this.scrollThreshold) {
        navbar.classList.add('navbar-shrink');
      } else {
        navbar.classList.remove('navbar-shrink');
      }
    }
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    const navbar = document.getElementById('navbarNav');
    if (navbar) {
      if (this.isNavbarCollapsed) {
        navbar.classList.remove('show');
      } else {
        navbar.classList.add('show');
      }
    }
  }

  handleNavClick(sectionId: string): void {
    this.isNavbarCollapsed = true;
    const navbar = document.getElementById('navbarNav');
    if (navbar) {
      navbar.classList.remove('show');
    }
    this.onNavigate(sectionId);
  }

  onNavigate(sectionId: string): void {
    this.router.navigate([], { fragment: sectionId }).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}