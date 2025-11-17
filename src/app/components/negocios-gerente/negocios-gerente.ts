import { Component, OnInit } from '@angular/core';
import { NegocioService } from '../../services/negocio.service';
import { Negocio } from '../../models/negocio.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-negocios-gerente',
  imports: [CommonModule],
  templateUrl: './negocios-gerente.html',
  styleUrl: './negocios-gerente.css',
  standalone: true
})
export class NegociosGerente implements OnInit {
  public negocios: Negocio[] = [];

  constructor(private negocioService: NegocioService) {}
  ngOnInit(): void {
    this.cargarNegocios();
  }

  cargarNegocios() {
    const email = localStorage.getItem('email') || 'laura.gomez@gestor.com'; // TODO: SACARLO DEL LOGIN

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
}
