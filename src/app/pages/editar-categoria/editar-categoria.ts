import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-categoria',
  imports: [
    Navbar,
    Sidebar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.css',
})
export class EditarCategoria {

  //Mensagens
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //HTTP Client
  private http = inject(HttpClient);

  //ACTIVATED ROUTE (capturar variaveis passadas na URL da rota)
  private activatedRoute = inject(ActivatedRoute);

  //Armazenar o id da categoria na URL
  private id: string = '';

  ngOnInit() {
    //Capturando o id enviado na URL
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //Consultando os dados da categoria na API atraves do ID
    this.http.get('http://localhost:8083/api/v1/categorias/' + this.id)
      .subscribe((data: any) => {
        this.formulario.patchValue(data); //Preenchendo o formulario com os dados da categoria
      });
  }

  //Criando o formulario
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
  });

  //Criando uma função para fazer o SUBMIT do formulario
  atualizar() {
    //Enviando uma requisição PUT para a API da agenda cadastrar a categoria
    this.http.put('http://localhost:8083/api/v1/categorias/' + this.id, this.formulario.value)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso.set("Categoria " + data.nome + ", atualizado com sucesso!");
          this.mensagemErro.set(""); //Limpando a mensagem de erro
        },
        error: (e) => {
          this.mensagemErro.set(e.error.nome);
          this.mensagemSucesso.set(""); //Limpando a mensagem de sucesso
        }
      });
  }

}
