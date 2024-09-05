
import {  NgClass, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-nabvar',
  standalone: true,
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.scss'],
  imports: [NgIf, NgClass] // Asegúrate de que NgIf esté aquí
})
export class NabvarComponent implements OnInit{
  isNavbarCollapsed = true;
  public isInSeccion2: boolean = false;
   public router:Router;
  constructor( router: Router, private cdr:ChangeDetectorRef) {
    this.router=router
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verifica si la URL actual corresponde a '/seccion2'
        this.isInSeccion2 = event.urlAfterRedirects.includes('/seccion2');
        console.log("isInSeccion2: ", this.isInSeccion2); // Para verificar
  
        // Forzamos la detección de cambios con un pequeño retraso
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      }
    });
  }
  
  
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  handleNavClick(section: string): void {
    this.router.navigate(['/'], { fragment: section });
    this.isNavbarCollapsed = true;  // Colapsa el navbar después de la navegación
  }

  navigateToSeccion2() {
    this.router.navigate(['/seccion2']);
    this.isNavbarCollapsed = true;  // Colapsa el navbar después de la navegación
  }
}