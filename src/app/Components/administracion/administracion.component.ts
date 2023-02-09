import { HttpClient } from '@angular/common/http';
import { ResponseGC } from 'src/app/model/ResponseGC';
import { AlumnoFiltroDto } from './../../DTO/AlumnoFiltroDTO';
import { DataSource } from '@angular/cdk/collections';
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
  
  dataSource!: MatTableDataSource<AlumnoData>;
  
  text: string = '';
  form: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder, 
    private alumnoService: AlumnoService,
    private http: HttpClient) {
    
    this.dataSource = new MatTableDataSource(this.arrayUserData);

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

  resetForm(){
    this.form.reset();
  }

  consultarAlumno(){

    this.arrayUserData.length = 0;
    this.dataSource.paginator = this.paginator;

    const alumno: AlumnoFiltroDto = new AlumnoFiltroDto;
    alumno.correo = this.form.value.correo;
    alumno.expediente = this.form.value.expediente.toUpperCase();
    alumno.curp = this.form.value.curp.toUpperCase();

    this.alumnoService.buscarAlumnoFiltro(alumno).subscribe(
      (ResponseGC) => {
        this.arrayAlumnos = ResponseGC.list;

        this.alumnoToArray();

        setTimeout( () => {this.dataSource.paginator = this.paginator;}, 10)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  consultarTodosAlumnos() {
  
    this.arrayUserData.length = 0;
    this.dataSource.paginator = this.paginator;

    this.alumnoService.consultarTodos().subscribe(
      (ResponseGC) => {

        this.arrayAlumnos = ResponseGC.list;

        this.alumnoToArray();

        setTimeout( () => {this.dataSource.paginator = this.paginator;}, 5)
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  alumnoToArray(){

    this.arrayUserData.length = 0;


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


