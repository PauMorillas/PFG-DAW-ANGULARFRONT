import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.interface';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    CommonModule,
    ToastModule,
  ],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css'],
})
export class UsuarioLogin implements OnInit {
  rol: 'GERENTE' | 'CLIENTE' = 'CLIENTE';

  loginForm!: FormGroup;

  parentOrigin = 'https://embedbookapp.com';

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkSession();

    this.route.data.subscribe((data) => {
      if (data['rol']) {
        this.rol = data['rol'];
      }
    });

    // 1. Leer parentOrigin desde la URL
    const params = new URLSearchParams(window.location.search);
    const originParam = params.get('parentOrigin');
    // Leer datos de la ruta
    const routeData = this.route.snapshot.data;
    this.rol = routeData['rol'] || 'CLIENTE';

    if (originParam) {
      this.parentOrigin = originParam;
    }

    const o = params.get('parentOrigin');
    if (o) {
      this.parentOrigin = o;
    } else {
      // Fallback seguro si no viene en URL
      try {
        this.parentOrigin = new URL(document.referrer).origin || this.parentOrigin;
      } catch {
        this.parentOrigin = 'https://embedbookapp.com'; // TODO: Produccion Reemplaza con el origen de la app padre
      }
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
      ]),
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revisa los campos.',
      });
      return;
    }

    const credentials: LoginRequest = this.loginForm.value;

    if (this.rol === 'GERENTE') {
      this.authService.loginGerente(credentials).subscribe({
        next: (resp: LoginResponse) => {
          const session = {
            email: resp.email,
            rol: resp.rol,
            expiresAt: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 días
          };
          localStorage.setItem('session', JSON.stringify(session));
          this.messageService.add({
            severity: 'success',
            summary: 'Login correcto',
            detail: `Bienvenido ${resp.email}`,
          });

          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500); // 1 segundo y medio
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message || 'Credenciales incorrectas',
          });
        },
      });
    } else if (this.rol === 'CLIENTE') {
      this.authService.loginCliente(credentials).subscribe({
        next: (resp: Usuario) => {
          if (resp.rol === 'CLIENTE') {
            this.messageService.add({
              severity: 'success',
              summary: 'Login correcto',
              detail: `Bienvenido ${resp.email}`,
            });
          }
          const session = {
            email: resp.email,
            rol: resp.rol,
            expiresAt: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 días
          };
          localStorage.setItem('session', JSON.stringify(session));

          setTimeout(() => {
            // Envía datos al padre con ORIGIN REAL
            if (window.parent) {
              try {
                const payload = {
                  nombreCliente: resp.nombre,
                  correoElec: resp.email,
                  telf: resp.telefono || '',
                };
                window.parent.postMessage(
                  { type: 'clienteData', data: payload },
                  this.parentOrigin
                );
              } catch (e) {
                window.parent.postMessage({ type: 'clienteData', data: resp }, this.parentOrigin);
              }
            }
          }, 1250);
        },
        error: (err: any) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err?.error?.message || 'Credenciales incorrectas',
          });
        },
      });
    }
  }

  private checkSession(): void {
    const sessionStr = localStorage.getItem('session');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      if (Date.now() > session.expiresAt) {
        localStorage.removeItem('session'); // sesión expirada
      }
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.loginForm.get(controlName);

    if (!control || !control.touched || control.valid) {
      return null;
    }

    if (control.errors?.['required']) {
      return 'Este campo es obligatorio';
    }

    if (controlName === 'email' && control.errors?.['email']) {
      return 'El formato del correo electrónico no es válido';
    }

    if (controlName === 'password') {
      if (control.errors?.['minlength']) {
        const requiredLength = control.errors?.['minlength'].requiredLength || 8;
        return `La contraseña debe tener al menos ${requiredLength} caracteres`;
      }

      if (control.value.includes(' ')) {
        return 'La contraseña no puede contener espacios';
      }

      if (control.errors?.['pattern']) {
        return 'La contraseña debe contener al menos una letra y un número';
      }
    }

    return 'Error de validación desconocido';
  }

  redirectToRegister() {
    if (this.rol === 'GERENTE') {
      this.router.navigate(['/registro-gerente']);
    } else if (this.rol === 'CLIENTE') {
      this.router.navigate(['/registro-cliente']);
    } else {
      throw new Error('Rol de usuario desconocido');
    }
  }
}
