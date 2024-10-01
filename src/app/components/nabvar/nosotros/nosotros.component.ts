import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule,NgFor,NgIf,NgOptimizedImage],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent {
  isOpen = [false, false, false]; // Maneja el estado de cada acordeón

  toggleAccordion(index: number) {
    this.isOpen[index] = !this.isOpen[index];
  }
}
