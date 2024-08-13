import { AfterViewInit, Component, ElementRef,  OnDestroy,  OnInit, Renderer2 } from '@angular/core'
import { filter } from 'rxjs';
import {  NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent implements OnInit, AfterViewInit{
  private routerSubscription: any;
  constructor(private router: Router, private renderer: Renderer2,
    private el: ElementRef) {}


    ngOnInit(): void {
      // Suscribirse a los eventos de navegación
      this.routerSubscription = this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        if (this.router.url.includes('presentation')) {
          // Espera 1 segundo antes de añadir la clase
          setTimeout(() => {
            this.renderer.addClass(this.el.nativeElement, 'show-cards');
          }, 1000);
        }
      });
    }
  
    ngAfterViewInit(): void {
      if (this.router.url.includes('presentation')) {
        setTimeout(() => {
          this.renderer.addClass(this.el.nativeElement, 'show-cards');
          console.log('show-cards class added'); // Verifica en la consola del navegador
        }, 1000);
      }
    }
  
    ngOnDestroy(): void {
      if (this.routerSubscription) {
        this.routerSubscription.unsubscribe();
      }
    }
  }