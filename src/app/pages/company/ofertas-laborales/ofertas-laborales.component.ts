import { Component } from '@angular/core';

@Component({
  selector: 'app-postulaciones-add-form',
  templateUrl: './ofertas-laborales.component.html',
  styleUrl: './ofertas-laborales.component.css'
})
export class OfertasLaboralesComponent {
  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }
}
