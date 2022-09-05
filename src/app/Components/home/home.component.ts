import { AlumnoDto } from './../../DTO/AlumnoDTO';
import { Alumno } from '../../model/Alumno';
import { AlumnoService } from '../../services/Alumno/alumno.service'
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ResponseGC } from '../../model/ResponseGC';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  alumno: Alumno = new Alumno();
  numer: number = 5;
  public id: any;


  constructor(
    private route:ActivatedRoute,
    private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe( (paramMap: any) => {
      let idAlumno: number;
      const {params} = paramMap;
      idAlumno = params.id;

      this.consultarAlumnoPorId(idAlumno);
    })

    
    this.alumnoService.dataAlumno.emit({
      data: this.numer
    })

  }



  consultarAlumnoPorId(idAlumno: number){
    this.alumnoService.consultarAlumnoPorID(idAlumno).subscribe(ResponseGC =>{
      this.alumno = ResponseGC.data;
    },
    error=>{console.error(error)}
    );
  }


  }


