import { Component } from '@angular/core';

@Component({
  selector: 'app-pyc-list',
  templateUrl: './pyc-list.component.html',
  styleUrls: ['./pyc-list.component.css']
})

export class PycListComponent {
    
  datos: any[] = [
    
    { 
      id: 1, 
      nombre: 'Ejemplo 1', 
      descripcion: 'Descripción 1',
      subitems: [
        { id: 1.1, nombre: 'Subitem 1', descripcion: 'Descripción subitem 1' },
        { id: 1.2, nombre: 'Subitem 2', descripcion: 'Descripción subitem 2' },
        // Agrega más subítems según sea necesario
      ]
    },
    { 
      id: 2, 
      nombre: 'Ejemplo 2', 
      descripcion: 'Descripción 2',
      subitems: [
        { id: 2.1, nombre: 'Subitem 1', descripcion: 'Descripción subitem 1' },
        { id: 2.2, nombre: 'Subitem 2', descripcion: 'Descripción subitem 2' },
        // Agrega más subítems según sea necesario
      ]
    },
    { 
      id: 3, 
      nombre: 'Ejemplo 3', 
      descripcion: 'Descripción 3',
      subitems: [
        { id: 3.1, nombre: 'Subitem 1', descripcion: 'Descripción subitem 1' },
        { id: 3.2, nombre: 'Subitem 2', descripcion: 'Descripción subitem 2' },
        // Agrega más subítems según sea necesario
      ]
    },
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
