import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css',
})
export class AutenticarUsuario {

  //Injeção de dependencia
  private http = inject(HttpClient);
  
  //mensagens
  mensagemErro = signal<string>('');  

  //Criando a estrutura do formulario
  formulario = new FormGroup({
    email : new FormControl('', [Validators.required]),
    senha : new FormControl('', [Validators.required]),
  });

  //Função para realizar a autenticação do usuário
  autenticar() {
    
    //Fazendo uma requisição HTTP POST para o endpoint de autenticação
    this.http.post('http://localhost:8082/api/v1/usuario/autenticar', this.formulario.value)
      .subscribe({
        next: (data) => { //Capturando a resposta de sucesso
          sessionStorage.setItem("usuario", JSON.stringify(data)); //Salvando os dados do usuario autenticado em uma sessão
          location.href = '/pages/dashboard'; //Redirecionando para a pagina do dashboard
        },
        error: (e) => { //Capturando a resposta de erro
          this.mensagemErro.set(e.error); //Exibindo a mensagem de erro
        }
      });

  }  

}
