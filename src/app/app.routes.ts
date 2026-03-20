import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CadastrarUsuario } from './pages/cadastrar-usuario/cadastrar-usuario';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/auth.guard';
import { CadastrarCategoria } from './pages/cadastrar-categoria/cadastrar-categoria';
import { ConsultarCategoria } from './pages/consultar-categoria/consultar-categoria';
import { EditarCategoria } from './pages/editar-categoria/editar-categoria';
import { CadastrarTarefa } from './pages/cadastrar-tarefa/cadastrar-tarefa';
import { ConsultarTarefa } from './pages/consultar-tarefa/consultar-tarefa';
import { EditarTarefa } from './pages/editar-tarefa/editar-tarefa';

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
        path: "pages/cadastrar-categoria", //Rota de navegação
        component: CadastrarCategoria, //classe do componente
        canActivate: [AuthGuard] //Aplicando o guardião
    },
    {
        path: "pages/consultar-categoria", //Rota de navegação
        component: ConsultarCategoria, //classe do componente
        canActivate: [AuthGuard] //Aplicando o guardião
    },
    {
        path: "pages/editar-categoria/:id", //Rota de navegação, jogando o id da categoria no navegador
        component: EditarCategoria, //classe do componente
        canActivate: [AuthGuard] //Aplicando o guardião
    },
    {
        path: "pages/cadastrar-tarefa", //Rota de navegação
        component: CadastrarTarefa, //classe do componente
        canActivate: [AuthGuard] //Aplicando o guardião
    },
    {
        path : "pages/consultar-tarefa", //Rota de navegação
        component: ConsultarTarefa, //classe do componente
        canActivate: [AuthGuard] //Aplicando o guardião
    },
    {
        path : "pages/editar-tarefa", //Rota de navegação
        component: EditarTarefa, //classe do componente
        canActivate: [AuthGuard] //Aplicando o guardião
    },
    {
        path: "", //Rota de navegação para a pagina inicial
        redirectTo: "pages/autenticar-usuario", //Redirecionamento'
        pathMatch: "full" //correspondencia completa da rota
    }
];
