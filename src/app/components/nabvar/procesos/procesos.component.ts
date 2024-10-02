import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-procesos',
  standalone: true,
  imports: [],
  templateUrl: './procesos.component.html',
  styleUrl: './procesos.component.scss'
})
export class ProcesosComponent implements AfterViewInit  {


  ngAfterViewInit(): void {
     const carouselElement = document.querySelector('#carouselExampleIndicators');
    const itemsPerSlide = window.innerWidth >= 768 ? 2 : 1;
    const carouselItems = carouselElement?.querySelectorAll('.carousel-item');

    carouselElement?.addEventListener('slide.bs.carousel', (event: any) => {
      const totalItems = carouselItems?.length;
      const currentIndex = event.to;

      if (currentIndex >= totalItems! - (itemsPerSlide - 1)) {
        event.preventDefault(); // Detiene el comportamiento por defecto del carrusel
        const carouselInner = carouselElement.querySelector('.carousel-inner');
        carouselInner?.insertAdjacentHTML('beforeend', carouselInner.children[0].outerHTML); // Clona el primer elemento
        carouselInner?.removeChild(carouselInner.children[0]); // Remueve el primer elemento
      }
    });
  }

}
