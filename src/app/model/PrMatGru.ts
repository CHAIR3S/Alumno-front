import { Grupo } from "./Grupo";
import { Materia } from "./Materia";
import { Profesor } from "./Profesor";


export class PrMatGru{

    pk_pr_mt_gr: number;
    fk_profesor: Profesor;
    fk_materia: Materia;
    fk_grupo: Grupo;
    
}