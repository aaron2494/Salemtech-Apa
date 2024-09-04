import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NabvarComponent } from "../nabvar/nabvar.component";

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
  imports: [ NabvarComponent,NgFor],
  templateUrl: './seccion2.component.html',
  styleUrl: './seccion2.component.scss'

})
export class Seccion2Component {
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
    // ... otros miembros
  ];
}
