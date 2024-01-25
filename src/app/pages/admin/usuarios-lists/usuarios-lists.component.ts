import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios-lists',
  templateUrl: './usuarios-lists.component.html',
  styleUrls: ['./usuarios-lists.component.css', '../../../../assets/prefabs/headers.css']
})
export class UsuariosListsComponent {
  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }
  datos: any[] = [
    { id: 1, nombre: 'Ejemplo 1', descripcion: 'Descripción 1' },
    { id: 2, nombre: 'Ejemplo 2', descripcion: 'Descripción 2' },
    { id: 0, nombre: 'Ejemplo 0', descripcion: 'Descripción 0' },

    // Agrega más datos según sea necesario
  ];

  sortByName() {
    this.datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  sortByCountry() {
    this.datos.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
  }

  sortByAge() {
  }
}
