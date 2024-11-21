import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener} from '@angular/core';
import { ContactComponent } from "../nabvar/contact/contact.component";


interface MiembroEquipo {
  id:number;
  nombre: string;
  cargo: string;
  imagen: string;
  descripcion: string;
}

@Component({
  selector: 'app-seccion2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion2.component.html',
  styleUrls: ['./seccion2.component.scss']
})
export class Seccion2Component implements AfterViewInit {
  seccion: HTMLElement[] = [];

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Obtén todas las cards
    this.seccion = Array.from(this.elRef.nativeElement.querySelectorAll('.seccion'));
    this.checkVisibility();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    this.checkVisibility();
  }

  private checkVisibility(): void {
    const windowHeight = window.innerHeight;

    // Asegúrate de que cada tarjeta tiene la animación aplicada correctamente
    this.seccion.forEach((seccion, index) => {
      const rect = seccion.getBoundingClientRect();
      if (rect.top < windowHeight * 0.8) {
        // Aplica un retraso escalonado solo en escritorio (ancho > 768px)
        if (window.innerWidth > 768) {
          setTimeout(() => {
            seccion.classList.add('animate');
          }, index * 100); // Retraso de 300ms entre cartas
        } else {
          // En móviles, aplica la clase sin retraso
          seccion.classList.add('animate');
        }
      }
    });
  }
 }


