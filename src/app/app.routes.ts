import { Routes } from '@angular/router';
import { provideRouter, RouterModule } from '@angular/router';
import { UsuarioForm } from './components/usuario-form/usuario-form';
import { GerenteDashboardComponent } from './components/gerente-dashboard/gerente-dashboard';
import { NegociosGerente } from './components/negocios-gerente/negocios-gerente';
import { UsuarioLogin } from './components/user-login/user-login';
import { NegociosForm } from './components/negocios-form/negocios-form';
import { ServiciosNegocio } from './components/servicios-negocio/servicios-negocio';
import { ServiciosForm } from './components/servicios-form/servicios-form';
import { ReservasCalendar } from './components/reservas-calendar/reservas-calendar';
import { App } from './app';
import { ReservaDetail } from './components/reserva-detail/reserva-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'registro-gerente', pathMatch: 'full' },
  // ==== Rutas para formularios ====
  { path: 'registro-gerente', component: UsuarioForm, data: { rol: 'GERENTE', modo: 'REGISTRO' } },
  { path: 'registro-cliente', component: UsuarioForm, data: { rol: 'CLIENTE', modo: 'REGISTRO' } },
  { path: 'editar-gerente', component: UsuarioForm, data: { rol: 'GERENTE', modo: 'EDICION' } },
  { path: 'editar-cliente', component: UsuarioForm, data: { rol: 'CLIENTE', modo: 'EDICION' } },
  { path: 'login-gerente', component: UsuarioLogin, data: { rol: 'GERENTE' } },
  { path: 'login-cliente', component: UsuarioLogin, data: { rol: 'CLIENTE' } },

  // === Dashboard ===
  { path: 'dashboard', component: GerenteDashboardComponent },
  { path: 'dashboard/negocios', component: NegociosGerente },

  // === Rutas específicas de negocios y servicios (crear/editar primero) ===
  { path: 'dashboard/negocios/crear', component: NegociosForm },
  { path: 'dashboard/negocios/:id/editar', component: NegociosForm },

  { path: 'dashboard/negocios/:id/servicios/crear', component: ServiciosForm },
  { path: 'dashboard/negocios/:id/servicios/:idServicio/editar', component: ServiciosForm },
  { path: 'dashboard/negocios/:id/servicios', component: ServiciosNegocio },

  // === Rutas para reservas con flag de modo ===
  { path: 'dashboard/reservas/negocio/:id', component: ReservasCalendar, data: { modo: 'negocio' } },
  { path: 'dashboard/reservas/servicio/:id', component: ReservasCalendar, data: { modo: 'servicio' } },

  { path: 'reservas/detalle/:id', component: ReservaDetail },

  // === Ruta fallback al final ===
  { path: '**', redirectTo: 'registro-gerente' },
];
