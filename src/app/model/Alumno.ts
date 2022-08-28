import { Grupo } from './Grupo';
import { Status } from './Status'


export class Alumno{
    
    pk_alumno: number = 0;
    txt_expediente: String = '';
    txt_nombre: String = '';
    txt_ape_paterno: String = '';
    txt_ape_materno: String = '';
    txt_curp: String = '';
    txt_sexo: String = '';
    txt_correo: String = '';
    pho_foto: Blob = new Blob;
    fk_grupo: Grupo = new Grupo;
    fk_status: Status = new Status;

}