import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteDashboardComponent } from './gerente-dashboard';

describe('GerenteDashboard', () => {
  let component: GerenteDashboardComponent;
  let fixture: ComponentFixture<GerenteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenteDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
