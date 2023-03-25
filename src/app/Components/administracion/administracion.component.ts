import { ResponseGC } from './../../model/ResponseGC';
import { Router } from '@angular/router';
import { AlumnoFiltroDto } from './../../DTO/AlumnoFiltroDTO';
import { Alumno } from './../../model/Alumno';
import { AlumnoService } from 'src/app/services/Alumno/alumno.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnoData } from 'src/app/model/AlumnoData';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
})
export class AdministracionComponent {
  displayedColumns: string[] = [
    'expediente',
    'alumno',
    'estatus',
    'grupo',
    'options'
  ];
  arrayAlumnos: Alumno[] = new Array();
  arrayUserData: AlumnoData[] = new Array();
  load: boolean = false
  idUsuario: number = 0;
  
  dataSource!: MatTableDataSource<AlumnoData>;
  
  text: string = '';
  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder, 
    public alumnoService: AlumnoService,
    private router: Router) {

    this.dataSource = new MatTableDataSource(this.arrayUserData);

    this.alumnoService.getEvent().subscribe(() => {
      this.aceptarBorrarAlumnoDialog()
    });

    this.form = this.fb.group({
      expediente: [''],
      correo: ['', Validators.email],
      curp: [''],
    });
    
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onTextKeyup(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  aceptarBorrarAlumnoDialog() {

    this.alumnoService.eliminarAlumno(this.idUsuario).subscribe( 
       () => {

         console.log('id borrado ' + this.idUsuario);

         this.arrayAlumnos = this.borrarAlumnoArray(this.arrayAlumnos, this.idUsuario);

         this.alumnoToArray();

         setTimeout( () => {this.dataSource.paginator = this.paginator;}, 5)
         
       },
       (error) => {
         console.error(error);
       }
    );

    
    this.alumnoService.dialog = false;
  }

  editarAlumno(id: number){

    let alumno: Alumno[] = this.arrayAlumnos.filter( (arrayAlumnos) => {
      return arrayAlumnos.id === id;
    });

    this.alumnoService.alumno = alumno[0];

    this.router.navigate(['/init/edit']);

    console.log(this.alumnoService.alumno);
  }

  borrarAlumnoArray(userArray: Alumno[], id: number){
    return userArray.filter((userArray) => userArray.id !== id);
  }

  resetForm(){
    this.form.reset();
  }

  borrarAlumnoDialog(id: number){

    this.alumnoService.dialog = true;
    
    this.idUsuario = id;
  }

  consultarAlumno(){

    this.load = true;

    this.arrayUserData.length = 0;
    this.dataSource.paginator = this.paginator;

    const alumno: AlumnoFiltroDto = new AlumnoFiltroDto;
    
    if(this.form.value.correo != null){
      alumno.correo = this.form.value.correo;
    }
    if(this.form.value.expediente != null ){

      alumno.expediente = this.form.value.expediente.toUpperCase();
    }
    if(this.form.value.curp != null ){
      alumno.curp = this.form.value.curp.toUpperCase();
    }

    this.alumnoService.buscarAlumnoFiltro(alumno).subscribe(
      (ResponseGC) => {
        
        this.arrayAlumnos = ResponseGC.list;

        this.alumnoToArray();

        setTimeout( () => {this.dataSource.paginator = this.paginator;}, 10)
        
        this.load = false;
      },
      (error) => {
        console.error(error);
      }
    );


  }

  consultarTodosAlumnos() {
  
    this.load = true;

    this.arrayUserData.length = 0;
    this.dataSource.paginator = this.paginator;

    this.alumnoService.consultarTodos().subscribe(
      (ResponseGC) => {

        this.arrayAlumnos = ResponseGC.list;

        this.alumnoToArray();

        setTimeout( () => {this.dataSource.paginator = this.paginator;}, 5)
        
        this.load = false;
      },
      (error) => {
        console.error(error);
      }
    );

    
  }

  add() {
    this.router.navigate(['init/edit']);
  }

  alumnoToArray(){

    this.arrayUserData.length = 0;


    if(this.arrayAlumnos != null){

      for (let i: number = 0; i < this.arrayAlumnos.length; i++) {
        let userData: AlumnoData = new AlumnoData();
  
        if (this.arrayAlumnos[i].nombre != null) {
          let nombre: string =
            this.arrayAlumnos[i].nombre + ' ' +
            this.arrayAlumnos[i].apePaterno + ' ' + 
            this.arrayAlumnos[i].apeMaterno;
  
          userData.alumno = nombre;
        }
  
        if (this.arrayAlumnos[i].expediente != null) {
          userData.expediente = String(this.arrayAlumnos[i].expediente);
        }
  
        if (
          this.arrayAlumnos[i].estatus != null &&
          this.arrayAlumnos[i].estatus.estatus != null) {
          userData.estatus = this.arrayAlumnos[i].estatus.estatus;
        }

        if (this.arrayAlumnos[i].id != null) {
          userData.id = this.arrayAlumnos[i].id;
        }
  
        if (
          this.arrayAlumnos[i].grupo != null &&
          this.arrayAlumnos[i].grupo.grupo != null
        ) {
          userData.grupo = this.arrayAlumnos[i].grupo.grupo;
        }
  
        this.arrayUserData.push(userData);
  
      }
      
    }
    
  }


  
}


