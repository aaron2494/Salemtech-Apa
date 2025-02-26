import {  AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule} from '@angular/common';




@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements AfterViewInit {
  private touchStartX: number = 0;
  cards = [
    {
      title: 'Innovación<br> & experiencia',
      text: 'Con más de dos décadas de experiencia en automatización y control de procesos, combinamos innovación y tecnología para ofrecer soluciones avanzadas que optimizan operaciones industriales.',
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

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const carousel = this.el.nativeElement.querySelector('#cardsCarousel');

    this.renderer.listen(carousel, 'touchstart', (event: TouchEvent) => {
      this.touchStartX = event.touches[0].clientX;
    });

    this.renderer.listen(carousel, 'touchend', (event: TouchEvent) => {
      const touchEndX = event.changedTouches[0].clientX;
      const diffX = this.touchStartX - touchEndX;

      if (diffX > 40) {
        // Swipe izquierda
        this.renderer.selectRootElement('.carousel-control-next').click();
      } else if (diffX < -40) {
        // Swipe derecha
        this.renderer.selectRootElement('.carousel-control-prev').click();
      }
    });
  }
   }