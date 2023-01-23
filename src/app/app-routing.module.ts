import { TablaProfesoresComponent } from './Components/profesores/tabla-profesores/tabla-profesores.component';
import { AdministracionComponent } from './Components/administracion/administracion.component';
import { HomeComponent } from './Components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home/:id',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdministracionComponent
  },
  {
    path: 'profesores',
    component: TablaProfesoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
