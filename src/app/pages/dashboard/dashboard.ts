import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Navbar } from '../../layout/navbar/navbar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Chart, ChartModule } from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    Sidebar,
    Navbar,
    FormsModule,
    ReactiveFormsModule,
    ChartModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  graficoDonut = signal<Chart>(new Chart());
  graficoBarras = signal<Chart>(new Chart());

  formulario = new FormGroup({
    dataMin: new FormControl('', [Validators.required]),
    dataMax: new FormControl('', [Validators.required]),
  });

  consultar() {
    
  }

}