
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.scss'
})
export class NabvarComponent  {

  constructor( private router:Router) { }

  isNavbarCollapsed = true;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    const navbar = document.getElementById('navbarNav');
    if (navbar) {
      navbar.classList.remove('show'); // Cierra el navbar
    }
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
 

