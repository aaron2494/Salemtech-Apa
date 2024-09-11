import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-nuestra-manera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nuestra-manera.component.html',
  styleUrl: './nuestra-manera.component.scss'
})
export class NuestraManeraComponent implements AfterViewInit {
constructor(private el:ElementRef, private renderer: Renderer2,) {};
isImageExpanded = false;

  ngAfterViewInit(): void {
    
  }
  toggleImageSize(event: MouseEvent): void {
    const image = event.target as HTMLImageElement;
    const overlay = this.el.nativeElement.querySelector('#imageOverlay');
    if (this.isImageExpanded) {
      image.classList.remove('expanded');
      this.renderer.removeClass(overlay, 'show');
    } else {
      image.classList.add('expanded');
        this.renderer.addClass(overlay, 'show');
      
    }
    this.isImageExpanded = !this.isImageExpanded; // Cambia el estado de expansión
  }
  // Escucha eventos globales para detectar clics fuera de la imagen
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const image = this.el.nativeElement.querySelector('.enlargable-image');
    const overlay = this.el.nativeElement.querySelector('#imageOverlay');

    // Si se hace clic fuera de la imagen y está expandida, la contrae y esconde el overlay
    if (this.isImageExpanded && !image.contains(clickedElement)) {
      this.renderer.removeClass(image, 'expanded');
      this.renderer.removeClass(overlay, 'show');
      this.isImageExpanded = false;
    }
  }
  
}
