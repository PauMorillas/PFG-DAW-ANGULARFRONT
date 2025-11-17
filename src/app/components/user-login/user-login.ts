import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, CardModule, CommonModule, ToastModule],
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.css']
})
export class LoginForm implements OnInit {
  loginForm!: FormGroup;
  
  constructor(private authService: AuthService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Revisa los campos obligatorios.' });
      return;
    }

    const credentials: LoginRequest = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (resp: LoginResponse) => {
        localStorage.setItem('usuario', JSON.stringify(resp));
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Login correcto' });
      },
      error: (err: any) => {
        // err ahora es tipado como HttpErrorResponse
        const msg = err?.error || 'Usuario o contraseña incorrectos';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
      }
    });
  }
}
