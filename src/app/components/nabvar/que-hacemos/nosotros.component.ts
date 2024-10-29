import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule,NgFor,NgIf],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent {
  isOpen = [false, false, false]; // Maneja el estado de cada acordeón

  toggleAccordion(index: number) {
    this.isOpen[index] = !this.isOpen[index];
  }
}
