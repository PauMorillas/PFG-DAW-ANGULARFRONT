import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'usuario-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, ButtonModule, CardModule, CommonModule, ToastModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
// Inyecta el servicio por constructor
export class UsuarioForm implements OnInit {
  rol: 'CLIENTE' | 'GERENTE' = 'CLIENTE';
  modo: 'REGISTRO' | 'EDICION' = 'REGISTRO';
  userForm!: FormGroup; // Inicializa el formulario sin necesidad de asignarle un valor en constructor
  constructor(
      private usuarioService: UsuarioService,
      private messageService: MessageService,
      private route: ActivatedRoute
    ) {}

  public guardarUsuario(usuario?: any) {
    // Llama al método del servicio para guardar el Usuario
    if (this.userForm.valid) {
      this.usuarioService.save(usuario).subscribe({
        next: (resp) => {
          // Backend devuelve un map con success y message
          if (resp && resp.success) {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: resp.message });
            // reset del formulario
            this.userForm.reset();
          } else {
            const msg = resp?.message || 'Error al guardar el Usuario';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
          }
        },
        error: (err) => {
          // err puede contener body con message
          const serverMsg = err?.error?.message || err?.message || 'Error desconocido del servidor';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: serverMsg });
          console.error('Error en guardarUsuario:', err);
        }
      });
    }
  }

  // Al iniciar el componente, configura el formulario reactivo con Validators
  ngOnInit(): void {
    this.rol = this.route.snapshot.data['rol'] || this.rol;
    this.modo = this.route.snapshot.data['modo'] || this.modo;

    this.userForm = new FormGroup({
      nombre: new FormControl('Manolito', Validators.required), // Campo 'nombre' es requerido
      email: new FormControl('ejemplo@gmail.com', [Validators.required, Validators.email]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
      ]), // Mínimo ocho caracteres, al menos una letra y un número
      telf: this.rol === 'GERENTE'
          ? new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9}$')])
          : new FormControl('') // opcional para clientes
    });

    // TODO: si estás editando, cargar datos desde un servicio
    /* if (this.modo === 'EDICION') {
      this.loadUsuario();
    } */
  }

  onSubmit() {
    if (this.userForm.valid) {
      const usuario = {
        ...this.userForm.value,
         rol: this.rol};

      try {
        this.guardarUsuario(usuario);
      } catch (e) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Hubo un problema al guardar el Usuario: ${e}`
        });
      }
      console.log('Datos enviados del formulario: ', this.userForm.value);
      // Marcar todos los campos como 'touched' para mostrar los errores
      this.userForm.markAllAsTouched();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de validación',
        detail: 'Revisa los campos obligatorios.'
      });

      this.userForm.markAllAsTouched(); // Misma estrategia aquí
    }
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.userForm.get(controlName);

    // 1. Si no hay control, o no se ha tocado, o es válido, no hay mensaje de error.
    if (!control || !control.touched || control.valid) {
      return null;
    }

    if (control.errors?.['required']) {
      return 'Este campo es obligatorio';
    }

    if (controlName === 'email' && control.errors?.['email']) {
      return 'El formato del correo electrónico no es válido';
    }

    if (controlName === 'pass') {
      if (control.errors?.['minlength']) {
        const requiredLength = control.errors?.['minlength'].requiredLength || 8;
        return `La contraseña debe tener al menos ${requiredLength} caracteres`;
      }

      if (control?.value.includes(' ')) {
        return 'La contraseña no puede contener espacios';
      }

      if (control.errors?.['pattern']) {
        return 'La contraseña debe contener al menos una letra y un número';
      }
    }

    // En caso de otro error inesperado, mostrar un mensaje genérico 
    return 'Error de validación desconocido';
  }

  // Metodos para hacer dinámica la interfaz
  get titulo(): string {
    if (this.modo === 'EDICION') {
      return this.rol === 'GERENTE' ? 'Editar perfil de Gerente' : 'Editar perfil de Cliente';
    }
    return this.rol === 'GERENTE' ? 'Registro de Gerente' : 'Registro de Cliente';
  }

  get textoBoton(): string {
    return this.modo === 'EDICION' ? 'Guardar cambios' : 'Registrar';
  }
}
