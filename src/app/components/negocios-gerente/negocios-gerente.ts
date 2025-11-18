import { Component, OnInit } from '@angular/core';
import { NegocioService } from '../../services/negocio.service';
import { Negocio } from '../../models/negocio.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Card } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-negocios-gerente',
  imports: [CommonModule, Card, ToastModule, ButtonModule, ConfirmDialogModule],
  templateUrl: './negocios-gerente.html',
  styleUrl: './negocios-gerente.css',
  standalone: true,
  providers: [MessageService, ConfirmationService],
})
export class NegociosGerente implements OnInit {
  public negocios: Negocio[] = [];

  constructor(
    private negocioService: NegocioService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {}
  ngOnInit(): void {
    this.cargarNegocios();
  }

  cargarNegocios() {
    const sessionRecuperada = JSON.parse(localStorage.getItem('session') || '{}');
    const email = sessionRecuperada.email;
    if (email) {
      this.negocioService.getNegociosByEmail(email).subscribe({
        next: (dataNegocios) => {
          this.negocios = dataNegocios;
          console.log('Negocios Cargados: ', this.negocios);
        },
        error: (error) => {
          console.error('Error al cargar los negocios:', error);
        },
      });
    }
  }

  goToNegocio(id: number, action: string) {
    this.router.navigate([`/negocios/${id}/${action}`]);
  }

  deleteNegocio(id: number) {
    this.negocioService.deleteNegocio(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Negocio eliminado correctamente'
        });

        // Recargar la lista
        this.cargarNegocios();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el negocio'
        });
      }
    });
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas eliminar este negocio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.deleteNegocio(id);
      }
    });
  }
}
