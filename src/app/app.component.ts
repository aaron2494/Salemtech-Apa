import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterOutlet } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { MainComponent } from './components/main/main.component';
import { Seccion2Component } from './components/seccion2/seccion2.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { NabvarComponent } from "./components/nabvar/nabvar.component";
import { FooterComponent } from "./components/footer/footer.component";




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainComponent, ContactComponent, Seccion2Component, NabvarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class AppComponent {
  constructor(private cdr:ChangeDetectorRef){}
  title = 'Salemtech';
  getRouteAnimation() {
    // Devuelve el nombre del trigger de animación que quieres usar
    return "fadeAnimation"; // Usar la propiedad del trigger directamente
  }
  ngAfterViewInit() {
    // Forzar la detección de cambios después de que la vista se ha inicializado
    this.cdr.detectChanges();
  }
}
