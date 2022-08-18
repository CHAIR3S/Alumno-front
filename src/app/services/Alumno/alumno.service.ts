import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { Alumno } from '../../model/Alumno';
import { Response } from "../../model/Response";
import { AlumnoFiltroDto } from '../../DTO/AlumnoFiltroDTO';
import { AlumnoDto } from '../../DTO/AlumnoDTO';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService extends UnsubscribeOnDestroyAdapter{
  [x: string]: any;
  private readonly API_URL = "assets/data/clients.json";
  dialogData: any;
  dataChange: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>([]);
  isTblLoading = true;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) {super(); }
    
  getDialogData() {
    return this.dialogData;
  }

  public consultarTodos():Observable<Response<Alumno>>{
    const url = "http://localhost:8081/alumno/consultarTodos";
    
    return this.http.get<Response<Alumno>>(url,
      {headers: new HttpHeaders().append("Content-Type","application/json")});
  }

  consultarAlumnoPorID(pk_alumno : number ): Observable<Response<Alumno>> {
    const url = "http://localhost:8081/alumno/buscarAlumnoPorId/" +  pk_alumno;

    return this.http.get<Response<Alumno>>(url);
  }

  guardarAlumno(Alumno: AlumnoDto): Observable<Response<Alumno>> {
    const url = "http://localhost:8081/alumno/guardarAlumno"; 
                                  //Url y body: objeto que contiene de lo que queremos crear
    return this.http.post<Response<Alumno>>(url, Alumno)
  }

  actualizarAlumno(Alumno : AlumnoDto):Observable<Response<Alumno>>{

    const url = 'http://localhost:8081/alumno/actualizarAlumno';

    return this.http.put<Response<Alumno>>(url, Alumno)
  }
  
  eliminarAlumno(pk_alumno: number): Observable<number> {
    const url = "http://localhost:8081/alumno/borrarAlumnoPorId/" +  pk_alumno

    return this.http.delete<number>(url);
  }

  buscarAlumnoFiltro(filtro: AlumnoFiltroDto): Observable<Response<Alumno>> {
    const url = "http://localhost:8081/alumno/buscarAlumnoFiltro"; 
                                  //Url y body: objeto que contiene de lo que queremos crear
    return this.http.post<Response<Alumno>>(url,filtro)
  }

  get data(): Alumno[] {
    return this.dataChange.value;
  }
}
