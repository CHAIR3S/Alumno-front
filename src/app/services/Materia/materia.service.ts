import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders , HttpRequest,  HttpEvent, HttpParams} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from "src/app/toUse/UnsubscribeOnDestroyAdapter";
import { catchError, retry, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MateriaService extends  UnsubscribeOnDestroyAdapter{
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

  consultarAlumnoPorID(pk_alumno): Observable<Response<Alumno>> {
    const url = "http://localhost:8081/alumno/consultarAlumnoPorID/" +  pk_alumno

    return this.http.get<Response<Alumno>>(url);
  }

  consultarMateriasAlumno(pk_alumno): Observable<Response<Object[]>> {
    const url = "http://localhost:8081/alumno/consultarMateriasAlumno/" +  pk_alumno

    return this.http.get<Response<Object[]>>(url);
  }

  
  guardarAlumno(alumno: AlumnoRequest): Observable<Response<Alumno>> {
    const url = "http://localhost:8081/alumno/guardarAlumno"; 
                                  //Url y body: objeto que contiene de lo que queremos crear
    return this.http.post<Response<Alumno>>(url,alumno)
  }

  editarAlumno(alumno: AlumnoRequest):Observable<Response<Alumno>>{
    const url = 'http://localhost:8081/alumno/actualizarAlumno';


    return this.http.put<Response<Alumno>>(url,alumno)
  }
  
  eliminarAlumno(pk_alumno: number): Observable<number> {
    const url = "http://localhost:8081/alumno/borrarAlumnoPorId/" +  pk_alumno

    return this.http.delete<number>(url);
  }

  buscarAlumnoFiltro(filtro: AlumnoFiltroRequest): Observable<Response<Alumno>> {
    const url = "http://localhost:8081/alumno/buscarAlumno"; 
                                  //Url y body: objeto que contiene de lo que queremos crear
    return this.http.post<Response<Alumno>>(url,filtro)
  }

  get data(): Alumno[] {
    return this.dataChange.value;
  }
}
