import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Carousel } from 'bootstrap';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent implements AfterViewInit{
  @ViewChild('carouselExample', { static: false }) carouselElement!: ElementRef;
  constructor(private el:ElementRef) {};
  images = [
    '../../../../assets/calidad.jpg',
    '../../../../assets/concepto-control-calidad-estandar-m.jpg',
    '../../../../assets/concepto-collage-control-calidad-estandar.jpg'
  ];


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeCarousels();
    }, 0);
  }
  private initializeCarousels() {
  const imagesCarouselElement = this.el.nativeElement.querySelector('#imagescarousel');
  if (imagesCarouselElement) {
    new Carousel(imagesCarouselElement, {
      interval: 7000,
      ride: 'carousel'
    });
  }
}
}
