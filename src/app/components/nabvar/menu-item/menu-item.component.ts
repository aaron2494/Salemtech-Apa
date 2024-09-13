import {  AfterViewInit, Component, ElementRef,  OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

import { CommonModule} from '@angular/common';
import  { Carousel } from 'bootstrap';



@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements AfterViewInit, OnDestroy {
  
  private routerSubscription: any;
  showAnimation$!: Observable<boolean>;
  @ViewChild('carouselExample', { static: false }) carouselElement!: ElementRef;
  private intersectionObserver!: IntersectionObserver;
  private cardsCarouselInstance!: Carousel;
  private swipeStartX: number | null = null;

  cards = [
    {
      icon: '/iconos_procesos.png',
      title: 'Experiencia en Procesos',
      text: 'Contamos con la experiencia en procesos, automatización, tecnología de operación y de información para integrar las necesidades de los clientes del mercado energético en forma efectiva y segura.'
    },
    {
      icon: '/iconos_performance.png',
      title: 'Estándares de Calidad',
      text: 'Seguimos los más altos estándares en ejecución de proyectos de ingeniería y consultoría del mercado. Alineamos los equipos de trabajo a las necesidades del proyecto en forma escalable y flexible.'
    },
    {
      icon: '/iconos_tecno.png',
      title: 'Soporte de Clase Mundial',
      text: 'Tenemos a disposición un soporte de élite. Definimos en conjunto métricas de rentabilidad en cada desafío en el que apoyamos a nuestros clientes. Elegimos ser su socio tecnológico y no otro proveedor más.'
    }
  ];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    this.addSwipeListeners(); // Añadir listeners para swipe
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
 
  private addSwipeListeners() {
    const carouselElement = this.el.nativeElement.querySelector('#cardsCarousel');

    this.renderer.listen(carouselElement, 'touchstart', (event: TouchEvent) => {
      this.swipeStartX = event.touches[0].clientX;
    });

    this.renderer.listen(carouselElement, 'touchend', (event: TouchEvent) => {
      if (this.swipeStartX !== null) {
        const swipeEndX = event.changedTouches[0].clientX;
        const swipeDistance = this.swipeStartX - swipeEndX;

        if (Math.abs(swipeDistance) > 50) {
          if (swipeDistance > 0) {
            this.cardsCarouselInstance.next();
          } else {
            this.cardsCarouselInstance.prev();
          }
        }
      }

      this.swipeStartX = null;
    });
  }
}