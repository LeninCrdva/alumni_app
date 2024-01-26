import { Component, OnInit } from '@angular/core';
import { TituloService } from '../../../data/service/titulo.service';
import { Titulo } from '../../../data/model/titulo';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css', '../../../../assets/prefabs/headers.css']
})
export class TitulosComponent implements OnInit {

  editarClicked = false;

  'titulo': Titulo;

  onEditarClick(): void {
    this.editarClicked = true;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }
  titulos: any[] = [];

  constructor(private tituloService: TituloService) { }

  ngOnInit(): void {
    this.loadTitulos();
  }

  loadTitulos() {
    // this.tituloService.getAllTitulos().subscribe(
    //   (      data: any[]) => {
    //     this.titulos = data;
    //   },
    //   (      error: any) => {
    //     console.error('Error al cargar los títulos:', error);
    //   }
    // );
  }

  onUpdateClick(id: number) {
    // Lógica para actualizar un título
    // Puedes abrir el modal o realizar otras acciones según tu implementación
  }

  onDeleteClick(id: number) {
    // Lógica para eliminar un título
    this.tituloService.deleteTitulo(id).subscribe(
      () => {
        // Actualizar la lista después de la eliminación
        this.loadTitulos();
      },
      error => {
        console.error('Error al eliminar el título:', error);
      }
    );
  }
}