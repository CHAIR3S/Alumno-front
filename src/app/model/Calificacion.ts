import { Alumno } from './Alumno';
import { Materia } from './Materia';


export class Calificacion{

    pk_calificacion?: number;
    num_cal_unidad_uno?: number;
    num_cal_unidad_dos?: number;
    num_cal_unidad_tres?: number;
    fk_alumno?: Alumno;
    fk_materia?: Materia;

}