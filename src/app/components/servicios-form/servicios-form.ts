import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { NegocioService } from '../../services/negocio.service';
import { Servicio } from '../../models/servicio.interface';
import { InputNumberModule } from 'primeng/inputnumber';
import { ServicioService } from '../../services/servicio.service';
import { Textarea } from 'primeng/textarea';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-servicio-form',
  standalone: true,
  templateUrl: './servicios-form.html',
  styleUrls: ['./servicios-form.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    TextareaModule,
    ButtonModule,
    CardModule,
    Textarea,
  ],
})
export class ServiciosForm implements OnInit {
  form!: FormGroup;
  idNegocio!: number;
  idServicio!: number | null;
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private negocioService: NegocioService,
    private router: Router,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    this.idNegocio = Number(this.route.snapshot.paramMap.get('id'));
    const idServParam = this.route.snapshot.paramMap.get('idServicio');
    this.idServicio = idServParam ? Number(idServParam) : null;
    this.modoEdicion = !!this.idServicio;

    this.prepareForm();

    if (this.modoEdicion) {
      this.cargarServicio();
    }
  }

  cargarServicio() {
    this.servicioService.getServicioById(this.idServicio!).subscribe({
      next: (data: Servicio) => {
        this.buildFormFromData(data);
      },
      error: (err) => console.error('Error al cargar servicio', err),
    });
  }

  guardarHandler() {
    if (this.form.invalid) return;

    const dto: Servicio = {
      id: this.idServicio ?? null,
      negocioDTO: { id: this.idNegocio },
      listaReservasDTO: null,
      fechaCreacion: new Date().toISOString().slice(0, 19),
      ...this.form.value,
    };

    if (this.modoEdicion) {
      this.servicioService.update(this.idServicio!, dto).subscribe(() => {
        this.router.navigate([`/dashboard/negocios/${this.idNegocio}/servicios`]);
      });
    } else {
      this.servicioService.create(this.idServicio!, dto).subscribe(() => {
        this.router.navigate([`/dashboard/negocios/${this.idNegocio}/servicios`]);
      });
    }
  }

  getErrorMessage(campo: string): string | null {
    const control = this.form.get(campo);
    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['min']) return 'El valor es demasiado pequeño';
    if (control.errors['maxlength']) return 'El texto es demasiado largo';

    return 'Campo inválido';
  }

  private prepareForm() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      ubicacion: ['', Validators.required],
      duracionMinutos: [0, [Validators.required, Validators.min(1)]],
      coste: [0, [Validators.required, Validators.min(0)]],
    });
  }

  private buildFormFromData(data: Servicio) {
    this.form.patchValue({
      titulo: data.titulo,
      descripcion: data.descripcion,
      ubicacion: data.ubicacion,
      duracionMinutos: data.duracionMinutos,
      coste: data.coste,
    });
  }

  // === Navegación ===
  volver() {
    this.router.navigate([`/dashboard/negocios/${this.idNegocio}/servicios`]);
  }
}
