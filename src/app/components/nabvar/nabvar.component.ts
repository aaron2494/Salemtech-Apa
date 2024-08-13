
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  imports: [],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.scss'
})
export class NabvarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.checkScroll();
  }

  checkScroll(): void {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) { // Ajusta el valor para cuando el navbar se reduzca
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }
}
