import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css']
})

export class StateListComponent {
  data: any[] = [
    { nombre: 'Isidra', apellido: 'Boudreaux', jobTitle: 'Traffic Court Referee', dob: '22 Jun 1972', estado: 'Activo' },
    { nombre: 'Isidra', apellido: 'Boudreaux', jobTitle: 'Traffic Court Referee', dob: '22 Jun 1972', estado: 'Activo' },
    { nombre: 'Isidra', apellido: 'Boudreaux', jobTitle: 'Traffic Court Referee', dob: '22 Jun 1972', estado: 'Activo' },
    { nombre: 'Isidra', apellido: 'Boudreaux', jobTitle: 'Traffic Court Referee', dob: '22 Jun 1972', estado: 'Activo' },
    { nombre: 'Isidra', apellido: 'Boudreaux', jobTitle: 'Traffic Court Referee', dob: '22 Jun 1972', estado: 'Activo' },
    { nombre: 'Isidra', apellido: 'Boudreaux', jobTitle: 'Traffic Court Referee', dob: '22 Jun 1972', estado: 'Activo' },
    { nombre: 'Isidra', apellido: 'Boudreaux', jobTitle: 'Traffic Court Referee', dob: '22 Jun 1972', estado: 'Activo' },
    { nombre: 'Isidra', apellido: 'Boudreaux', jobTitle: 'Traffic Court Referee', dob: '22 Jun 1972', estado: 'Activo' },
    { nombre: 'PERRO SUCIO PERRO', apellido: 'Boudreaux', jobTitle: 'Traffic Court Referee', dob: '22 Jun 1972', estado: 'Activo' },

    // Agrega más datos según sea necesario
  ];
  
  pageSize = 5; // Número de elementos por página
  currentPage = 1; // Página actual
  totalPages: number = 1;
  totalPagesArray: number[] | undefined;  // Nuevo atributo
  paginatedData: any[] | undefined;

  ngOnInit(): void {
    this.calculateTotalPages();
    this.paginate();
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.data.length / this.pageSize);
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }
}
