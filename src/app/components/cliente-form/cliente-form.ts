import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css',
})
// Inyecta el servicio por constructor
export class ClienteForm {
  constructor(private clienteService : ClienteService) { }

  public guardarCliente() {
    // Llama al método del servicio para guardar el cliente
    this.clienteService.save();
  }
}
