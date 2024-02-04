import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TituloService } from '../../../data/service/titulo.service';
import { Titulo } from '../../../data/model/titulo';
import { Carrera } from '../../../data/model/carrera';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CarreraService } from '../../../data/service/carrera.service';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css', '../../../../assets/prefabs/headers.css']
})
export class TitulosComponent implements OnInit {
  public idGraduado: number = 0;
  public carrerasList: Carrera[] = [];

  titulo: Titulo = { idgraduado: this.idGraduado, tipo: '', nivel: '', institucion: '', nombre_titulo: '', fecha_registro: new Date(), fecha_emision: new Date(), num_registro: '', nombrecarrera: '' };
  tituloCarga: Titulo = { id: 0, idgraduado: this.idGraduado, tipo: '', nivel: '', institucion: '', nombre_titulo: '', fecha_registro: new Date(), fecha_emision: new Date(), num_registro: '', nombrecarrera: '' };
  tituloList: Titulo[] = [];

  editarClicked = false;
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  mensajeMostrado = false;
  idEdit: number = 0;

  @Output() onClose: EventEmitter<string> = new EventEmitter();

  constructor(private tituloService: TituloService, private carrerasService: CarreraService) { }

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language: {
        search: 'Buscar:',
        searchPlaceholder: 'Buscar titulo ...',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        infoEmpty: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
          first: 'Primera',
          last: 'Última',
          next: 'Siguiente',
          previous: 'Anterior',
        },
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: 'No se encontraron registros coincidentes'
      },
      lengthMenu: [10, 20, 50]
    };

    this.obtenerIDUsuario();
    this.obtenerCarreras();
    this.loadData();
  }

  // NOTE: MOSTRAR LISTA DE EXPERIENCIAS

  loadData() {
    this.tituloService.getTitulos().subscribe(
      titulos => {
        this.tituloList = titulos;
      },
      (error: any) => console.error(error)
    );
  }

  // NOTE: CRUD EVENTS
  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onSubmit() {
    if (this.editarClicked) {
      this.onUpdateClick(); // Lógica de actualización
    } else {
      this.createExperiencia(); // Lógica de creación
    }
  }

  createExperiencia() {
    this.titulo.idgraduado = this.idGraduado;

    this.editarClicked = false;
    console.log('ID del graduado:', this.titulo.idgraduado);

    this.tituloService.createTitulo(this.titulo).subscribe(
      titulo => {
        console.log('Titulo creado exitosamente:', titulo);
        this.loadData();
        this.mostrarSweetAlert(true, 'El titulo se ha guardado exitosamente.');
        this.mensajeMostrado = true;
      },
      error => {
        this.mostrarSweetAlert(false, 'Hubo un error al intentar guardar el titulo.');
      }
    );
  }

  onEditarClick(id: number | undefined = 0): void {
    this.editarClicked = true;
    this.tituloService.getTituloById(id).subscribe(
      titulo => this.tituloCarga = titulo,
      error => console.error(error)
    )
    this.idEdit = id;
  }

  onUpdateClick() {
    console.log('ID del titulo:', this.idEdit);
    this.tituloCarga.idgraduado = this.idGraduado;

    this.tituloService.updateTitulo(this.idEdit, this.tituloCarga).subscribe(
      titulosActualizado => {
        console.log('Sector actualizado exitosamente:', titulosActualizado);
        this.titulo = titulosActualizado;
        this.mostrarSweetAlert(true, 'El titulo se ha actualizado exitosamente.');
        this.loadData();
      },
      error => {
        console.error('Error al actualizar el titulo:', error);
        this.mostrarSweetAlert(false, 'Error al actualizar el titulo.');
      }
    );
  }

  onDeleteClick(id: number | undefined = 0) {
    this.tituloService.deleteTitulo(id).subscribe(
      () => {
        console.log('Titulo eliminado exitosamente');
        this.mostrarSweetAlert(true, 'El titulo se ha eliminado exitosamente.');
        this.loadData();
      },
      error => {
        console.error('Error al eliminar el titulo:', error);
        this.mostrarSweetAlert(false, 'Error al eliminar el titulo.');
      }
    );
  }

  // NOTE: VALIDACIONES

  validarNumero(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  allowOnlyLetters(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    const lettersRegex = /^[a-zA-Z]+$/;

    if (!lettersRegex.test(inputChar)) {
      event.preventDefault();
    }
  }

  allowOnlyNumbers(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  mostrarSweetAlert(esExitoso: boolean, mensaje: string) {
    const titulo = esExitoso ? 'Completado exitosamente' : 'Se ha producido un error';

    Swal.fire({
      icon: esExitoso ? 'success' : 'error',
      title: titulo,
      text: mensaje,
      allowOutsideClick: !esExitoso,
    }).then((result) => {
      if (esExitoso || result.isConfirmed) {
        this.onClose.emit(esExitoso ? 'guardadoExitoso' : 'errorGuardado');
      }
    });
  }

  obtenerIDUsuario() {
    const userDataString = localStorage.getItem('user_data');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      this.idGraduado = userData.persona.id;
    }
    console.log('ID del usuario:', this.idGraduado);
  }

  obtenerCarreras() {
    this.carrerasService.getCarreras().subscribe(
      carreras => {
        this.carrerasList = carreras;
      },
      (error: any) => console.error(error)
    );
  }
}