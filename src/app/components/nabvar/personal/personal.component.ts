
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Escuchar eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Obtener el fragmento de la ruta
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            // Forzar la posición directamente sobre el elemento
            element.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        }
      }
    });
  }
}