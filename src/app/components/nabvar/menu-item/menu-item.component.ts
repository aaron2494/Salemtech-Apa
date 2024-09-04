import {  AfterViewInit, Component, ElementRef,  OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

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
  
  private routerSubscription: any;
  showAnimation$!: Observable<boolean>;
  @ViewChild('carouselExample', { static: false }) carouselElement!: ElementRef;
  private intersectionObserver!: IntersectionObserver;
 
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
      text: 'Contamos con un sopote de elite. Definimos en conjunto métricas de rentabilidad en cada desafío en el que apoyamos a nuestros clientes. Elegimos ser su socio tecnológico y no un proveedor más,incredibilis .'
    }
  ];

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

  ngAfterViewInit(): void {
    this.handleNavigation();
    this.initializeIntersectionObserver();
    // Ensure the animations are applied initially
    this.resetAndTriggerAnimation();
    
    setTimeout(() => {
      this.initializeCarousels();
    }, 0);
  }
  
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
  
  private handleNavigation() {
    if (this.router.url.includes('presentation')) {
      this.resetAndTriggerAnimation();
    }
  
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url.includes('presentation')) {
        this.resetAndTriggerAnimation();
      }
    });
  }
  
  private initializeIntersectionObserver() {
    const options = {
      threshold: 0.1 // Trigger animation when 10% of the card is visible
    };
    
    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          this.renderer.addClass(target, 'show');
          observer.unobserve(target); // Stop observing once the animation is triggered
        }
      });
    }, options);

    // Observe all cards on initialization
     const cards = this.el.nativeElement.querySelectorAll('.card');
  cards.forEach((card: Element) => {
    this.intersectionObserver.observe(card);
  });
}
  
  private resetAndTriggerAnimation() {
    const cards = this.el.nativeElement.querySelectorAll('.card');
    cards.forEach((card: HTMLElement, index: number) => {
      this.renderer.removeClass(card, 'show');
      this.renderer.setStyle(card, 'animation', 'none');
      setTimeout(() => {
        this.renderer.addClass(card, 'show');
        this.renderer.setStyle(card, 'animation', `fadeIn 4s ease-in-out ${index * 0.1}s forwards`);
      }, 10);
    });
  }
  
 
    private initializeCarousels() {
    const cardsCarouselElement = this.el.nativeElement.querySelector('#cardsCarousel');
    if (cardsCarouselElement) {
      new Carousel(cardsCarouselElement, {
        interval: 7000,
        ride: 'carousel'
      });
    }
  }
}