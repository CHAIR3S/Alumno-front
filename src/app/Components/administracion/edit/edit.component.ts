import { FormControl } from '@angular/forms';
import { GrupoService } from './../../../services/Grupo/grupo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Grupo } from 'src/app/model/Grupo';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoService } from 'src/app/services/Alumno/alumno.service';
import { AlumnoDto } from 'src/app/DTO/AlumnoDTO';
import { Alumno } from 'src/app/model/Alumno';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent{

  grupos: Grupo[] = new Array;
  form: FormGroup;
  observable: any;
  alumno: Alumno = new Alumno();
  apellidoPaternoInput;
  apellidoMaternoInput;
  nombreInput;
  correoInput;
  curpInput;
  expedienteInput;
  

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    public grupoService: GrupoService,
    private alumnoService: AlumnoService) {

      this.form = this.fb.group({
        apePaterno: [''],
        apeMaterno: [''],
        nombre: [''],
        correo: [''],
        curp: [''],
        expediente: [''],
        genero: [''],
        estatus: [''],
        grupo: [''],
      });

      this.apellidoPaternoInput = new FormControl(this.alumnoService.alumno.apePaterno);
      this.apellidoMaternoInput = new FormControl(this.alumnoService.alumno.apeMaterno);
      this.nombreInput = new FormControl(this.alumnoService.alumno.nombre);
      this.correoInput = new FormControl(this.alumnoService.alumno.correo);
      this.curpInput = new FormControl(this.alumnoService.alumno.curp);
      this.expedienteInput = new FormControl(
        this.alumnoService.alumno.expediente
      );

      this.form.get('genero')?.setValue(this.alumnoService.alumno.genero);
      this.form
        .get('estatus')
        ?.setValue(String(this.alumnoService.alumno.estatus.id));
      this.form.get('grupo')?.setValue(this.alumnoService.alumno.grupo.id);

    }


    onTextKeyup(event: any) {
      event.target.value = event.target.value.toUpperCase();
    }

    aceptar(){

      const alumno = new AlumnoDto;


      alumno.apePaterno = this.form.value.apePaterno;
      alumno.apeMaterno = this.form.value.apeMaterno;
      alumno.correo = this.form.value.correo;
      alumno.curp = this.form.value.curp.toUpperCase();
      alumno.estatus = this.form.value.estatus;
      alumno.expediente = this.form.value.expediente.toUpperCase();
      alumno.genero = this.form.value.genero;
      alumno.grupo = this.form.value.grupo;
      alumno.nombre = this.form.value.nombre;
  
      this.alumnoService.guardarAlumno(alumno).subscribe( ResponseGC => {
      
      })

    }

    cancelar(){
      this.router.navigate(['init/admin']);
    }
}

