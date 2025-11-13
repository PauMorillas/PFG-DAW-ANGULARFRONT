import { Component, signal } from '@angular/core';
// Módulos de los componentes específicos que vas a usar:
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { GerenteDashboardComponent } from './components/gerente-dashboard/gerente-dashboard';
import { RouterOutlet } from '@angular/router';
import { UsuarioForm } from './components/usuario-form/usuario-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, CardModule, GerenteDashboardComponent, RouterOutlet, UsuarioForm, GerenteDashboardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected readonly title = signal('PFG-DAW-ANGULARFRONT');
}
