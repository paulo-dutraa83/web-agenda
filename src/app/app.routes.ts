import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CadastrarUsuario } from './pages/cadastrar-usuario/cadastrar-usuario';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/auth.guard';

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
        path: "pages/dashboard", //Rota de navegação
        component: Dashboard, //classe do componente
        canActivate: [AuthGuard] //Aplicando o guardião
    },
    {
        path: "", //Rota de navegação para a pagina inicial
        redirectTo: "pages/autenticar-usuario", //Redirecionamento'
        pathMatch: "full" //correspondencia completa da rota
    }
];
