import { Component, EventEmitter, Output } from '@angular/core';
import { Graduado } from '../../../data/model/graduado';
import { Subject } from 'rxjs';
import { GraduadoService } from '../../../data/service/graduado.service';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['comunidad.component.css', '../../../../assets/prefabs/headers.css']
})
export class ComunidadComponent {
  // graduado: Graduado = { cedulaGraduado: '', cargo: '', duracion: '', institucionNombre: '', actividad: '', area_trabajo: '' };
  // graduadoCarga: Graduado = { id: 0, cedulaGraduado: '', cargo: '', duracion: '', institucionNombre: '', actividad: '', area_trabajo: '' };
  // graduadoList: Graduado[] = [];
  // editarClicked = false;

  // dtoptions: DataTables.Settings = {};
  // dtTrigger: Subject<any> = new Subject<any>();

  // idEdit: number = 0;

  // @Output() onClose: EventEmitter<string> = new EventEmitter();

  // constructor(private graduadoService: GraduadoService) { }

  // ngOnDestroy(): void {
  //   this.dtTrigger.unsubscribe();
  // }

  // ngOnInit(): void {
  //   this.obtenerCedula();
  //   this.loadData();
  //   this.setupDtOptions();
  // }

  // setupDtOptions() {
  //   this.dtoptions = {
  //     pagingType: 'full_numbers',
  //     searching: true,
  //     lengthChange: true,
  //     language: {
  //       search: 'Buscar:',
  //       searchPlaceholder: 'Buscar experiencia...',
  //       info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
  //       infoEmpty: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
  //       paginate: {
  //         first: 'Primera',
  //         last: 'Última',
  //         next: 'Siguiente',
  //         previous: 'Anterior',
  //       },
  //       lengthMenu: 'Mostrar _MENU_ registros por página',
  //       zeroRecords: 'No se encontraron registros coincidentes'
  //     },
  //     lengthMenu: [10, 25, 50]
  //   };
  // }

  // // NOTE: MOSTRAR LISTA DE EXPERIENCIAS

  // loadData() {
  //   this.graduadoService.getExperiencias().subscribe(
  //     result => {
  //       this.graduadoList = result;
  //     },
  //     (error: any) => console.error(error)
  //   );
  // }
}
