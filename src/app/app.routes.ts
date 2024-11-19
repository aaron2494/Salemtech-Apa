    import {  Routes } from '@angular/router';
    export const routes: Routes = [
        
            {
                path: '',
                loadComponent: () => import('./components/main/main.component').then(m => m.MainComponent)
            },
            {
                path: 'servicios',
                loadComponent: () => import('./components/seccion2/seccion2.component').then(m => m.Seccion2Component),
                data: { fragment: 'seccion1' }
            },

        ];