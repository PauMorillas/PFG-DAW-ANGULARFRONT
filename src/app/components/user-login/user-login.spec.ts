import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioLogin } from './user-login';

describe('UsuarioLogin', () => {
  let component: UsuarioLogin;
  let fixture: ComponentFixture<UsuarioLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
