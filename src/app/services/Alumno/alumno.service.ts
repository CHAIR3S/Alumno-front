import { EventEmitter, Injectable, Output } from '@angular/core';

import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
// import { UnsubscribeOnDestroyAdapter } from "../../toUse/UnsubscribeOnDestroyAdapter";
import { Alumno } from '../../model/Alumno';
import { ResponseGC } from "../../model/ResponseGC";
import { AlumnoFiltroDto } from '../../DTO/AlumnoFiltroDTO';
import { AlumnoDto } from '../../DTO/AlumnoDTO';
import { AlumnoAndFiltroDto } from 'src/app/DTO/AlumnoAndFiltroDTO';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  nombreUsuario: String = '';
  _res: boolean;
  arrayParams: Array<string> = new Array();

  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) {
    const storedData = localStorage.getItem('res');
    this._res = storedData ? JSON.parse(storedData) : true;
  }

  changeRes() {
    this._res = !this._res;
    localStorage.setItem('res', JSON.stringify(this._res));
  }
    

  public consultarTodos():Observable<ResponseGC<Alumno>>{
    const url = "http://localhost:8081/alumno/consultarTodos";
    
    return this.http.get<ResponseGC<Alumno>>(url,
      {headers: new HttpHeaders().append("Content-Type","application/json")});
  }

  public consultarAlumnoPorID(idAlumno: number): Observable<ResponseGC<Alumno>> {
    const url = "http://localhost:8081/alumno/buscarAlumnoPorId/" +  idAlumno;

    return this.http.get<ResponseGC<Alumno>>(url);
  }

  public guardarAlumno(alumno: AlumnoDto): Observable<ResponseGC<Alumno>> {
    const url = "http://localhost:8081/alumno/guardarAlumno"; 
                                  //Url y body: objeto que contiene de lo que queremos crear
    return this.http.post<ResponseGC<Alumno>>(url, alumno)
  }

  public actualizarAlumno(upToDate: AlumnoAndFiltroDto):Observable<ResponseGC<Alumno>>{

    const url = 'http://localhost:8081/alumno/actualizarAlumno';

    return this.http.put<ResponseGC<Alumno>>(url, upToDate)
  }
  
  public eliminarAlumno(idAlumno: number): Observable<number> {
    const url = "http://localhost:8081/alumno/borrarAlumnoId/" +  idAlumno;

    return this.http.delete<number>(url);
  }

  public buscarAlumnoFiltro(filtro: AlumnoFiltroDto): Observable<ResponseGC<Alumno>> {

    let params: string = this.concatenar(filtro);

    const url = "http://localhost:8081/alumno/buscarAlumnoFiltro?" + params; 
                                  //Url y body: objeto que contiene de lo que queremos crear
    return this.http.get<ResponseGC<Alumno>>(url)
  }

  concatenar(filtro: AlumnoFiltroDto){
    let params: string = '';

    if(filtro.correo != ''){
      params+= `correo=${filtro.correo}`;
    }
    if(filtro.curp != ''){
      if(params != ''){
        params+= '&';
      }
      params+= `curp=${filtro.curp}`;
    }
    if(filtro.expediente != ''){
      if(params != ''){
        params+= '&';
      }
      params+= `expediente=${filtro.expediente}`;
    }

    return params;
  }
}
