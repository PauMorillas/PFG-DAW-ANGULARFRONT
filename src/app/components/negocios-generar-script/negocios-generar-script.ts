import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { Negocio } from '../../models/negocio.interface';
import { NegocioService } from '../../services/negocio.service';
import { ToastModule } from 'primeng/toast';
import { measureMemory } from 'vm';
import { GerenteToolbar } from '../gerente-toolbar/gerente-toolbar';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-negocios-generar-script',
  imports: [ToastModule, GerenteToolbar, ButtonModule],
  templateUrl: './negocios-generar-script.html',
  styleUrl: './negocios-generar-script.css',
  providers: [MessageService],
})
export class NegociosGenerarScript implements OnInit {
  idNegocio!: number;
  negocio!: Negocio;
  script!: string;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private negocioService: NegocioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const apiBaseUrl = environment.apiBaseUrl ?? '';
    this.idNegocio = Number(this.route.snapshot.paramMap.get('id'));
    this.script = `<script src="${apiBaseUrl}js/widget-embed.js" data-service-id="${this.idNegocio}" type="application/javascript"></script>`;

    this.negocioService.getNegocioById(this.idNegocio).subscribe((data) => {
      this.negocio = data;
    });
  }

  copyScript() {
    navigator.clipboard.writeText(this.script).then(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Script copiado al portapapeles',
      });
    });
  }

  goToNegocios() {
    this.router.navigate(['/dashboard/negocios']);
  }
}
