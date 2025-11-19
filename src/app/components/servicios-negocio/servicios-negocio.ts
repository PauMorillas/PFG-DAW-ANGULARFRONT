import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NegocioService } from '../../services/negocio.service';
import { ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Negocio } from '../../models/negocio.interface';
import { Servicio } from '../../models/servicio.interface';

@Component({
  selector: 'app-servicios-negocio',
  standalone: true,
  imports: [CommonModule, Card, ButtonModule, TableModule],
  templateUrl: './servicios-negocio.html',
  styleUrls: ['./servicios-negocio.css'],
})

export class ServiciosNegocio implements OnInit {
  idNegocio!: number;
  negocio!: Negocio;
  servicios: Servicio[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private negocioService: NegocioService
  ) {}

  ngOnInit() {
    this.idNegocio = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarNegocio();
  }

  cargarNegocio() {
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
    this.router.navigate([
      `/dashboard/negocios/${this.idNegocio}/servicios/${idServicio}/editar`,
    ]);
  }
}
