import { Component, OnInit } from '@angular/core';
import { AnswerService } from '../../../data/service/AnswerService';

import { Observable } from 'rxjs';
import { SurveyQuestionsAnswersStatsDTO } from '../../../data/model/DTO/SurveyQuestionsAnswersStatsDTO';
import * as XLSX from 'xlsx';

import jsPDF from 'jspdf';
@Component({
  selector: 'app-requestencuesta',
  templateUrl: './requestencuesta.component.html',
  styleUrl: './requestencuesta.component.css'
})
export class RequestencuestaComponent {
  surveyQuestionsAnswersStatsList$: Observable<SurveyQuestionsAnswersStatsDTO[]> = new Observable<SurveyQuestionsAnswersStatsDTO[]>();
  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
    this.loadsurveysWithQuestionsAnswersAndStats();
  }
  
  loadsurveysWithQuestionsAnswersAndStats(): void {
    this.surveyQuestionsAnswersStatsList$ = this.answerService.getAllSurveysWithQuestionsAnswersAndStats();
  
    this.surveyQuestionsAnswersStatsList$.subscribe(data => {
      //console.log('Encuestas con preguntas, respuestas y estadísticas:', data);
    }, error => {
      console.error('Error al cargar encuestas con preguntas, respuestas y estadísticas:', error);
    });
  }
  downloadAsExcel(survey: SurveyQuestionsAnswersStatsDTO): void {
    const surveysData: Array<Array<any>> = [];
    
    survey.questionsWithAnswers.forEach((question, index) => {
      const rowData: Array<any> = [
        survey.surveyTitle,
        survey.surveyDescription,
        question.questionText,
        question.typeQuestion,
        `Pregunta ${index + 1}` // Agregar indicador de número de pregunta
      ];

      if (question.typeQuestion === 'ABIERTA') {
        // Para preguntas abiertas, agregar cada respuesta como una celda individual
        question.questionAnswers.forEach(answer => {
          surveysData.push([...rowData, answer]); // Agregar cada respuesta como una fila separada
        });
      } else {
        // Para otros tipos de preguntas, agregar cada opción de respuesta como una celda individual
        for (const [key, value] of Object.entries(question.responsesByOption)) {
          const response = `${key}: ${value}`;
          surveysData.push([...rowData, response]); // Agregar cada opción de respuesta como una fila separada
        }
      }
    });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Encuesta', 'Descripción', 'Pregunta', 'Tipo de Pregunta', 'Número de Pregunta', 'Respuestas'],
      ...surveysData
    ]);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${survey.surveyTitle}`);
    XLSX.writeFile(wb, `${survey.surveyTitle}.xlsx`);
  }
  downloadAsPDF(survey: SurveyQuestionsAnswersStatsDTO): void {
    const doc = new jsPDF();

    let yPos = 10; // Iniciar posición Y para el contenido

    // Encabezado del PDF
    doc.text(`Encuesta: ${survey.surveyTitle}`, 10, yPos);
    yPos += 10;
    doc.text(`Descripción: ${survey.surveyDescription}`, 10, yPos);
    yPos += 10;
    doc.text('Respuestas:', 10, yPos);
    yPos += 10;

    // Iterar sobre las preguntas y respuestas
    survey.questionsWithAnswers.forEach((question, index) => {
      let answersText = '';

      if (question.typeQuestion === 'ABIERTA') {
        // Para preguntas abiertas, unir las respuestas con saltos de línea
        answersText = question.questionAnswers.join('\n');
      } else {
        // Para otros tipos de preguntas, construir el texto de las respuestas
        for (const [key, value] of Object.entries(question.responsesByOption)) {
          answersText += `${key}: ${value}\n`;
        }
      }

      const questionText = `${index + 1}. ${question.questionText}`;
      doc.text(questionText, 10, yPos);
      yPos += 5;
      doc.text(answersText, 15, yPos);
      yPos += 10; // Espacio entre preguntas
    });

    // Guardar y descargar el archivo PDF
    doc.save(`${survey.surveyTitle}.pdf`);
  }
}
