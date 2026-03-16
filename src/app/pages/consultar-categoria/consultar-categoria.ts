import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-categoria',
  imports: [
    Navbar,
    Sidebar,
    CommonModule,
    RouterLink
  ],
  templateUrl: './consultar-categoria.html',
  styleUrl: './consultar-categoria.css',
})
export class ConsultarCategoria {

  //Atributos
  categorias = signal<any[]>([]);

  //Injeção de dependência
  private http = inject(HttpClient);

  ngOnInit() { //Carregando as categorias qdo iniciar a pagina
    this.http.get('http://localhost:8083/api/v1/categorias')
      .subscribe({
        next: (data) => { //Resposta de sucesso
          //Guardando os dados obtidos para exibir na pagina
          this.categorias.set(data as any[]);
        },
        error: (e) => { //Resposta de erro
          console.log(e.error);
        }
      });
  }

  //Função para excluir uma categoria 
  onDelete(categoria: any) {
    //Exibindo uma janela popup de confirmação
    if (confirm('Deseja realmente excluir a categoria: ' + categoria.nome + '?')) {
      //Enviando uma requisição do tipo DELETE para a API
      this.http.delete('http://localhost:8083/api/v1/categorias/' + categoria.id)
        .subscribe({
          next: (data: any) => {
            alert('Categoria: ' + data.nome + ', excluída com sucesso!');
            this.ngOnInit(); //Recarregando a pagina para atualizar a lista de categorias
          },
          error: (e) => {
            alert(e.error)
          }
        });
    }
  }

}
