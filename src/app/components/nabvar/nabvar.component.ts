
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ScrollServiceService } from '../../scroll-service.service';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.scss'
})
export class NabvarComponent implements OnInit {

  constructor( private router:Router) { }
  ngOnInit(): void {
    this.checkScroll();
  }
  
  onNavigate(sectionId: string) {
    // Navega a la sección especificada
    this.router.navigate([], { fragment: sectionId }).then(() => {
      this.scrollToElement(sectionId);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.checkScroll();
  }

  checkScroll(): void {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) { // Ajusta el valor para cuando el navbar se reduzca
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }
  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      // Desplazamiento suave al elemento
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

