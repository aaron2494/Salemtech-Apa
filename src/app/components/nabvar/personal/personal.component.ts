
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit {
  constructor(private router: Router){
    
  }ngOnInit(): void {
    // Al detectar la navegación, desplázate a la parte superior de la página
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

}
