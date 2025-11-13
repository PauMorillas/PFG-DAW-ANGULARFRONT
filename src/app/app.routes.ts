import { Routes } from '@angular/router';
import { provideRouter, RouterModule } from '@angular/router';
import { UsuarioForm } from './components/usuario-form/usuario-form';
import { GerenteDashboardComponent } from './components/gerente-dashboard/gerente-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'registro-gerente', pathMatch: 'full' },

  // Rutas para formulario
  {
    path: 'registro-gerente',
    component: UsuarioForm,
    data: { rol: 'GERENTE', modo: 'REGISTRO' },
  },
  {
    path: 'registro-cliente',
    component: UsuarioForm,
    data: { rol: 'CLIENTE', modo: 'REGISTRO' },
  },
  {
    path: 'editar-gerente',
    component: UsuarioForm,
    data: { rol: 'GERENTE', modo: 'EDICION' },
  },

  // Dashboard
  { path: 'dashboard', component: GerenteDashboardComponent },

  // Ruta fallback
  { path: '**', redirectTo: 'registro-gerente' },
];
