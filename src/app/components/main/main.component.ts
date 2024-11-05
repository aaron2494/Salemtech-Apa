import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { MenuItemComponent } from '../nabvar/menu-item/menu-item.component';

import { NosotrosComponent } from "../nabvar/que-hacemos/nosotros.component";
import { NuestraManeraComponent } from "../nabvar/integraciones/nuestra-manera.component";
import { ActivatedRoute } from '@angular/router';
import { ContactComponent } from '../nabvar/contact/contact.component';
import { NgIf } from '@angular/common';
import { ProcesosComponent } from "../nabvar/procesos/procesos.component";
import { PersonalComponent } from "../nabvar/personal/personal.component";
import { JefesComponent } from "../nabvar/jefes/jefes.component";
import { DragosComponent } from "../nabvar/dragos/dragos.component";



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    BannerComponent,
    MenuItemComponent, NosotrosComponent, NuestraManeraComponent, ContactComponent, NgIf,
    ProcesosComponent,
    PersonalComponent,
    JefesComponent,
    DragosComponent
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnDestroy {
  nuestraManeraLoaded = false;
  contactLoaded = false;
  procesosLoaded = false;
  personalLoaded =false;
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

    if (!this.nuestraManeraLoaded && scrollY > 400) {
      this.nuestraManeraLoaded = true;
      this.cdr.detectChanges();
    }
    if (!this.procesosLoaded && scrollY > 500) {
      this.procesosLoaded = true;
      this.cdr.detectChanges();
    }
    // Condiciones para cargar NuestraManeraComponent
    if (!this.personalLoaded && scrollY > 600) {
      this.personalLoaded = true;
      this.cdr.detectChanges();
    }
   
  
  }

  ngOnDestroy() {
    // Eliminar el event listener cuando se destruye el componente
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
}
