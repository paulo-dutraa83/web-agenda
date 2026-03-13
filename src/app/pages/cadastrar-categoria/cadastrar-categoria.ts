import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-cadastrar-categoria',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar,
    Sidebar
  ],
  templateUrl: './cadastrar-categoria.html',
  styleUrl: './cadastrar-categoria.css',
})
export class CadastrarCategoria {

  //Mensagens da pagina
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //HTTP CLIENT (Integração com a API)
  private http = inject(HttpClient);

  //Criando o formulario
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
  });

  //Criando uma função para fazer o SUBMIT do formulario
  cadastrar() {
    //Enviando uma requisição POST para a API da agenda cadastrar a categoria
    this.http.post('http://localhost:8083/api/v1/categorias', this.formulario.value)
      .subscribe({
        next: (data: any) => {
          this.mensagemSucesso.set("Categoria " + data.nome + ", cadastrada com sucesso!");
          this.mensagemErro.set(""); //Limpando a mensagem de erro
          this.formulario.reset(); //Limpando o formulario
        },
        error: (e) => {
          this.mensagemErro.set(e.error.nome);
          this.mensagemSucesso.set(""); //Limpando a mensagem de sucesso
        }
      });
  }

}
