import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NegocioService } from '../../services/negocio.service';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Negocio } from '../../models/negocio.interface';
import { Servicio } from '../../models/servicio.interface';
import { ServicioService } from '../../services/servicio.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { GerenteToolbar } from "../gerente-toolbar/gerente-toolbar";

@Component({
  selector: 'app-servicios-negocio',
  standalone: true,
  imports: [CommonModule, Card, ButtonModule, TableModule, ConfirmDialogModule, Toast, GerenteToolbar],
  templateUrl: './servicios-negocio.html',
  styleUrls: ['./servicios-negocio.css'],
  providers: [ConfirmationService],
})
export class ServiciosNegocio implements OnInit {
  idNegocio!: number;
  negocio!: Negocio;
  servicios: Servicio[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private negocioService: NegocioService,
    private servicioService: ServicioService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.idNegocio = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarNegocio();
  }

  private cargarNegocio() {
    this.negocioService.getNegocioById(this.idNegocio).subscribe({
      next: (data) => {
        console.log(data);
        this.negocio = data;
        this.servicios = data.listaServiciosDTO || [];
        console.log(this.servicios);
      },
      error: (err) => console.error('Error cargando negocio', err),
    });
  }

  editarNegocio() {
    this.router.navigate([`/dashboard/negocios/${this.idNegocio}/editar`]);
  }

  nuevoServicio() {
    this.router.navigate([`/dashboard/negocios/${this.idNegocio}/servicios/crear`]);
  }

  editarServicio(idServicio: number) {
    this.router.navigate([`/dashboard/negocios/${this.idNegocio}/servicios/${idServicio}/editar`]);
  }

  borrarServicio(idServicio: number) {
    this.servicioService.delete(idServicio).subscribe(() => {
      this.cargarNegocio();
    });
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas eliminar este servicio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: () => {
        this.borrarServicio(id);
      },
    });
  }

    goToNegocios() {
    this.router.navigate(['/dashboard/negocios']);
  }
}
