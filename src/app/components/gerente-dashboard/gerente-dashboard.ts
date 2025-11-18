import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-gerente-dashboard',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, ButtonModule, CardModule, CommonModule, ToolbarModule, ToastModule],
  templateUrl: './gerente-dashboard.html',
  styleUrls: ['./gerente-dashboard.css'],
  standalone: true,
})

export class GerenteDashboardComponent implements OnInit{

  session!: boolean;

  constructor(private router: Router, private messageService: MessageService) {}
  ngOnInit(): void {
    if (!localStorage.getItem('session')) {
      this.session = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debes iniciar sesión',
        sticky: true,
        key: 'sessionCheck'
      })
    } else {
      this.session = true;
    }
  }

  // TODO métodos a implementar
  editarPerfil() {
    this.router.navigate(['/gerente/editar']);
  }

  verNegocios() {
    this.router.navigate(['/dashboard/negocios']);
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
