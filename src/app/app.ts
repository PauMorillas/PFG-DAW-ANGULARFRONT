import { Component, signal } from '@angular/core';
// Módulos de los componentes específicos que vas a usar:
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ClienteForm } from './components/cliente-form/cliente-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, CardModule, ClienteForm],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected readonly title = signal('PFG-DAW-ANGULARFRONT');
}
