import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa el módulo de animaciones
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Asegúrate de que la ruta de tu archivo de rutas sea correcta
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule), // Asegúrate de incluir este proveedor
    provideRouter(routes) // Proporciona el enrutador
  ]
}).catch(err => console.error(err));