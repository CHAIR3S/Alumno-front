import { Periodo } from './Periodo';
import { Status } from './Status'

export class Ciclo{

    pk_ciclo?: number;
    txt_clave?: String;
    txt_desc_ciclo?: String;
    fk_periodo?: Periodo;
    dat_fecha_inicio?: Date;
    dat_fecha_fin?: Date;
    fk_status?: Status;

}