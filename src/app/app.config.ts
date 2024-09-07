import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa el módulo de animaciones
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule) // Asegúrate de incluir este proveedor
  ]
}).catch(err => console.error(err));