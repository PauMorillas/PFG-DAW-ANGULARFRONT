import { Routes } from '@angular/router';
import { provideRouter, RouterModule } from '@angular/router';
import { UsuarioForm } from './components/usuario-form/usuario-form';
import { GerenteDashboardComponent } from './components/gerente-dashboard/gerente-dashboard';
import { NegociosGerente } from './components/negocios-gerente/negocios-gerente';
import { UsuarioLogin } from './components/user-login/user-login';
import { NegociosForm } from './components/negocios-editar/negocios-form';

export const routes: Routes = [
  { path: '', redirectTo: 'registro-gerente', pathMatch: 'full' },

  // ==== Rutas para formulario ====
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

  {
    path: 'login-gerente',
    component: UsuarioLogin,
    data: { rol: 'GERENTE'},
  },

  // === Rutas para el Dashboard de Gerente ===
  { path: 'dashboard', component: GerenteDashboardComponent },

  { path: 'dashboard/negocios', component: NegociosGerente },

  { path: 'dashboard/negocios/:id/editar', component: NegociosForm },
  { path: 'dashboard/negocios/nuevo', component: NegociosForm },        // Para crear


  // Ruta fallback
  { path: '**', redirectTo: 'registro-gerente' },
];
