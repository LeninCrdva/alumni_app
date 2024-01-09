import { Component } from '@angular/core';

@Component({
  selector: 'app-formpreguntaas',
  templateUrl: './formpreguntaas.component.html',
  styleUrl: './formpreguntaas.component.css'
})

export class FormpreguntaasComponent {
  title = 'DynamicForm';

  questions = [
     { label: 'Name', type: 'text', required: true },
     { label: 'Email', type: 'email', required: true },
     { label: 'Age', type: 'number', required: false },
     { label: 'Age', type: 'number', required: false },
     { label: 'Age', type: 'number', required: false },
     { label: 'Age', type: 'number', required: false },
     { label: 'Age', type: 'number', required: false },
     { label: 'Age', type: 'number', required: false },
     { label: 'Age', type: 'number', required: false },
     { label: 'Age', type: 'number', required: false },
     { label: 'AAAA', type: 'number', required: false },
  ];

  questionsPerPage: number = 10;
  currentPage: number = 1;

  // Función para obtener las preguntas de la página actual
  getQuestionsForCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    return this.questions.slice(startIndex, endIndex);
  }

  // Función para obtener un array de páginas
  getPages(): number[] {
    const pageCount = Math.ceil(this.questions.length / this.questionsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  // Función para cambiar la página actual
  setCurrentPage(page: number): void {
    this.currentPage = page;
  }
}
