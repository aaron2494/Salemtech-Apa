import {  AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AnimationServiceService } from '../../../animation-service.service';
import { CommonModule } from '@angular/common';
import  { Carousel } from 'bootstrap';


@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements AfterViewInit, OnDestroy {
  items = [
    { icon: '../../../../assets/iconos_datos.png', title: 'Relevamiento de datos', description: '' },
    { icon: '../../../../assets/iconos_performance.png', title: 'Mejora de performance', description: '' },
    { icon: '../../../../assets/iconos_procesos.png', title: 'Automatizacion de procesos', description: '' },
    { icon: '../../../../assets/iconos_tecno.png', title: 'Implementacion de Tecnologias', description: '' },
  ];
  private routerSubscription: any;
  showAnimation$!: Observable<boolean>;
  @ViewChild('carouselExample', { static: false }) carouselElement!: ElementRef;
  images = [
    '../../../../assets/calidad.jpg',
    '../../../../assets/concepto-control-calidad-estandar-m.jpg',
    '../../../../assets/concepto-collage-control-calidad-estandar.jpg'
  ];
  cards = [
    {
      title: 'Experiencia en Procesos',
      text: 'Contamos con la experiencia en procesos, automatización, tecnología de operación y de información para integrar las necesidades de los clientes del mercado energético en forma efectiva y segura.         '
    },
    {
      title: 'Estándares de Calidad',
      text: 'Seguimos los más altos estándares en ejecución de proyectos de ingeniería y consultoría del mercado. Alineamos los equipos de trabajo a las necesidades del proyecto en forma escalable y flexible.'
    },
    {
      title: 'Soporte de Clase Mundial',
      text: 'Contamos con un sopote de elite. Definimos en conjunto métricas de rentabilidad en cada desafío en el que apoyamos a nuestros clientes. Elegimos ser su socio tecnológico y no un proveedor más.'
    }
  ];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private animationService: AnimationServiceService
  ) {}

 
ngAfterViewInit(): void {
  this.showAnimation$ = this.animationService.showAnimation$;

  // Detectar navegación hacia la sección 'presentation'
  this.routerSubscription = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(() => {
    if (this.router.url.includes('presentation')) {
      this.resetAndTriggerAnimation();
    }
  });
  setTimeout(() => {
    if (this.carouselElement) {
      const bootstrapCarousel = new Carousel(this.carouselElement.nativeElement, {
        interval: 5000,
        ride: 'carousel'
      });
    }
  }, 0);
 this.animateIcons();
}
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private resetAndTriggerAnimation() {
    const cards = this.el.nativeElement.querySelectorAll('.card');
    cards.forEach((card: HTMLElement, index: number) => {
      this.renderer.removeClass(card, 'show'); // Elimina la clase 'show'
      // Forzamos el navegador a aplicar los estilos iniciales
      this.renderer.setStyle(card, 'animation', 'none');
      // Un pequeño retraso para reiniciar la animación
      setTimeout(() => {
        this.renderer.addClass(card, 'show'); // Vuelve a agregar la clase 'show'
        this.renderer.setStyle(card, 'animation', `fadeIn 4s ease-in-out ${index * 0.1}s forwards`); // Aplica la animación
      }, 10);
    });
  }
  private animateIcons() {
    const icons = this.el.nativeElement.querySelectorAll('.icon-wrapper');
    icons.forEach((icon: HTMLElement, index: number) => {
      this.renderer.setStyle(icon, 'opacity', '1');
      this.renderer.setStyle(icon, 'animation', `fadeInUp 0.5s ease-in-out ${index * 0.2}s forwards`);
    });
  }
  
}
