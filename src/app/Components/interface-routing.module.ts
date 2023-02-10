import { SidebarComponent } from './sidebar/sidebar.component';
import { TablaProfesoresComponent } from './profesores/tabla-profesores/tabla-profesores.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'home/:id', component: HomeComponent},
      {path: 'admin', component: AdministracionComponent},
      {path: 'profesores', component: TablaProfesoresComponent},
      {path: '**', redirectTo: 'home/:id'}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterfaceRoutingModule { }
