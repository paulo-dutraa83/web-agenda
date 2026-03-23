import { Component, inject, signal } from '@angular/core';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { Navbar } from '../../layout/navbar/navbar';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar-tarefa',
  imports: [
    Navbar,
    Sidebar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consultar-tarefa.html',
  styleUrl: './consultar-tarefa.css',
})
export class ConsultarTarefa {

  //Atributo para armazenar a listagem das tarefas
  tarefas = signal<any[]>([]);

  //HTTP Client para fazer a integração com a API
  private http = inject(HttpClient);

  //Formulario para filtrar as datas da pesquisa
  formulario = new FormGroup({
    dataMin: new FormControl('', [Validators.required]),
    dataMax: new FormControl('', [Validators.required]),
  });

  //Função exacutada ao abrir a pagina
  ngOnInit() {
    //Pegando a data atual
    const hoje = new Date();

    //Primeiro dia do mês
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    //Ultimo dia do mês
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

    //Formatando as datas para o formato yyyy-MM-dd
    const formatarData = (data: Date) => {
      return data.toISOString().split('T')[0];
    }
    //Preenchendo o formularo com as datas e do primeiro e ultimo dia do mes
    this.formulario.patchValue({
      dataMin: formatarData(primeiroDia),
      dataMax: formatarData(ultimoDia)
    });

    //Realizando a consulta
    this.consultar();
  }

  //Função para executar a consulta das tarefas
  consultar() {
    //Capturando as data do formulario
    const dataMin = this.formulario.value.dataMin;
    const dataMax = this.formulario.value.dataMax;

    //Executando a consulta na API de tarefas
    this.http.get('http://localhost:8083/api/v1/tarefas/' + dataMin + "/" + dataMax)
      .subscribe((data) => {
        this.tarefas.set(data as any[]);
      });
  }

  //Função para excluir a tarefa
  excluir(id: string) {
    if (confirm('Deseja realmente excluir a tarefa selecionada?')) {
      this.http.delete('http://localhost:8083/api/v1/tarefas/' + id)
        .subscribe({
          next: (data: any) => {
            this.consultar();
          },
          error: (e) => {
            console.log(e.error);
          }
        });
    }
  }

}
