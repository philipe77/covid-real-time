import { Component, OnInit } from '@angular/core';
import { CovidapiService } from 'src/app/services/covidapi.service';
import { Mundo } from 'src/app/model/mundo.model';
import { Pais } from 'src/app/model/pais.model';
import { formatDate } from '@angular/common';
import { Estado } from 'src/app/model/estados-brasil';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  hoje: any;
  mundo: Mundo;
  pais: Pais;
  estados:Estado[]=[]
  estadoInput:string ="" ;
  
  constructor(private covidApi: CovidapiService) {
  }

  ngOnInit() {
    this.covidApi.getInfoMundo().subscribe((mundo: Mundo) => {
      this.mundo = mundo;
      formatDate(new Date(mundo.updated), 'dd/MM/yyyy, h:MM:ss', 'en-US');
      console.log(mundo)

    });

    this.covidApi.getInfoPais().subscribe((pais: Pais) => {
      this.pais = pais;
      let test =new Date(this.pais.updated).getTime() + (2*60*60*1000);
      
      this.transformData(new Date(test))
    });

    this.getAllEstados()
  }

  getPaisPercent() {
    return parseFloat((this.pais.deaths * 100 / this.pais.cases).toFixed(2)) + '%';
  }

  geMundoPercent() {
    return parseFloat((this.mundo.deaths * 100 / this.mundo.cases).toFixed(2)) + '%';
  }

  transformData(data: Date) {
    this.hoje = formatDate(data, 'dd/MM/yyyy', 'pt-BR');
  }

  // função para converter data
  converterData(dataPar:string) {
    return formatDate(dataPar, 'dd/MM', 'pt-BR');
  }

  getAllEstados(){
    this.covidApi.getAllEstados().subscribe((resp:Estado[])=>{
      this.estados =resp
    })
  }

  getInfoByEstado(){
    this.covidApi.getInfoBrasilEstados(this.estadoInput).subscribe(resp=>{
      Swal.fire({
        title: `Estado selecionado: ${resp.state}`,
        html: `<p>Casos Confirmados: ${resp.cases}</<p>
                <p>Mortes Confirmadas: ${resp.deaths}</<p>
                <p>Casos Suspeitos: ${resp.suspects}</<p>`,
        
        inputPlaceholder: 'País'
      })
    })
  }


}