import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { MenuItemComponent } from '../nabvar/menu-item/menu-item.component';

import { NosotrosComponent } from "../nabvar/nosotros/nosotros.component";
import { NuestraManeraComponent } from "../nabvar/nuestra-manera/nuestra-manera.component";
import { ActivatedRoute } from '@angular/router';
import { ContactComponent } from '../nabvar/contact/contact.component';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    BannerComponent,
    MenuItemComponent, NosotrosComponent, NuestraManeraComponent,ContactComponent,NgIf],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnDestroy {
  nuestraManeraLoaded = false;
  contactLoaded = false;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    this.cdr.detectChanges();
    this.onUserScroll();  // Iniciar la escucha del evento de scroll
  }

  onUserScroll() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const scrollY = window.scrollY;

    // Condiciones para cargar NuestraManeraComponent
    if (!this.nuestraManeraLoaded && scrollY > 300) {
      this.nuestraManeraLoaded = true;
      this.cdr.detectChanges();
    }

    // Condiciones para cargar ContactComponent
    if (!this.contactLoaded && scrollY > 800) {
      this.contactLoaded = true;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    // Eliminar el event listener cuando se destruye el componente
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
}
