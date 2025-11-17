import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-gerente-dashboard',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, ButtonModule, CardModule, CommonModule, ToolbarModule],
  templateUrl: './gerente-dashboard.html',
  styleUrls: ['./gerente-dashboard.css'],
  standalone: true,
})

export class GerenteDashboardComponent {

  constructor(private router: Router) {}

  // TODO métodos a implementar
  editarPerfil() {
    this.router.navigate(['/gerente/editar']);
  }

  verNegocios() {
    this.router.navigate(['/gerente/negocios']);
  }

  logout() {
    // lógica de logout (limpiar localStorage + redirect)
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  index() {
    this.router.navigate(['/gerente/dashboard']);
  }
}
