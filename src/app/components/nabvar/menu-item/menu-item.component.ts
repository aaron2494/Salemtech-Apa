import {  AfterViewInit, Component, ElementRef,  OnDestroy, Renderer2, ViewChild } from '@angular/core';
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
  @ViewChild('cardsCarousel', { static: false }) carouselElement!: ElementRef;

  private cardsCarouselInstance!: Carousel;
  private swipeStartX: number | null = null;

  cards = [
    {
      title: 'Innovación<br> & experiencia',
      text: 'Con mas de una década de experiencia en automatización y control de procesos, combinamos innovación y tecnología para ofrecer soluciones avanzadas que optimizan operaciones industriales.',
    },
    {
      title: 'Ciberseguridad Avanzada',
      text: 'Protegemos tus sistemas críticos con una plataforma inteligente de detección y respuesta temprana de amenazas, desarrollada en alianza con líderes globales como DRAGOS.',
    },
    {
      title: 'Optimización<br> & Sostenibilidad',
      text: 'Transformamos digitalmente tus procesos, mejorando la competitividad y reduciendo costos, siempre enfocados en la eficiencia y sostenibilidad.',
    },
  ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Inicializar la instancia del carrusel
    this.cardsCarouselInstance = new Carousel(this.carouselElement.nativeElement, {
      interval: false,
    });

    // Añadir listeners para swipe
    this.addSwipeListeners();
  }

  ngOnDestroy(): void {
    if (this.cardsCarouselInstance) {
      this.cardsCarouselInstance.dispose();
    }
  }

  private addSwipeListeners() {
    const carousel = this.carouselElement.nativeElement;

    this.renderer.listen(carousel, 'touchstart', (event: TouchEvent) => {
      this.swipeStartX = event.touches[0].clientX;
    });

    this.renderer.listen(carousel, 'touchend', (event: TouchEvent) => {
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