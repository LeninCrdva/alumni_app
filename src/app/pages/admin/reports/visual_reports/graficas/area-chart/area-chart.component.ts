import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, 
  ApexDataLabels, ApexYAxis, ApexTitleSubtitle, 
  ApexLegend, ApexFill } from 'ng-apexcharts';
  

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  fill: ApexFill;
};

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {
  public chartOptions!: ChartOptions;

  public response: any;
  public fechas: string[] = [];
  public cantidades: number[] = [];

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.apiservice.getPostulacionesPorDia().subscribe(
      (data) => {
        this.response = data;
        this.fechas = Object.keys(this.response);
        this.cantidades = Object.values(this.response);
  
        console.log('Fechas:', this.fechas);
        console.log('Cantidades:', this.cantidades);
  
        // Crear un array de objetos { x, y } para cada fecha y cantidad
        const dataPoints = this.fechas.map((fecha, index) => ({
          x: fecha, 
          y: this.cantidades[index],
        }));
  
        this.chartOptions = {
          series: [
            {
              name: 'CANTIDAD DE POSTULACIONES',
              data: dataPoints,
            },
          ],
          chart: {
            type: 'area',
            height: 430,
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            style: {
              colors: [ '#1ed760']
            },
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
            width: 1,
          },
          fill: {
            colors: ['#1cc759'], // Puedes cambiar este color
            opacity: 0.3, // Puedes ajustar la opacidad si es necesario
          },
          title: {
            text: 'Reporte de Postulaciones por Día',
            align: 'center',
          },
          subtitle: {
            text: '',
            align: 'left',
          },
          xaxis: {
            type: 'category',
          },
          yaxis: {
            opposite: true,
          },
          legend: {
            horizontalAlign: 'left',
          },
          labels: this.fechas,
        };
  
        // Llama al evento "resize", actualizando el chart.
        setTimeout(() => (window as any).dispatchEvent(new Event('resize')), 1);
      },
      (error) => {
        console.error('Error al obtener postulaciones por día:', error);
      }
    );
  }
}
