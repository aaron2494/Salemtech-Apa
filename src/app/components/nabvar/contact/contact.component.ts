import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component} from '@angular/core';
import {  FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent{
 
  constructor(private http: HttpClient) { }
  

    consulta = {
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    };

    isLoading = false; // Control del spinner

    enviarConsulta(form: any) {
      if (form.valid) {
        this.isLoading = true; // Activar el spinner
        this.http.post<{ message: string }>('https://backend-email.vercel.app/send-email', this.consulta)
          .subscribe(
            response => {
              this.isLoading = false; // Desactivar el spinner
              Swal.fire({
                icon: 'success',
                title: 'Correo enviado con éxito',
                text: response.message,
                confirmButtonText: 'OK'
              });
            },
            error => {
              this.isLoading = false; // Desactivar el spinner
              Swal.fire({
                icon: 'error',
                title: 'Error al enviar el correo',
                text: 'Ocurrió un problema al intentar enviar el correo. Por favor, intenta nuevamente.',
                confirmButtonText: 'OK'
              });
            }
          );
      }
    }
 }