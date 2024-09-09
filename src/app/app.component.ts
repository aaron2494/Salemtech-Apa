import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { MainComponent } from './components/main/main.component';
import { Seccion2Component } from './components/seccion2/seccion2.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { NabvarComponent } from "./components/nabvar/nabvar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { Meta, Title } from '@angular/platform-browser';




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

export class AppComponent implements OnInit ,AfterViewInit {
  constructor(private cdr:ChangeDetectorRef, private meta: Meta,private title: Title, private router: Router ){}

  ngOnInit(): void {
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateMetaTagsBasedOnRoute(event.urlAfterRedirects);
      }
    });

  }
 
  getRouteAnimation() {
    // Devuelve el nombre del trigger de animación que quieres usar
    return "fadeAnimation"; // Usar la propiedad del trigger directamente
  }
  ngAfterViewInit() {
    // Forzar la detección de cambios después de que la vista se ha inicializado
    this.cdr.detectChanges();
  }

  private updateMetaTagsBasedOnRoute(url: string): void {
    switch (url) {
      case '/home':
        this.title.setTitle('Página de Inicio');
        this.meta.updateTag({ name: 'description', content: 'calidad , experiencia en procesos, soporte de elite' });
        break;
      case '/presentation':
        this.title.setTitle('Sobre Nosotros');
        this.meta.updateTag({ name: 'description', content: 'Realizamos implementaciones tecnológicas en control de procesos, excelencia operacional, optimización de plantas de procesos de la industria mediana, pesada y desarrollo de sistemas informáticos.' });
        break;
      case '/seccion2':
        this.title.setTitle('nuestro equipo');
        this.meta.updateTag({ name: 'description', content: 'Nuestro equipo está formado por personal multidisciplinario experimentado y dotados de una fuerte orientación al Cliente sobre una cultura de trabajo bajo normas internacionales de Calidad, Seguridad, Salud y Ambiente.' });
        break;
      // Agrega más casos según sea necesario
      default:
        this.title.setTitle('Salemtech');
        this.meta.updateTag({ name: 'description', content: 'presatdores de servicios tecnologicos a la medida del cliente' });
        break;
    }
  }
}
