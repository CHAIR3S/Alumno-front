import { ResponseGC } from './../../../model/ResponseGC';
import { GrupoService } from './../../../services/Grupo/grupo.service';
import { Component } from '@angular/core';
import { Grupo } from 'src/app/model/Grupo';
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
  // form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private grupoService: GrupoService) {

    this.consultarGrupos();

    // this.form = this.fb.group({
    //   expediente: [''],
    //   correo: ['', Validators.email],
    //   curp: [''],
    // });
    
    
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
}

