import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-gerente-toolbar',
  imports: [Toolbar, ButtonModule],
  standalone: true,
  templateUrl: './gerente-toolbar.html',
  styleUrl: './gerente-toolbar.css',
})

export class GerenteToolbar {
  constructor(private router: Router) {}

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goPerfil() {
    this.router.navigate(['/editar-gerente']);
  }

  logout() {
    localStorage.removeItem('session');
    this.router.navigate(['/login-gerente']);
  }
}
