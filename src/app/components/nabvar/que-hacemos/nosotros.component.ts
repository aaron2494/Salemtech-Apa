import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent implements OnInit {
  constructor ( ){}
  ngOnInit(): void {
   
  }
  isOpen = [false, false, false]; // Maneja el estado de cada acordeón

  toggleAccordion(index: number) {
    this.isOpen[index] = !this.isOpen[index];
  }
}
