import { Component, EventEmitter, Output } from '@angular/core';
import { Graduado } from '../../../data/model/graduado';
import { Subject } from 'rxjs';
import { GraduadoService } from '../../../data/service/graduado.service';
import { Usuario } from '../../../data/model/usuario';
import { Ciudad } from '../../../data/model/ciudad';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['comunidad.component.css', '../../../../assets/prefabs/headers.css']
})
export class ComunidadComponent {

  public urlImage: string = '';
  public rutaimagen: string = '';
  public graduadoid: number = 0;
  public idstring: string = '';
  public nombres: string = '';
  public apellidos: string = '';
  graduado: Graduado = { id: 0, usuario: new Usuario(), ciudad: new Ciudad(), fecha_graduacion: new Date(), emailPersonal: '', estadocivil: '', ruta_pdf: '', url_pdf: '' };

  graduadosList: Graduado[] = [];
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private graduadoService: GraduadoService) { }

  ngOnInit(): void {
    this.setupDtOptions();
    this.loadData();

    // this.loadUserDataByUsername();
    // this.idstring = localStorage.getItem('idGraduado') || '';
    // this.graduadoid = parseInt(this.idstring, 10);
  }

  setupDtOptions() {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language: {
        search: 'Buscar:',
        searchPlaceholder: 'Buscar experiencia...',
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
      lengthMenu: [10, 25, 50]
    };
  }

  loadData() {
    this.graduadoService.getGraduados().subscribe(
      result => {
        this.graduadosList = result;
        console.log("usuario"+this.graduadosList[0].usuario.nombre_usuario);
      },
      (error: any) => console.error(error),
      () => this.dtTrigger.next(null)
    );
  }

  loadUserDataByUsername() {
    const storedRutaImagen = localStorage.getItem('ruta_imagen');
    const storedUrlImagen = localStorage.getItem('url_imagen');
    if (storedRutaImagen && storedUrlImagen) {
      this.rutaimagen = storedRutaImagen;
      this.urlImage = storedUrlImagen;
    } else {
      console.error('La información de imagen no está disponible en localStorage.');
    }
  }
}
