import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {
  ApexChart,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  ApexOptions,
  ApexResponsive,
  ApexFill
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  labels: string[];
  options: ApexOptions;
  responsive: ApexResponsive;
  fill: ApexFill;
};
  
@Component({
  selector: 'app-pie-chart2',
  templateUrl: './pie-chart2.component.html',
  styleUrl: './pie-chart2.component.css'
})
export class PieChart2Component implements OnInit {

  public chartOptions!: ChartOptions;

  public response: any = {};
  public opci: string[] = [];
  public cantidad: number[] = [];

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    this.apiservice.getSexCount().subscribe(
      (data) => {
        this.response = data || {}; // Manejo de datos nulos
        this.opci = Object.keys(this.response);
        this.cantidad = Object.values(this.response);

        console.log('sexo: :', this.opci);
        console.log('Cantidadsexo:', this.cantidad);

        if (this.opci.length > 0 && this.cantidad.length > 0) {
          const dataPoints = this.opci.map((opci, index) => ({
            x: opci,
            y: this.cantidad[index],
          }));

          this.chartOptions = {
            series: this.cantidad,
            chart: {
              type: 'pie',
              width: "100%",
              fontFamily: 'Poppins, sans-serif',
              redrawOnParentResize:true,
              selection: {
                enabled: true
              },
              zoom: {
                enabled: true,
              },
              toolbar: {
                show: true,
                offsetX: -18,
                offsetY: 0,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  customIcons: []
                },
                export: {
                  csv: {
                    filename: "Graduados por tipo de Sexo",
                    columnDelimiter: '/t',
                    headerCategory: 'Graduado',
                    headerValue: 'Cantidad',
                    dateFormatter(timestamp?: string | number) {
                      if (timestamp !== undefined) {
                        return new Date(timestamp).toDateString();
                      } else {
                        // Manejo para el caso en que timestamp es undefined
                        return 'Fecha no disponible';
                      }
                    }
                  },
                  svg: {
                    filename: "Reporte de Graduados por Sexo",
                  },
                  png: {
                    filename: "Reporte de Graduados por Sexo",
                  }
                },
                autoSelected: 'zoom' 
              },
               
            },
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ["#28b2bc"],
                inverseColors: true,
                stops: [20, 80]
              },
            },
            dataLabels: {
              style: {
                colors: ['#fdfdfd']
              },
              enabled: true,
            },
            title: {
              text: 'Graduados Por Tipo De Sexo',
              align: 'center',
            },
            labels: this.opci,
            
            options:{
              plotOptions: {
                pie: {
                  customScale: 200,
                  expandOnClick:true,
                  
                }
              }
            },
            responsive:{
                breakpoint:1000,
            },
          };

          // Llama al evento "resize", actualizando el chart.
        } else {
          console.warn('No hay datos válidos para el gráfico.');
        }
      },
      (error) => {
        console.error('Error al obtener postulaciones por día:', error);
      }
    );
  }
  
  private lastBodyHeight = 0;

}