import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MAIN_ROUTE } from './MAIN_ROUTE';
import { Answer } from '../model/Answer';
import { AnswerSearchDTO } from '../model/DTO/AnswerSearchDTO';
import { SurveyQuestionsAnswersDTO } from '../model/DTO/SurveyQuestionsAnswersDTO';
@Injectable({
  providedIn: 'root'
})
export class AnswerService {


  private baseUrl = MAIN_ROUTE.API_ENDPOINT + '/api/answer';


  constructor(private http: HttpClient) { }

  saveAnswer(answerDTO: AnswerSearchDTO): Observable<Answer> {
    const url = `${this.baseUrl}/save`;
    return this.http.post<Answer>(url, answerDTO)
      .pipe(
        catchError(this.handleError)
      );
  }

  getQuestionsWithAnswersBySurveyId(surveyId: number): Observable<any> {
    const url = `${this.baseUrl}/survey/${surveyId}/questions-answers`;
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllSurveysWithQuestionsAndAnswers(): Observable<SurveyQuestionsAnswersDTO[]> {
    const url = `${this.baseUrl}/all-surveys-questions-answers`;
    return this.http.get<SurveyQuestionsAnswersDTO[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    //console.error('Error en la petición:', error);

    let errorMessage = 'Error en la petición. Por favor, intenta nuevamente.';

    if (error.error instanceof ErrorEvent) {
    
      errorMessage = `Error: ${error.error.message}`;
    } else {
      
     // errorMessage = `Error código ${error.status}: ${error.error.message}`;
    }

    return throwError(errorMessage);
  }
}
