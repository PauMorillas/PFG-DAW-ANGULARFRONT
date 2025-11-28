import { Component, signal } from '@angular/core';
// Módulos de los componentes específicos que vas a usar:
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { GerenteDashboardComponent } from './components/gerente-dashboard/gerente-dashboard';
import { RouterOutlet } from '@angular/router';
import { UsuarioForm } from './components/usuario-form/usuario-form';
import { UsuarioLogin } from './components/user-login/user-login';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterOutlet, TextareaModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected readonly title = signal('PFG-DAW-ANGULARFRONT');
}
