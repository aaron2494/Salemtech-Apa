import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, NgModel } from '@angular/forms';
import { NabvarComponent } from "../nabvar/nabvar.component";
import { ContactComponent } from '../nabvar/contact/contact.component';
import { FooterComponent } from "../footer/footer.component";

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
  imports: [CommonModule, NabvarComponent, NgFor, ContactComponent, FooterComponent],
  templateUrl: './seccion2.component.html',
  styleUrls: ['./seccion2.component.scss']
})
export class Seccion2Component implements OnInit {
  isExpanded = false;
  isMobile = false;

  // Cambia el estado de expansión al hacer clic
  toggleContent() {
    this.isExpanded = !this.isExpanded;
  }

  // Escucha el tamaño de la pantalla para ocultar el botón en pantallas grandes
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  ngOnInit() {
    this.checkIfMobile();
  }

  // Revisa si el dispositivo es móvil o no
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  miembros: MiembroEquipo[] = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      cargo: 'Ingeniero Químico',
      imagen: 'assets/foto_cv.jpg',
      descripcion: 'Experiencia en simulación dinámica de procesos...'
    },
    {
      id: 2,
      nombre: 'Juan Pérez',
      cargo: 'Ingeniero Químico',
      imagen: 'assets/foto_cv.jpg',
      descripcion: 'Experiencia en simulación dinámica de procesos...'
    },
    {
      id: 3,
      nombre: 'Juan Pérez',
      cargo: 'Ingeniero Químico',
      imagen: 'assets/foto_cv.jpg',
      descripcion: 'Experiencia en simulación dinámica de procesos...'
    },
    {
      id: 4,
      nombre: 'Juan Pérez',
      cargo: 'Ingeniero Químico',
      imagen: 'assets/foto_cv.jpg',
      descripcion: 'Experiencia en simulación dinámica de procesos...'
    },
    // ... otros miembros
  ];
}


