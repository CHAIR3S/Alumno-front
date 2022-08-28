import { Ciclo } from './Ciclo';
import { Status } from './Status'


export class Grupo{

    pk_grupo?: number;
    txt_desc_grupo?: String;
    fk_status?: Status;
    fk_ciclo?: Ciclo;

}