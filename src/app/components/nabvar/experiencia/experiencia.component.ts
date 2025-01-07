import { CommonModule } from '@angular/common';
import {  AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';


@Component({
  selector: 'app-experiencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiencia.component.html',
  styleUrl: './experiencia.component.scss'
})
export class ExperienciaComponent implements AfterViewInit{
  private touchStartX: number = 0;
   constructor(private el: ElementRef, private renderer: Renderer2) {}
   
   ngAfterViewInit(): void {
     const carousel = this.el.nativeElement.querySelector('#experienceCarousel');
 
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

