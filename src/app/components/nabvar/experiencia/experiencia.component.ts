import { CommonModule } from '@angular/common';
import {  AfterViewInit, Component, ElementRef, Renderer2} from '@angular/core';


@Component({
  selector: 'app-experiencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiencia.component.html',
  styleUrl: './experiencia.component.scss'
})
export class ExperienciaComponent{
  
  isOpen = [false, false, false]; // Maneja el estado de cada acordeón

  toggleAccordion(index: number) {
    this.isOpen[index] = !this.isOpen[index];
  
    const content = document.querySelectorAll('.accordion-content')[index] as HTMLElement;
  
    if (this.isOpen[index]) {
      content.style.maxHeight = content.scrollHeight + 'px'; // Altura dinámica del contenido
    } else {
      content.style.maxHeight = '0';
    }
} }
    

