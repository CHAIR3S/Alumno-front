import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Grupo } from '../../model/Grupo';
import { Response } from '../../model/Response';
import { AlumnoAndFiltroDto } from 'src/app/DTO/AlumnoAndFiltroDTO';
import { Ciclo } from '../../model/Ciclo';
import { UnsubscribeOnDestroyAdapter } from 'src/app/toUse/UnsubscribeOnDestroyAdapter';
import { GrupoFiltroDto } from 'src/app/DTO/GrupoFiltroDTO';

@Injectable({
  providedIn: 'root',
})
export class GrupoService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/clients.json';
  dialogData: any;
  dataChange: BehaviorSubject<Grupo[]> = new BehaviorSubject<Grupo[]>([]);
  isTblLoading = true;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    super();
  }

  consultarTodos(): Observable<Response<Grupo>> {
    const url = 'http://localhost:8081/grupo/consultarTodos';

    return this.http.get<Response<Grupo>>(url, {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  buscarGrupoFiltro(filtro: GrupoFiltroDto): Observable<Response<Grupo>> {
    const url = 'http://localhost:8081/grupo/buscarGrupoFiltro';
    //Url y body: objeto que contiene de lo que queremos crear
    return this.http.post<Response<Grupo>>(url, filtro);
  }

  get data(): Grupo[] {
    return this.dataChange.value;
  }
}
