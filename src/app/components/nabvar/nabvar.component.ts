import { CommonModule, NgClass, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-nabvar',
  standalone: true,
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.scss'],
  imports: [NgIf, NgClass,FormsModule, CommonModule], // Asegúrate de que NgIf esté aquí
})
export class NabvarComponent implements OnInit{
  @ViewChild('contactModal') contactModal!: ElementRef;
  isNavbarCollapsed = true;
  public isInSeccion2: boolean = false;
  public router: Router;
 
  @ViewChild('navbarNavDropdown', { static: false }) navbarNavDropdown!: ElementRef
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
  openContactModal(): void {
    const modalRef = this.modalService.open(this.contactModal, {
      ariaLabelledBy: 'contactModalLabel',
      size: 'lg'
    });
    this.closeNavbar(); // Colapsar navbar después de abrir el modal
  }
  

  ngOnInit(): void {
  
  }

  toggleNavbar(navbar: HTMLElement): void {
    const navbarCollapse = new Collapse(navbar, {
      toggle: true // Alterna entre abrir y cerrar
    });
  }
  closeNavbar(): void {
    const navbarCollapse = this.navbarNavDropdown.nativeElement;
    if (navbarCollapse.classList.contains('show')) {
      // Usar Bootstrap's Collapse JavaScript para asegurar el cierre
      const collapseInstance = new (window as any).bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      collapseInstance.hide();
    }
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

   // Método para alternar el estado de colapso del navbar
  
  navigateToSeccion2() {
    this.router.navigate(['/seccion2']).then(() => {
      window.scrollTo(0, 0); // Fuerza el scroll a la parte superior de la página
    });
    this.closeNavbar(); // Colapsar navbar después de abrir el modal
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
      this.closeNavbar(); // Colapsar navbar después de abrir el modal
    });
  }
 
}
