import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

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
  items = [
    { icon: '../../../../assets/iconos_datos.png', title: 'Relevamiento de datos', description: '' },
    { icon: '../../../../assets/iconos_performance.png', title: 'Mejora de performance', description: '' },
    { icon: '../../../../assets/iconos_procesos.png', title: 'Automatizacion de procesos', description: '' },
    { icon: '../../../../assets/iconos_tecno.png', title: 'Implementacion de Tecnologias', description: '' },
  ];
  ngAfterViewInit(): void {
    // Trigger animation for icons
    this.animateIcons();
  }
  private animateIcons() {
    const icons = this.el.nativeElement.querySelectorAll('.icon-wrapper');
    icons.forEach((icon: HTMLElement, index: number) => {
      this.renderer.setStyle(icon, 'opacity', '1');
      this.renderer.setStyle(icon, 'animation', `fadeInUp 5s ease-in-out ${index * 0.2}s forwards`);
    });
  }
  toggleImageSize(event: MouseEvent): void {
    const image = event.target as HTMLImageElement;
    if (this.isImageExpanded) {
      image.classList.remove('expanded');
    } else {
      image.classList.add('expanded');
    }
    this.isImageExpanded = !this.isImageExpanded; // Cambia el estado de expansión
  }
}
