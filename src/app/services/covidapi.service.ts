import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mundo } from '../model/mundo.model';
import { Pais } from '../model/pais.model';
import { Observable } from 'rxjs';
import { TimeLine } from '../model/timeline-cases.model';

@Injectable({
  providedIn: 'root'
})
export class CovidapiService {

  url = 'https://corona.lmao.ninja';

  constructor(private http: HttpClient) {
  }

   getInfoMundo():Observable<Mundo> {
    return this.http.get<Mundo>(`${this.url}/all`);
  }

  getInfoPais(pais: string = 'brazil'):Observable<Pais>  {
    return this.http.get<Pais>(`${this.url}/countries/${pais}`)   
  }

  async getHistorico(pais:string){
    return await this.http.get<any>(`${this.url}/v2/historical/${pais}`).toPromise()
    .then(timeline => {return timeline})
  }

  getInfoBrasilEstados(estado){
    return this.http.get<any>(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${estado}`)
  }

  getAllEstados():Observable<any>{
    return this.http.get<any>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/`)
  }
}
