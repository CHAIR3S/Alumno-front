import { Materia } from './../../model/Materia';
import { MateriaService } from './../../services/Materia/materia.service';
import { CalificacionService } from './../../services/Calificacion/calificacion.service';
import { AlumnoDto } from './../../DTO/AlumnoDTO';
import { Alumno } from '../../model/Alumno';
import { AlumnoService } from '../../services/Alumno/alumno.service'
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { ResponseGC } from '../../model/ResponseGC';
import { Calificacion } from 'src/app/model/Calificacion';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  response: ResponseGC<Alumno> = new ResponseGC();
  calificaciones: Calificacion[] = [];
  calificacion: Calificacion = new Calificacion();
  materias: Materia[] = [];
  alumno: Alumno = new Alumno;
  public id: any;
  i: number = 0;


  constructor(
    private route:ActivatedRoute,
    private alumnoService: AlumnoService,
    private calificacionService: CalificacionService,
    private materiaService: MateriaService) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe( (paramMap: any) => {
      let idAlumno: number;
      const {params} = paramMap;
      idAlumno = params.id;
      
     this.consultarAlumnoPorId(idAlumno);

     this.consultarCalificacionesAlumno(idAlumno);

    })
    
    

    //  for(this.i = 0; this.i < this.calificaciones.length; this.i++){

    //    this.materias[this.i] = this.calificaciones[this.i].fk_materia;

    //  }

     setTimeout(() => {
      this.alumnoService.dataAlumno.emit({
        data: this.alumno
      })
      this.calificacion = this.calificaciones[3];
     }, 1500);

  }

  consultarAlumnoPorId(idAlumno: number) {
    this.alumnoService.consultarAlumnoPorID(idAlumno).subscribe( ResponseGC => {
      this.alumno = ResponseGC.data;
    },
    error=>{console.error(error)}
    
    );
  }

  consultarCalificacionesAlumno(idAlumno: number){
    this.calificacionService.buscarCalificacionAlumno(idAlumno).subscribe( ResponseGC => {
      this.calificaciones = ResponseGC.list;
      console.log(this.calificaciones);
      
    },
    error =>{ console.error(error)}
    );
  }

  // consultarMateriasPorIds( materiasIds: number[] ) {
  //   this.materiaService.buscarMateriasPorIds(materiasIds).subscribe( ResponseGC => {
  //     this.materiasIds = ResponseGC.list;
  //     console.log(materiasIds);
      
  //   },
  //   error => {console.error(error)}
  //   );
  // }

  }


