import { Component, OnInit } from '@angular/core';

import { AlumnoService } from '../../services/Alumno/alumno.service'

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {

  constructor(
    public alumnoService: AlumnoService) { }

  ngOnInit(): void {
  }

}
