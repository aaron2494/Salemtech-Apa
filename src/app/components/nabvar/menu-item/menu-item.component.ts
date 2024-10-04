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
      title: 'Innovación<br> & experiencia',
      text: 'Con mas de una década de experiencia en automatización y control de procesos, combinamos innovación y tecnología para ofrecer soluciones avanzadas que optimizan operaciones industriales.'
    },
    { 
      title: 'Ciberceguridad Avanzada',
      text: 'Protegemos tus sistemas críticos con una plataforma inteligente de detección y respuesta temprana de amenazas, desarrollada en alianza con lideres globales como DRAGOS.'
    },
    {
      title: 'Optimización<br> & Sostenibilidad',
      text: 'Transformamos digitalmente tus procesos, mejorando la competitividad y reduciendo costos, siempre enfocados en la eficiencia y sostenibilidad.'
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