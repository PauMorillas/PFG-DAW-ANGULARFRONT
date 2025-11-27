import { Component } from '@angular/core';
import { NegocioService } from '../../services/negocio.service';
import { MessageService } from 'primeng/api';
import { Negocio } from '../../models/negocio.interface';
import { AbstractControl, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { date } from '@primeuix/themes/aura/datepicker';
import { ActivatedRoute } from '@angular/router';
import { Card } from 'primeng/card';
import { Toast } from 'primeng/toast';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { GerenteToolbar } from '../gerente-toolbar/gerente-toolbar';

@Component({
  selector: 'app-negocios-form',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DatePickerModule,
    Card,
    Toast,
    ReactiveFormsModule,
    CheckboxModule,
    GerenteToolbar,
  ],
  templateUrl: './negocios-form.html',
  styleUrl: './negocios-form.css',
  providers: [MessageService],
})
export class NegociosForm {
  public negocioForm!: FormGroup;
  public negocio: Negocio = {
    id: 0,
    nombre: '',
    correoElec: '',
    telfContacto: '',
    horaApertura: '',
    horaCierre: '',
    correoGerente: '',
    diasApertura: '',
  };

  hApertura: Date = new Date();
  hCierre: Date = new Date();

  diasSemana = [
    { nombre: 'Lunes', valor: 1 },
    { nombre: 'Martes', valor: 2 },
    { nombre: 'Miercoles', valor: 3 },
    { nombre: 'Jueves', valor: 4 },
    { nombre: 'Viernes', valor: 5 },
    { nombre: 'Sabado', valor: 6 },
    { nombre: 'Domingo', valor: 7 },
  ];

  private regexDominio = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

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
    this.prepareForm();

    if (id) {
      this.modoEdicion = true;

      this.negocioService.getNegocioById(id).subscribe((data) => {
        this.negocio = data;
        this.negocio.id = id;

        this.buildFormFromData(data);
      });
    }
  }

  onSubmit() {
    if (!this.procesarDominios()) return;

    if (!this.negocioForm.valid) {
      this.negocioForm.markAllAsTouched();
      this.showErrorMessage('Error en el formulario, revisa los campos obligatorios');
      return;
    }

    this.buildNegocio();

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
      error: (err) => {
        let msg = 'Error desconocido';

        if (err.status === 0) {
          // No hay conexión con la API
          msg =
            'No se puede conectar con el servidor. Verifique con soporte que la API esté funcionando.';
        } else if (err.error) {
          // Error devuelto por el servidor
          msg = err.error?.message || err.error?.error || JSON.stringify(err.error);
        } else if (err.message) {
          // Mensaje genérico de HttpClient
          msg = err.message;
        }

        this.showErrorMessage(msg);
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
      error: (err) => {
        let msg = 'Error desconocido';

        if (err.status === 0) {
          msg =
            'No se puede conectar con el servidor. Verifique con soporte que la API esté funcionando.';
        } else if (err.error) {
          msg = err.error?.message || err.error?.error || JSON.stringify(err.error);
        } else if (err.message) {
          msg = err.message;
        }

        this.showErrorMessage(msg);
      },
    });
  }

  prepareForm() {
    this.negocioForm = new FormGroup(
      {
        nombre: new FormControl('', Validators.required),
        correoElec: new FormControl('', [Validators.required, Validators.email]),
        telfContacto: new FormControl('', [Validators.pattern('^[0-9]{9}$'), Validators.required]),
        hApertura: new FormControl(this.hApertura, Validators.required),
        hCierre: new FormControl(this.hCierre, Validators.required),
        diasApertura: new FormControl([], Validators.required),
        listaDominios: new FormControl('https://MiDominio.com', Validators.required),
      },
      { validators: this.horaAperturaAntesQueCierre } // <-- validador del grupo de horas de apertura
    );
  }

  buildFormFromData(data: Negocio) {
    this.hApertura = this.parseHora(data.horaApertura);
    this.hCierre = this.parseHora(data.horaCierre);

    this.negocioForm.patchValue({
      nombre: data.nombre,
      correoElec: data.correoElec,
      telfContacto: data.telfContacto,
      hApertura: this.hApertura,
      hCierre: this.hCierre,
      diasApertura: data.diasApertura ? data.diasApertura.split(',').map((d) => Number(d)) : [],
      listaDominios: data.listaDominiosDTO?.map((d) => d.dominio),
    });
  }

  procesarDominios(): boolean {
    const control = this.negocioForm.get('listaDominios');
    if (!control) return false;

    let value: string;
    if (Array.isArray(control.value)) {
      value = control.value.join(' ');
    } else {
      value = control.value || '';
    }

    // Validar que haya al menos un dominio
    if (value.trim().length === 0) {
      control.setErrors({ required: true });
      this.showErrorMessage('Debe agregar al menos un dominio');
      return false;
    }

    const raw = value
      .split(/[,\s]+/)
      .map((d: string) => d.trim())
      .filter((d: string) => d.length > 0);

    const invalid = raw.find((d: string) => !this.regexDominio.test(d));
    if (invalid) {
      control.setErrors({ invalid: `Dominio inválido: ${invalid}` });
      this.showErrorMessage(`Dominio inválido: ${invalid}`);
      return false;
    }

    control.setValue(raw); // limpiar array
    control.setErrors(null);

    return true;
  }

  buildNegocio() {
    const formValues = this.negocioForm.value;

    const dominios = Array.isArray(formValues.listaDominios)
      ? formValues.listaDominios
      : [formValues.listaDominios];

    this.negocio = {
      id: this.negocio?.id, // Se convierte a null en el service si no es una actualizacion
      nombre: formValues.nombre,
      correoElec: formValues.correoElec,
      telfContacto: formValues.telfContacto,
      horaApertura: this.formatTime(formValues.hApertura),
      horaCierre: this.formatTime(formValues.hCierre),
      correoGerente: '', // Se mapea en el service
      diasApertura: formValues.diasApertura.join(','), // Convierte array a string "1,2,3,4"

      listaDominiosDTO: dominios.map((dominio: string) => ({
        id: null,
        dominio: dominio,
        descripcion: 'Agreagada desde formulario Angular para el negocio ' + this.negocio?.id,
        activo: true,
        negocioDTO: { id: this.negocio?.id ?? null },
      })),
    };
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

  // === Helpers de Validaciones ===

  getErrorMessage(controlName: string): string | null {
    const control = this.negocioForm.get(controlName);
    if (!control || !control.touched || control.valid) return null;

    if (controlName === 'diasApertura' && control.errors?.['required'])
      return 'Seleccione al menos un día de apertura';
    if (control.errors?.['required']) return 'Este campo es obligatorio';
    if (controlName === 'correoElec' && control.errors?.['email']) return 'Correo inválido';
    if (controlName === 'telfContacto' && control.errors?.['pattern'])
      return 'Teléfono debe tener 9 dígitos';

    return 'Error desconocido';
  }

  // Validador del grupo
  horaAperturaAntesQueCierre(control: AbstractControl) {
    const group = control as FormGroup;
    const apertura = group.get('hApertura')?.value;
    const cierre = group.get('hCierre')?.value;

    if (!apertura || !cierre) return null;

    return apertura >= cierre ? { horaInvalida: true } : null;
  }

  showErrorMessage(msg: String) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error de validación',
      detail: `${msg}`,
    });
  }
}
