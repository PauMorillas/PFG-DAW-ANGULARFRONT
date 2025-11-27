import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-negocios-generar-script',
  imports: [],
  templateUrl: './negocios-generar-script.html',
  styleUrl: './negocios-generar-script.css',
})
export class NegociosGenerarScript implements OnInit{
copyScript() {
throw new Error('Method not implemented.');
}
  idNegocio!: number;
  script!: string;
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const apiBaseUrl = environment.apiBaseUrl ?? '';
    this.idNegocio = Number(this.route.snapshot.paramMap.get('id'));
    this.script = `<script src="${apiBaseUrl}js/widget-embed.js" data-service-id="${this.idNegocio}" type="application/javascript"></script>`;
  }
}