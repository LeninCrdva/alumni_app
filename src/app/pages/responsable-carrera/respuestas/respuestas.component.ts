import { Component, OnInit } from '@angular/core';
import { AnswerService } from '../../../data/service/AnswerService';
import { SurveyQuestionsAnswersDTO } from '../../../data/model/DTO/SurveyQuestionsAnswersDTO';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrl: './respuestas.component.css'
})
export class RespuestasComponent {
  surveyQuestionsAnswersList$: Observable<SurveyQuestionsAnswersDTO[]> = new Observable<SurveyQuestionsAnswersDTO[]>();

  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
    this.loadSurveysWithQuestionsAndAnswers();
  }

  loadSurveysWithQuestionsAndAnswers(): void {
    this.surveyQuestionsAnswersList$ = this.answerService.getAllSurveysWithQuestionsAndAnswers();
  
    this.surveyQuestionsAnswersList$.subscribe(data => {
     // console.log('Lista de encuestas con preguntas y respuestas:', data);
    }, error => {
      console.error('Error al cargar encuestas con preguntas y respuestas:', error);
    });
  }
}
