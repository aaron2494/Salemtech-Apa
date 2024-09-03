import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
    consulta = {
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    };
  
    enviarConsulta(contactForm: NgForm) {
      if (contactForm.valid) {
        const templateParams = {
          from_name: this.consulta.nombre,
          from_email: this.consulta.email,
          phone: this.consulta.telefono,
          subject: this.consulta.asunto,
          message: this.consulta.mensaje
        };
  
        emailjs.send('service_23f1zaj', 'template_wb0ybs9', templateParams, 'u8Vz8nts2MqNMtH5E')
          .then(response => {
            console.log('Correo enviado con éxito', response);
            Swal.fire({
              icon: 'success',
              title: '¡Correo Enviado!',
              text: 'Tu consulta ha sido enviada con éxito.',
              confirmButtonText: 'Cerrar'
            }).then(() => {
              this.limpiarFormulario();
            });
          })
          .catch(error => {
            console.error('Error al enviar el correo', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al enviar el correo. Por favor, intenta nuevamente.',
              confirmButtonText: 'Cerrar'
            });
          });
      } else {
        console.error('Por favor, completa todos los campos requeridos.');
        // Marca todos los campos como tocados para que se muestre la validación
        Object.values(contactForm.controls).forEach(control => control.markAsTouched());
      }
    }
  
    limpiarFormulario() {
      this.consulta = {
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      };
    }
  }