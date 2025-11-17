import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociosGerente } from './negocios-gerente';

describe('NegociosGerente', () => {
  let component: NegociosGerente;
  let fixture: ComponentFixture<NegociosGerente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NegociosGerente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegociosGerente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
