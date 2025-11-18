import { Component } from '@angular/core';
import { NegocioService } from '../../services/negocio.service';
import { MessageService } from 'primeng/api';
import { Negocio } from '../../models/negocio.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-negocios-form',
  imports: [CommonModule, FormsModule, InputTextModule,
  ButtonModule],
  templateUrl: './negocios-form.html',
  styleUrl: './negocios-form.css',
})
export class NegociosForm {
  public negocio: Negocio = {
    id: 0,
    nombre: '',
    correoElec: '',
    telfContacto: '',
    horaApertura: '',
    horaCierre: '',
    correoGerente: '',
  };
  constructor(
    private negocioService: NegocioService,
    private messageService: MessageService) {}

  onSubmit() {
    if (!this.negocio.id) {
      console.error('No se puede actualizar: el negocio no tiene ID');
      return;
    }
    this.negocioService.updateNegocio(this.negocio.id, this.negocio).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Negocio actualizado',
        });
        // Redirigir o recargar lista si hace falta
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar',
        });
        console.error(err);
      },
    });
  }
}
