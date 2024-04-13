import { Component } from '@angular/core';
import { SurveyService } from '../../../data/service/SurveyService';
import { Survey } from '../../../data/model/Survey';
import { EncuestasaresponderformComponent } from '../encuestasaresponderform/encuestasaresponderform.component';
import { BsModalService} from 'ngx-bootstrap/modal';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-encuestasresponse',
  templateUrl: './encuestasresponse.component.html',
  styleUrl: './encuestasresponse.component.css'
})
export class EncuestasresponseComponent {
  surveys: Survey[] = [];

  constructor(private surveyService: SurveyService,private modalService: BsModalService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.surveyService.getAllSurveysWithQuestionsAndOptions()
      .subscribe(
        (surveys: Survey[]) => {
          this.surveys = surveys.filter(survey => survey.estado === true);
          //console.log('Encuestas con preguntas y opciones:', this.surveys);
        },
        (error) => {
          //console.error('Error al recuperar encuestas:', error);
        
        }
      );
  }

  viewSurvey(survey: Survey): void {
    const initialState = { survey }; 
    this.modalService.show(EncuestasaresponderformComponent, { initialState });
  }

 


}
