import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  canActivate(): boolean | UrlTree {
    const sessionStr = localStorage.getItem('session');

    // No existe sesión
    if (!sessionStr) {
      return this.redirectToLogin();
    }

    try {
      const session = JSON.parse(sessionStr);

      // Sesión expirada
      if (Date.now() > session.expiresAt) {
        localStorage.removeItem('session');
        return this.redirectToLogin();
      }

      // Sesión válida → permitir navegación
      return true;

    } catch {
      // sesión corrupta
      localStorage.removeItem('session');
      return this.redirectToLogin();
    }
  }

  private redirectToLogin(): UrlTree {
    return window.location.pathname.includes('cliente')
      ? this.router.parseUrl('/login-cliente')
      : this.router.parseUrl('/login-gerente');
  }

  constructor(private router: Router) {}
}