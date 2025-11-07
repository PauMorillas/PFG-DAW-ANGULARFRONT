import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, ButtonModule, CardModule, CommonModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
// Inyecta el servicio por constructor
export class ClienteForm implements OnInit {
  userForm!: FormGroup; // Inicializa el formulario sin necesidad de asignarle un valor en constructor
  isIncorrectForm: boolean = false;

  constructor(private clienteService: ClienteService, private messageService: MessageService) { }

  public guardarCliente() {
    // Llama al método del servicio para guardar el cliente
    this.clienteService.save();
  }

  // Al iniciar el componente, configura el formulario reactivo con Validators
  ngOnInit(): void {
    this.userForm = new FormGroup({
      nombre: new FormControl('Manolito', Validators.required), // Campo 'nombre' es requerido
      email: new FormControl('ejemplo@gmail.com', [Validators.required, Validators.email]),
      telf: new FormControl(''), // Campo 'telefono' no es requerido;
      // Mínimo ocho caracteres, al menos una letra y un número
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
      ])
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Cliente guardado correctamente.'
      });

      try {
        this.guardarCliente();
      } catch (e) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Hubo un problema al guardar el cliente: ${e}`
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

      this.userForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
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
}
