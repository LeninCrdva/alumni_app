import { Component } from '@angular/core';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css', '../../../../assets/prefabs/headers.css']
})
export class TitulosComponent {

  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }
}
