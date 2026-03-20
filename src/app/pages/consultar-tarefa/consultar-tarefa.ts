import { Component, inject, signal } from '@angular/core';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Navbar } from '../../layout/navbar/navbar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultar-tarefa',
  imports: [
    Navbar,
    Sidebar,
    CommonModule
  ],
  templateUrl: './consultar-tarefa.html',
  styleUrl: './consultar-tarefa.css',
})
export class ConsultarTarefa {

  //Atributo para armazenar a listagem das tarefas
  tarefas = signal<any[]>([]);

  //HTTP Client para fazer a integração com a API
  private http = inject(HttpClient);

  //Função exacutada ao abrir a pagina
  ngOnInit() {
    this.http.get('http://localhost:8083/api/v1/tarefas')
      .subscribe((data) => {
        this.tarefas.set(data as any[]);
      });
  }
}
