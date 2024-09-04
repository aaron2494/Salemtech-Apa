
import { NgIf } from '@angular/common';
import {  Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-nabvar',
  standalone: true,
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.scss'],
  imports: [NgIf] // Asegúrate de que NgIf esté aquí
})
export class NabvarComponent implements OnInit{
  isNavbarCollapsed = true;
  public isInSeccion2: boolean = false;
   public router:Router;
  constructor( router: Router) {
    this.router=router
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isInSeccion2 = event.urlAfterRedirects === '/seccion2';
      }
    });
  }
  
  

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    // No need for DOM manipulation as Bootstrap handles it
  }

  handleNavClick(section: string): void {
    this.router.navigate(['/'], { fragment: section });
  }

  navigateToSeccion2() {
    this.router.navigate(['/seccion2']);
  }
}