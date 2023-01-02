import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { HomeComponent } from './Components/home/home.component';
import { AdministracionComponent } from './Components/administracion/administracion.component';
import { HttpClientModule } from '@angular/common/http';
import { CalificacionesComponent } from './Components/calificaciones/calificaciones.component';
import { MateriasTablaComponent } from './Components/home/materias-tabla/materias-tabla.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    AdministracionComponent,
    CalificacionesComponent,
    MateriasTablaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
