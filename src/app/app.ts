import { Component, signal } from '@angular/core';
// Módulos de los componentes específicos que vas a usar:
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterOutlet } from '@angular/router';
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
