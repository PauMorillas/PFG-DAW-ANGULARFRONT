import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// PrimeNG
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

// FullCalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

// Servicios y modelos
import { NegocioService } from '../../services/negocio.service';
import { ReservaService } from '../../services/reserva.service';
import { EventoCalendario } from '../../models/eventocalendario.interface';
import { Negocio } from '../../models/negocio.interface';

@Component({
  selector: 'app-reservas-calendar',
  standalone: true,
  imports: [CommonModule, Card, ButtonModule, ToastModule, ConfirmDialogModule, FullCalendarModule],
  templateUrl: './reservas-calendar.html',
  styleUrls: ['./reservas-calendar.css'],
  providers: [MessageService, ConfirmationService],
})
export class ReservasCalendar implements OnInit {

  negocio?: Negocio;

  idServicioSeleccionado: any;
  
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'timeGridWeek',
    locale: 'es',
    firstDay: 1,
    selectable: true,
    nowIndicator: true,
    allDaySlot: false,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
  };


  constructor(
    private negocioService: NegocioService,
    private reservaService: ReservaService
  ) {}

  // Flujo principal: datos → configuración → renderizado → actualización de eventos
  
  ngOnInit(): void {
    this.cargarNegocio(2);
  }

  // Orquesta para obtener negocio y configurar el calendario (es necesario este flujo para que se renderice el calendario con los eventos)
  private cargarNegocio(id: number) {
    this.negocioService.getNegocioById(id).subscribe((negocio) => {
      console.log(negocio);
      this.negocio = negocio;
      this.configurarCalendario();
      this.cargarEventos(negocio.id!);
    });
  }

  /** Configura horarios y opciones base del calendario */
  private configurarCalendario() {
    if (!this.negocio) return;

    this.calendarOptions = {
      ...this.calendarOptions,
      slotMinTime: this.negocio.horaApertura ?? '00:00',
      slotMaxTime: this.negocio.horaCierre ?? '00:00',
    };
  }

  /** Carga todos los eventos para el negocio */
  cargarEventos(idNegocio?: number) {
    this.idServicioSeleccionado = null; // Se resetea el filtro

    this.reservaService.getEventosPorNegocio(idNegocio).subscribe({
      next: (eventos: EventoCalendario[]) => {
         console.log(eventos);
        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.mapEventos(eventos),
        };
      },
      error: (err) => console.error('Error cargando eventos:', err),
    });
  }

  /** Carga solo reservas de un servicio */
  cargarEventosPorServicio(idServicio: number) {
    this.idServicioSeleccionado = idServicio;
    this.reservaService.getEventosPorServicio(idServicio).subscribe({
      next: (eventos) => {
        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.mapEventos(eventos),
        };
      },
      error: (err) => console.error("Error filtrando por servicio: ", err),
    });
  }

  /** Mapea eventos a formato FullCalendar EventInput */
  private mapEventos(eventos: EventoCalendario[]) {
    return eventos.map((e) => ({
      title: e.title,
      start: e.start,
      end: e.end,
      color: e.color,
      id: e.idReserva.toString(), // Fullcalendar necesita string
      idReserva: e.idReserva,     // Mi referencia numerica en la BD 
    }));
  }

  handleDateClick(arg: any) {
    alert('Fecha seleccionada: ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    alert('Evento seleccionado: ' + arg.event.id);
  }
}
