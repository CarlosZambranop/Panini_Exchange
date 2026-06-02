import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, NavbarComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  features = [
    { icon: 'security',       title: 'Datos Seguros',       desc: 'Tu información se almacena cifrada y protegida bajo estándares modernos.' },
    { icon: 'verified_user',  title: 'Cumplimiento Legal',  desc: 'Respetamos la Ley 1581 de 2012 de protección de datos personales de Colombia.' },
    { icon: 'speed',          title: 'Proceso Rápido',      desc: 'Registro sencillo en menos de 2 minutos. Sin complicaciones.' }
  ];
}
