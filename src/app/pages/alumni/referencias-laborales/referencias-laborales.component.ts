import { Component } from '@angular/core';

@Component({
  selector: 'app-referencias-laborales',
  templateUrl: './referencias-laborales.component.html',
  styleUrls: ['./referencias-laborales.component.css', '../../../../assets/prefabs/headers.css']
})
export class ReferenciasLaboralesComponent {

  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }
}