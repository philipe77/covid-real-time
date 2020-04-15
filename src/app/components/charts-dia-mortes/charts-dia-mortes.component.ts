import { Component, OnInit } from '@angular/core';
import { CovidapiService } from 'src/app/services/covidapi.service';
import { TimeLineCase, MortesPorPais, TimeLine, Cases } from 'src/app/model/timeline-cases.model';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import * as chartJs from 'chart.js';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-charts-dia-mortes',
  templateUrl: './charts-dia-mortes.component.html',
  styleUrls: ['./charts-dia-mortes.component.scss']
})
export class ChartsDiaMortesComponent implements OnInit {

  arrMortesPorPais: MortesPorPais[] = []
  timeLine: TimeLineCase = {} as TimeLineCase
  colunaChart: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'nenhum' }];
  linhaChart: Label[] = ['2/2/20'];

  paisesChart: Array<any> = [{ index: 0, nome: "Brazil" },
  { index: 1, nome: "Spain" },
  { index: 2, nome: "USA" },
  { index: 3, nome: "China" },
  { index: 4, nome: "Italy" }];

  colors = ['none', 'green', 'blue', 'yellow', 'purple', 'red'];
  colorIndex = 0;
  
  lineChartColors: Color[] = [];
  
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: chartJs.ChartType = 'line';

  lineChartOptions = {
    responsive: true,
  };

  constructor(private covidApiService: CovidapiService) { }

  async ngOnInit() {
    this.arrMortesPorPais.push(await this.covidApiService.getHistorico("Italy"));
    this.arrMortesPorPais.push(await this.covidApiService.getHistorico("Brazil"));
    this.arrMortesPorPais.push(await this.covidApiService.getHistorico("China"));
    this.arrMortesPorPais.push(await this.covidApiService.getHistorico("USA"));
    this.arrMortesPorPais.push(await this.covidApiService.getHistorico("Spain"));

    this.montarDadosParaGráfico()

  }

  montarDadosParaGráfico() {
  
    if (this.arrMortesPorPais) {
      
      //array de mortes por pais
      this.arrMortesPorPais.forEach(mortePorPais => {
        let dataMortes = this.montarDataMortes(mortePorPais.timeline.deaths);
        let deaths:Array<number>=[]
        dataMortes.forEach(m=>{
          deaths.push(m.morte)
        })
        for(let i=0; i<= this.colors.length; i++)
        this.lineChartColors.push({borderColor:this.colors[i], backgroundColor:'transparent',borderWidth:1.5})
        this.colunaChart.push({
          data: deaths,
          label: mortePorPais.country
        })
      })
    }
  }

  montarDataMortes(mortes) {
    let data = new Date("2020-3-15")
    let hoje = new Date();
    let arrDatasMorte: Array<{data:string,morte:number}> = [];
    let datas:Array<string>=[]
    while (data < hoje) {
      data.setDate(data.getDate() + 1)
      let formatData: string = formatDate(data, 'M/d/yy', 'pt-BR');
      datas.push(formatData)
      arrDatasMorte.push({data:formatData,morte:mortes[formatData]})
    }
    datas.splice(-2)
    arrDatasMorte.splice(-2)
    this.linhaChart = datas
    return arrDatasMorte;
  }
}
