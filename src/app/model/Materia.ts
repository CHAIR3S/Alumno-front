import { Ciclo } from "./Ciclo";
import { Status } from "./Status";


export class Materia{

    pk_materia: number = 0;
    txt_clave: String = "";
    des_materia: String = "";
    fk_ciclo: Ciclo = new Ciclo;
    fk_status: Status = new Status;
    
}