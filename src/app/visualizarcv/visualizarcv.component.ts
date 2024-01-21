import { Component } from '@angular/core';

@Component({
  selector: 'app-visualizarcv',
  templateUrl: './visualizarcv.component.html',
  styleUrl: './visualizarcv.component.css'
})
export class VisualizarcvComponent {
  data = {
    education: [
      {
        title: 'Licenciatura en Informática',
        date: '2010-2014',
        institution: 'Universidad XYZ'
      }
    ],
    jobPreferences: [
      {
        title: 'Desarrollador Web Full Stack'
      }
    ],
    references: [
      {
        name: 'Jane Smith',
        phone: '(555) 123-4567'
      }
    ]
 };
}
