import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-embedbook-landing',
  imports: [ButtonModule, CardModule, CarouselModule, RouterLink],
  templateUrl: './embedbook-landing.html',
  styleUrl: './embedbook-landing.css',
})
export class EmbedbookLanding {
  constructor(private router: Router) {}

  goToCliente() {
    this.router.navigate(['/registro-cliente'])
  }
  
  goToPanel() {
     this.router.navigate(['/dashboard'])
  }

  managerFeatures = [
    '🗂️ Gestión de servicios',
    '🕒 Horarios de apertura flexibles',
    '🗓️ Calendario en tiempo real',
    '✨ Integración inmediata mediante iFrame',
    '📧 Correos automáticos',
    '🔐 Seguridad y control',
  ];

  clientFeatures = [
    '⚡ Reserva en 3 clics',
    '📱 100% responsive',
    '🚀 Confirmación inmediata',
    '🧩 Integrado en la web del negocio',
    '📧 Avisos por email'
  ];

  carouselResponsiveOptions = [
    { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
    { breakpoint: '640px', numVisible: 1, numScroll: 1 },
  ];
}
