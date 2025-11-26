import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { Reserva } from '../../models/reserva.interface';
import { ReservaService } from '../../services/reserva.service';
import { ActivatedRoute } from '@angular/router';
import { GerenteToolbar } from '../gerente-toolbar/gerente-toolbar';
import { ButtonModule } from 'primeng/button';

// 1. Define el tipo de dato que PrimeNG espera para 'severity'
// Usaremos 'null | undefined' para cubrir todos los tipos posibles aunque solo devolvamos strings.
type TagSeverity = 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast';

@Component({
  selector: 'app-reserva-detail',
  imports: [CommonModule, CardModule, ToastModule, TagModule, GerenteToolbar, ButtonModule],
  templateUrl: './reserva-detail.html',
  standalone: true,
  styleUrl: './reserva-detail.css',
})
export class ReservaDetail implements OnInit {
  idReserva!: number;
  reserva: Reserva | null = null;

  constructor(
    private reservaService: ReservaService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idReserva = Number(this.route.snapshot.paramMap.get('id')) ?? undefined;

    if (this.idReserva) {
      this.loadReservaDetail(this.idReserva);
    }
  }

  loadReservaDetail(id: number): void {
    this.reservaService.getReservaById(id).subscribe({
      next: (data) => {
        this.reserva = data;
        console.log(this.reserva);
      },
      error: (err) => {
        const msg = err.status === 404 ? 'Reserva no encontrada.' : 'Error al cargar detalles.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: msg,
        });
        console.error('Error al cargar reserva:', err);
      },
    });
  }

  cancelarReserva() {
    this.reservaService.cancelarReserva(this.idReserva).subscribe({
      next: (updatedReserva) => {
        this.reserva = updatedReserva;

        this.messageService.add({
          severity: 'success',
          summary: 'Reserva cancelada',
          detail: 'El estado ha sido actualizado correctamente.',
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cancelar la reserva.',
        });
        console.error('Error al cancelar reserva:', err);
      },
    });
  }

  // Función auxiliar para el Tag de PrimeNG
  getSeverity(estado: string): TagSeverity {
    switch (estado) {
      case 'ACTIVA':
        return 'success';
      case 'CANCELADA':
        return 'danger';
      case 'EXPIRADA':
        return 'warn';
      default:
        return 'info';
    }
  }
}
