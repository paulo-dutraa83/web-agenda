import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CadastrarUsuario } from './pages/cadastrar-usuario/cadastrar-usuario';

export const routes: Routes = [
    {
        path : "pages/autenticar-usuario", //Rota de navegação
        component: AutenticarUsuario //classe do componente
    },
    {
        path : "pages/cadastrar-usuario", //Rota de navegação
        component: CadastrarUsuario
    },
    {
        path: "", //Rota de navegação para a pagina inicial
        redirectTo: "pages/autenticar-usuario", //Redirecionamento'
        pathMatch: "full" //correspondencia completa da rota
    }
];
