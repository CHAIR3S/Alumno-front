import { DataSource } from '@angular/cdk/collections';
import { Alumno } from './../../model/Alumno';
import { AlumnoService } from 'src/app/services/Alumno/alumno.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlumnoData } from 'src/app/model/AlumnoData';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
})
export class AdministracionComponent implements OnInit {
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
    private alumnoService: AlumnoService) {

    // this.consultarTodosAlumnos();

    
    this.dataSource = new MatTableDataSource(this.arrayUserData);

    this.form = this.fb.group({
      expediente: [''],
      correo: ['', Validators.email],
      curp: [''],
    });
    
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onTextKeyup(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  consultarTodosAlumnos() {
    this.alumnoService.consultarTodos().subscribe(
      (ResponseGC) => {
        this.arrayAlumnos = ResponseGC.list;

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
        

        this.dataSource.paginator = this.paginator;
        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
}


export interface PeriodicElement {
  expediente: string;
  alumno: string;
  estatus: string;
  grupo: string;
}

const arrayAl: PeriodicElement[] = [
  {expediente: '1', alumno: 'Hydrogen', estatus: '1.0079', grupo: 'H'},
  {expediente: '2', alumno: 'Helium', estatus: '4.0026', grupo: 'He'},
  {expediente: '3', alumno: 'Lithium', estatus: '6.941', grupo: 'Li'},
  {expediente: '4', alumno: 'Beryllium', estatus:' 9.0122', grupo: 'Be'},
  {expediente: '5', alumno: 'Boron', estatus: '10.811', grupo: 'B'},
  {expediente: '6', alumno: 'Carbon', estatus: '12.0107', grupo: 'C'},
  {expediente: '7', alumno: 'Nitrogen', estatus: '14.0067', grupo: 'N'},
  {expediente: '1', alumno: 'Hydrogen', estatus: '1.0079', grupo: 'H'},
  {expediente: '2', alumno: 'Helium', estatus: '4.0026', grupo: 'He'},
  {expediente: '3', alumno: 'Lithium', estatus: '6.941', grupo: 'Li'},
  {expediente: '4', alumno: 'Beryllium', estatus:' 9.0122', grupo: 'Be'},
  {expediente: '5', alumno: 'Boron', estatus: '10.811', grupo: 'B'},
  {expediente: '6', alumno: 'Carbon', estatus: '12.0107', grupo: 'C'},
  {expediente: '7', alumno: 'Nitrogen', estatus: '14.0067', grupo: 'N'},
  {expediente: '1', alumno: 'Hydrogen', estatus: '1.0079', grupo: 'H'},
  {expediente: '2', alumno: 'Helium', estatus: '4.0026', grupo: 'He'},
  {expediente: '3', alumno: 'Lithium', estatus: '6.941', grupo: 'Li'},
  {expediente: '4', alumno: 'Beryllium', estatus:' 9.0122', grupo: 'Be'},
  {expediente: '5', alumno: 'Boron', estatus: '10.811', grupo: 'B'},
  {expediente: '6', alumno: 'Carbon', estatus: '12.0107', grupo: 'C'},
  {expediente: '7', alumno: 'Nitrogen', estatus: '14.0067', grupo: 'N'}
];
