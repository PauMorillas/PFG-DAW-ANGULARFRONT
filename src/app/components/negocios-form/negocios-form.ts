import { Component } from '@angular/core';
import { NegocioService } from '../../services/negocio.service';
import { MessageService } from 'primeng/api';
import { Negocio } from '../../models/negocio.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { date } from '@primeuix/themes/aura/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Card } from "primeng/card";
import { Toast } from "primeng/toast";
import { Router } from '@angular/router';
@Component({
  selector: 'app-negocios-form',
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, DatePickerModule, Card, Toast],
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

  hApertura: Date = new Date();
  hCierre: Date = new Date();
  modoEdicion = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private negocioService: NegocioService,
    private messageService: MessageService
  ) {
    this.hApertura.setHours(6, 0, 0);
    this.hCierre.setHours(18, 0, 0);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.modoEdicion = true;
      this.negocio.id = id;

      this.negocioService.getNegocioById(id).subscribe((data) => {
        this.negocio = data;

        // Convertimos HH:mm -> Date picker
        this.hApertura = this.parseHora(data.horaApertura);
        this.hCierre = this.parseHora(data.horaCierre);
      });
    }
  }

  onSubmit() {
    // Convertimos Date → HH:mm
    this.negocio.horaApertura = this.formatTime(this.hApertura);
    this.negocio.horaCierre = this.formatTime(this.hCierre);

    if (this.modoEdicion) {
      this.updateNegocio();
    } else {
      this.crearNegocio();
    }
  }

  private updateNegocio() {
    this.negocioService.updateNegocio(this.negocio).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Negocio actualizado correctamente',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el negocio',
        });
        console.error('Error al actualizar negocio');
      },
    });
  }

  private crearNegocio() {
    this.negocioService.createNegocio(this.negocio).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Negocio creado correctamente',
        });
        this.router.navigate(['/dashboard/negocios']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el negocio',
        });
      },
    });
  }

  // === Helpers para los Datepickers ===
  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  private parseHora(hora: string): Date {
    const [h, m] = hora.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m, 0);
    return d;
  }
}
