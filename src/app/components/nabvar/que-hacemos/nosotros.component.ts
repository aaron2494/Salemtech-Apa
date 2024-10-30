import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule,NgFor,NgIf,RouterLink],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent implements OnInit {
  constructor ( private router:Router){}
  ngOnInit(): void {
      // Al detectar la navegación, desplázate a la parte superior de la página
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });
  }
  isOpen = [false, false, false]; // Maneja el estado de cada acordeón

  toggleAccordion(index: number) {
    this.isOpen[index] = !this.isOpen[index];
  }
}
