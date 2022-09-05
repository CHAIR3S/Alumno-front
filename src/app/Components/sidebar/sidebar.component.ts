import { Alumno } from 'src/app/model/Alumno';
import { AlumnoService } from 'src/app/services/Alumno/alumno.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements 

OnInit{

  alumno: Alumno = new Alumno();
  data: any;

  res: boolean = true;

  constructor(
    private alumnoService: AlumnoService
  ) { }

  ngOnInit(): void {
    this.alumnoService.dataAlumno.subscribe( data => {
      console.log("la data: ", data);
      this.data == data;
    })

  }

  change(){
    this.res=!this.res;
  }

}
