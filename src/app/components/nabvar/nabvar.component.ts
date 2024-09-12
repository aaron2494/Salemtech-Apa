import { CommonModule, NgClass, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nabvar',
  standalone: true,
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.scss'],
  imports: [NgIf, NgClass,FormsModule, CommonModule], // Asegúrate de que NgIf esté aquí
})
export class NabvarComponent implements OnInit{
  @ViewChild('contactModal') contactModal!: TemplateRef<any>;
  isNavbarCollapsed = true;
  public isInSeccion2: boolean = false;
  public router: Router;
 
  
  constructor(private http: HttpClient,router: Router, private cdr: ChangeDetectorRef, private modalService:NgbModal) {
    this.router = router;
  }
  consulta = {
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  };
  openContactModal() {
    const modalRef = this.modalService.open(this.contactModal, {
      ariaLabelledBy: 'contactModalLabel',
      size: 'lg'
    });

  } 
  

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica si la URL actual corresponde a '/seccion2'
        this.isInSeccion2 = event.urlAfterRedirects.includes('/seccion2');
        console.log('isInSeccion2: ', this.isInSeccion2); // Para verificar

        // Forzamos la detección de cambios con un pequeño retraso
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      }
    });
  
  }
  enviarConsulta(form: any) {
    if (form.valid) {
      this.http.post<{ message: string }>('https://backend-email.vercel.app/send-email', this.consulta)
        .subscribe(
          response => {
            // Mostrar SweetAlert de éxito
            Swal.fire({
              icon: 'success',
              title: 'Correo enviado con éxito',
              text: response.message,
              confirmButtonText: 'OK'
            });
  
            // Reiniciar el formulario
            this.modalService.dismissAll();
          },
          error => {
            // Mostrar SweetAlert de error
            Swal.fire({
              icon: 'error',
              title: 'Error al enviar el correo',
              text: 'Ocurrió un problema al intentar enviar el correo. Por favor, intenta nuevamente.',
              confirmButtonText: 'OK'
            });
            console.log(error);
          }
        );
    }
}

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  handleNavClick(section: string): void {
    this.router.navigate(['/'], { fragment: section });
    this.isNavbarCollapsed = true; // Colapsa el navbar después de la navegación
  }

  navigateToSeccion2() {
    this.router.navigate(['/seccion2']).then(() => {
      window.scrollTo(0, 0); // Fuerza el scroll a la parte superior de la página
    });
    this.isNavbarCollapsed = true; // Colapsa el navbar después de la navegación
  }
  // Método para manejar el scroll hacia una sección específica
  scrollToSection(section: string): void {
    // Navega a la ruta principal y al fragmento, si es necesario
    this.router.navigate(['/'], { fragment: section }).then(() => {
      // Forza el scroll incluso si ya estás en la URL
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      this.isNavbarCollapsed = true; // Colapsa el navbar después de hacer clic
    });
  }
 
}
