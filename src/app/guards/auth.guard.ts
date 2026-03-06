import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

    //Criando um objeto da classe 'Router'
    private router = inject(Router);

    //Função para verificar se o usuario esta autenticado
    //antes de acessar uma determinada pagina
    canActivate(): boolean {

        //Verificando se o usuario esta autenticado
        if(sessionStorage.getItem('usuario')) {
            return true; //Pode acessar a pagina
        } else {
            this.router.navigate(['/pages/autenticar-usuario']); //Redirecionando para a pagina de login
            return false; //Nao pode acessar a pagina
        }
    }

}