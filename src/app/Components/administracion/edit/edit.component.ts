import { ResponseGC } from './../../../model/ResponseGC';
import { GrupoService } from './../../../services/Grupo/grupo.service';
import { Component } from '@angular/core';
import { Grupo } from 'src/app/model/Grupo';
import { Alumno } from 'src/app/model/Alumno';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  grupos: Grupo[] = new Array;
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private grupoService: GrupoService) {

    this.consultarGrupos();

    this.form = this.fb.group({
       apePaterno: ['', Validators.required],
       apeMaterno: ['', Validators.required],
       nombre: ['', Validators.required],
       correo: [''],
       curp: [''],
       expediente: [''],
       genero: ['', Validators.required],
       estatus: [''],
       grupo: [''],
     });
    
    
  }
  
  onTextKeyup(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }

  consultarGrupos(){
    this.grupoService.consultarTodos().subscribe(
      (ResponseGC) => {
      
        this.grupos = ResponseGC.list;
      },
      (error) => {
        console.error(error);
      }
    );

  }

  aceptar(){

    const alumno = new Alumno;

    alumno.apePaterno = this.form.value.apePaterno;
    alumno.apeMaterno = this.form.value.apeMaterno;
    alumno.correo = this.form.value.correo;
    alumno.curp = this.form.value.curp.toUpperCase();
    alumno.estatus = this.form.value.estatus;
    alumno.expediente = this.form.value.expediente.toUpperCase();
    alumno.genero = this.form.value.genero;
    alumno.grupo = this.form.value.grupo;
    alumno.nombre = this.form.value.nombre;

    console.log(alumno);

  }

  cancelar(){

    this.router.navigate(['init/admin']);
  }
}

