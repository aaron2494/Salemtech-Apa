import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

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

  enviarConsulta() {
    if (this.consulta.nombre && this.consulta.email && this.consulta.asunto && this.consulta.mensaje) {
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
          // Puedes agregar aquí una notificación o redirigir al usuario
        })
        .catch(error => {
          console.error('Error al enviar el correo', error);
          // Puedes agregar aquí una notificación de error
        });
    } else {
      console.error('Por favor, completa todos los campos requeridos.');
    }
  }
}

