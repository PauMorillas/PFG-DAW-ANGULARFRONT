import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ReservasCalendar } from '../reservas-calendar/reservas-calendar';
import { NegociosGerente } from '../negocios-gerente/negocios-gerente';
import { NegocioService } from '../../services/negocio.service';
import { Negocio } from '../../models/negocio.interface';
import { GerenteToolbar } from "../gerente-toolbar/gerente-toolbar";

@Component({
  selector: 'app-gerente-dashboard',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CommonModule,
    ToolbarModule,
    ToastModule,
    ReservasCalendar,
    GerenteToolbar
],
  templateUrl: './gerente-dashboard.html',
  styleUrls: ['./gerente-dashboard.css'],
  standalone: true,
})
export class GerenteDashboardComponent implements OnInit {
  session!: boolean;

  idNegocioSeleccionado?: number;

  negocios?: Negocio[];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private negocioService: NegocioService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('session')) {
      this.session = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debes iniciar sesión',
        sticky: true,
        key: 'sessionCheck',
      });
    } else {
      this.session = true;
      this.cargarNegociosDelGerente();
    }
  }

  cargarNegociosDelGerente() {
    // Email
    const session = localStorage.getItem('session');
    const email = session ? JSON.parse(session).email : '';
    this.negocioService.getNegociosByEmail(email).subscribe({
    next: (negocios) => {
      this.negocios = negocios;

      // Seleccionamos automáticamente el primero si existe
      if (negocios.length > 0) {
        this.idNegocioSeleccionado = negocios[0].id;
      }
    },
    error: (err) => console.error('Error cargando negocios del gerente', err)
  });
  }

  // TODO métodos a implementar
  editarPerfil() {
    this.router.navigate(['/gerente/editar']);
  }

  verNegocios() {
    this.router.navigate(['/dashboard/negocios']);
  }

  seleccionarNegocio(id: number) {
    this.idNegocioSeleccionado = id;
  }

  logout() {
    // lógica de logout (limpiar localStorage + redirect)
    localStorage.removeItem('session');
    this.router.navigate(['/login-gerente']);
  }

  index() {
    this.router.navigate(['/gerente/dashboard']);
  }

  redirectToLogin() {
    this.router.navigate(['/login-gerente']);
  }
}
