import { Component } from '@angular/core';

@Component({
  selector: 'app-referencias-personales',
  templateUrl: './referencias-personales.component.html',
  styleUrl: './referencias-personales.component.css'
})
export class ReferenciasPersonalesComponent {

  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }
  
  onRegistrarClick(): void {
    this.editarClicked = false;
  }
}
