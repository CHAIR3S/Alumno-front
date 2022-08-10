import { Ciclo } from "./Ciclo";
import { Status } from "./Status";


export class Materia{

    pk_materia: number;
    txt_clave: String;
    des_materia: String;
    fk_ciclo: Ciclo;
    fk_status: Status;
    
}