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

  alumno : Alumno = new Alumno();
  public id: any;

  constructor(
    private route:ActivatedRoute,
    public alumnoService: AlumnoService) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe( (paramMap: any) => {
      let idAlumno: number;
      const {params} = paramMap;
      idAlumno = params.id;

      this.consultarAlumnoPorId(idAlumno);

      console.log(params.id);
      console.log(idAlumno)
      console.log(this.alumno);
    })

  
    // this.consultarAlumnoPorID();
  }

  // public consultarAlumnoPorId(){
  //   this.alumnoService.consultarAlumnoPorID(alumnoId).subscribe(Response => {
  //     console.log(Response);
  //     // this.data = Response.data;
  //   },
  //   error => {console.error(error)}
  //   );
  // }

  // consultarAlumnoPorID(){
  //   this.route.params.subscribe( params =>{
  //     let alumnoId = params['pk_alumno']

  //       this.alumnoService.consultarAlumnoPorID(alumnoId).subscribe(
  //         (response) => {
  //             if(response.status === 'OK'){
  //               // response.data;
  //               console.log(response.data);
  //             }
  //         }
  //       )
  //     }) 
  //   }

  consultarAlumnoPorId(idAlumno: number){
    this.alumnoService.consultarAlumnoPorID(idAlumno).subscribe(ResponseGC =>{
      this.alumno = ResponseGC.data;
    },
    error=>{console.error(error)}
    );
  }


  }


