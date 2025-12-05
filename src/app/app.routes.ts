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
import { ReservaDetail } from './components/reserva-detail/reserva-detail';
import { NegociosGenerarScript } from './components/negocios-generar-script/negocios-generar-script';
import { EmbedbookLanding } from './components/embedbook-landing/embedbook-landing';

import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: EmbedbookLanding },

  // ==== Rutas para formularios (SIEMPRE PÚBLICAS) ====
  { path: 'registro-gerente', component: UsuarioForm, data: { rol: 'GERENTE', modo: 'REGISTRO' } },
  { path: 'registro-cliente', component: UsuarioForm, data: { rol: 'CLIENTE', modo: 'REGISTRO' } },
  { path: 'editar-gerente', component: UsuarioForm, data: { rol: 'GERENTE', modo: 'EDICION' }, canActivate: [AuthGuard] },
  { path: 'editar-cliente', component: UsuarioForm, data: { rol: 'CLIENTE', modo: 'EDICION' }, canActivate: [AuthGuard] },

  // ==== Logins (PÚBLICO) ====
  { path: 'login-gerente', component: UsuarioLogin, data: { rol: 'GERENTE' } },
  { path: 'login-cliente', component: UsuarioLogin, data: { rol: 'CLIENTE' } },

  // === Dashboard (PROTEGIDO) ===
  { path: 'dashboard', component: GerenteDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/negocios', component: NegociosGerente, canActivate: [AuthGuard] },

  // === Rutas de negocios (PROTEGIDAS) ===
  { path: 'dashboard/negocios/crear', component: NegociosForm, canActivate: [AuthGuard] },
  { path: 'dashboard/negocios/:id/editar', component: NegociosForm, canActivate: [AuthGuard] },

  // === Servicios (PROTEGIDAS) ===
  { path: 'dashboard/negocios/:id/servicios/crear', component: ServiciosForm, canActivate: [AuthGuard] },
  { path: 'dashboard/negocios/:id/servicios/:idServicio/editar', component: ServiciosForm, canActivate: [AuthGuard] },
  { path: 'dashboard/negocios/:id/servicios', component: ServiciosNegocio, canActivate: [AuthGuard] },
  { path: 'dashboard/negocios/:id/generar-script', component: NegociosGenerarScript, canActivate: [AuthGuard] },

  // === Reservas (PROTEGIDAS) ===
  { path: 'dashboard/reservas/negocio/:id', component: ReservasCalendar, data: { modo: 'negocio' }, canActivate: [AuthGuard] },
  { path: 'dashboard/reservas/servicio/:id', component: ReservasCalendar, data: { modo: 'servicio' }, canActivate: [AuthGuard] },

  // === Detalle reserva (PROTEGIDA) ===
  { path: 'reservas/detalle/:id', component: ReservaDetail, canActivate: [AuthGuard] },

  // === Ruta fallback ===
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
