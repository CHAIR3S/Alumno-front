import { ResponseGC } from 'src/app/model/ResponseGC';
import { HomeComponent } from './../home/home.component';
import { Alumno } from 'src/app/model/Alumno';
import { AlumnoService } from 'src/app/services/Alumno/alumno.service';
import { Component, OnInit, OnChanges, Input, Host } from '@angular/core';
import { parseHostBindings } from '@angular/compiler';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  response: ResponseGC<Alumno> = new ResponseGC();
  res: boolean = true;
  alumno: Alumno = new Alumno();

  constructor(
    public alumnoService: AlumnoService
  ) { }

  ngOnInit(): void {
    
      this.alumnoService.dataAlumno.subscribe( data => {
        this.alumno = data;
        console.log(this.alumno);
        
      })

  }

  // actualizarVista(alumno: Alumno){
  //   this.alumno == alumno;
  // }

  change(){
    this.res=!this.res;
  }

}
