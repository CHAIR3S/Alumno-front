import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { TablaProfesoresComponent } from './Components/profesores/tabla-profesores/tabla-profesores.component';
import { AdministracionComponent } from './Components/administracion/administracion.component';
import { HomeComponent } from './Components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'init',
    component: SidebarComponent,
    loadChildren: () => import('./Components/interface.module').then(m => m.InterfaceModule )
  },
  {
    path: '**',
    redirectTo: 'init'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
