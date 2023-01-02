import { Ciclo } from "./Ciclo";
import { Status } from "./Status";


export class Materia{

    clave: String = '';
    nombre: String = '';
    estatus: Status = new Status;
    ciclo: Ciclo = new Ciclo;
    
}