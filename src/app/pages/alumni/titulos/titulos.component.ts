import { Component } from '@angular/core';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrl: './titulos.component.css'
})
export class TitulosComponent {

  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }
}
