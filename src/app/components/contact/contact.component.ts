import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component} from '@angular/core';
import {  FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule,],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent{
  constructor(private http: HttpClient ) { }
  

    consulta = {
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    };

    
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
              form.reset();
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
 }