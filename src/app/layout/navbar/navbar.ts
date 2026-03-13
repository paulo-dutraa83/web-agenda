import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  //Atributos
  nome = signal<string>(''); //Atributo para armazenar o nome do usuario
  perfil = signal<string>(''); //Atributo para armazenar o perfil do usuario

  //Evento do angular que eh executado quando a pagina eh carregada
  ngOnInit() {
    //Ler os dados do usuario salvo na sessão
    const json = sessionStorage.getItem("usuario");
    //Converter os dados em formato JSON
    const usuario = JSON.parse(json as string);
    //Capturando o nome e o perfil
    this.nome.set(usuario.nome);
    this.perfil.set(usuario.perfil);              
  }

  //Função para logout do usuario
  logout() {
    if(confirm('Deseja realmente sair do sistema?')) {
      //Limpando os dados do usuario da sessão
      sessionStorage.removeItem("usuario");
      //Redirecionando para a pagina de login
      location.href = '/';
    }
  }
}
