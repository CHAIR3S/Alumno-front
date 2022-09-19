import { Alumno } from './Alumno';
import { Materia } from './Materia';


export class Calificacion{

    pk_calificacion: number = 0;
    num_cal_unidad_uno: number = 0;
    num_cal_unidad_dos: number = 0;
    num_cal_unidad_tres: number = 0;
    fk_alumno: Alumno = new Alumno;
    fk_materia: Materia = new Materia;

}