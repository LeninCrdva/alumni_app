import { Component, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Survey } from '../../../data/model/Survey';
import { Question,QuestionType } from '../../../data/model/Question';
@Component({
  selector: 'app-survey-details-modal',
  templateUrl: './survey-details-modal.component.html',
  styleUrl: './survey-details-modal.component.css'
})
export class SurveyDetailsModalComponent {
  @Input() survey: Survey = new Survey('', '',false ,[]);

  constructor(public bsModalRef: BsModalRef) {} 
  getQuestionTypeLabel(question: Question): string {
    switch (question.type) {
      case QuestionType.ABIERTA:
        return 'Pregunta Abierta';
      case QuestionType.OPCION_MULTIPLE:
        return 'Pregunta de Opción Múltiple';
      case QuestionType.OPCION_MULTIPLEUNICO:
        return 'Pregunta de Opción Múltiple Única';
      case QuestionType.CALIFICACION_1_10:
        return 'Calificación del 1 al 10';
      case QuestionType.CALIFICACION_1_5:
        return 'Calificación del 1 al 5';
      case QuestionType.SI_NO:
        return 'Sí o No';
      default:
        return 'Tipo de Pregunta Desconocido';
    }
  }
  isQuestionAbierta(question: Question): boolean {
    return question.type === QuestionType.ABIERTA;
  }

  isQuestionOpcionMultiple(question: Question): boolean {
    return question.type === QuestionType.OPCION_MULTIPLE;
  }
  isQuestionOpcionMultipleUnico(question: Question): boolean {
    return question.type === QuestionType.OPCION_MULTIPLEUNICO;
  }

  isQuestionCalificacion1_10(question: Question): boolean {
    return question.type === QuestionType.CALIFICACION_1_10;
  }

  isQuestionCalificacion1_5(question: Question): boolean {
    return question.type === QuestionType.CALIFICACION_1_5;
  }

  isQuestionSiNo(question: Question): boolean {
    return question.type === QuestionType.SI_NO;
  }

  getOptions(question: Question): string[] {
    if (question.type === QuestionType.CALIFICACION_1_10) {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    } else if (question.type === QuestionType.CALIFICACION_1_5) {
      return ['1', '2', '3', '4', '5'];
    } else if (question.type === QuestionType.SI_NO) {
      return ['Sí', 'No'];
    } else if (question.type === QuestionType.OPCION_MULTIPLEUNICO) {
     
      return question.options || [];
    } else {
      return []; 
    }
  }

}
