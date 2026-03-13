import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Navbar } from '../../layout/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    Sidebar,
    Navbar
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}