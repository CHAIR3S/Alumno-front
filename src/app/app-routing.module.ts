import { ProfesoresComponent } from './Components/profesores/profesores.component';
import { AdministracionComponent } from './Components/administracion/administracion.component';
import { HomeComponent } from './Components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    component: HomeComponent
  },
  {
    path: ':id/admin',
    component: AdministracionComponent
  },
  {
    path: ':id/profesores',
    component: ProfesoresComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
