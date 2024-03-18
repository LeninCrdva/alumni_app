import { Component, EventEmitter, Output } from '@angular/core';
import { Graduado, Graduado1 } from '../../../data/model/graduado';
import { Subject } from 'rxjs';
import { GraduadoService } from '../../../data/service/graduado.service';
import { Usuario } from '../../../data/model/usuario';
import { Ciudad } from '../../../data/model/ciudad';
import { Rol } from '../../../data/model/rol';
import { Persona } from '../../../data/model/persona';
import { Provincia } from '../../../data/model/provincia';
import { UserService } from '../../../data/service/UserService';
@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['comunidad.component.css']
})
export class ComunidadComponent {
  selectedGraduado: Graduado1 | null = null;

  public urlImage: string = '';
  public rutaimagen: string = '';
  public graduadoid: number = 0;
  public idstring: string = '';
  public nombres: string = '';
  public apellidos: string = '';
  graduado: Graduado1 = { id: 0, usuario: new Usuario(), ciudad: new Ciudad(), año_graduacion: new Date(), emailPersonal: '', estadocivil: '', ruta_pdf: '', url_pdf: '' };

  graduadosList: Graduado1[] = [];
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private graduadoService: GraduadoService, private userservice: UserService) { }

  ngOnInit(): void {
    this.setupDtOptions();
    this.loadData();

    // this.loadUserDataByUsername();
    // this.idstring = localStorage.getItem('idGraduado') || '';
    // this.graduadoid = parseInt(this.idstring, 10);
  }
  showGraduadoDetails(graduado: Graduado1) {
    this.selectedGraduado = graduado;
  }
  contactarPorWhatsapp(numeroTelefono: string): void {
    const mensaje = "Hola, estoy interesado en contactarte.";
    const enlaceWhatsapp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(enlaceWhatsapp, "_blank");
  }


  setupDtOptions() {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: true,
      language: {
        search: 'Buscar:',
        searchPlaceholder: 'Buscar graduado...',
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
    this.graduadoService.getGraduadosWithoutDTO().subscribe(
      result => {

        this.graduadosList = result;
        console.log("Graduados obtenidos:", this.graduadosList);

      },
      (error: any) => console.error(error),
      () => this.dtTrigger.next(null)
    );
  }

  private mapGraduado(graduado: Graduado1): Graduado1 {
    const usuario = new Usuario();
    usuario.id = graduado.usuario.id;
    usuario.clave = graduado.usuario.clave;
    usuario.nombre_usuario = graduado.usuario.nombre_usuario;
    usuario.estado = graduado.usuario.estado;
    usuario.url_imagen = graduado.usuario.url_imagen;
    usuario.persona = this.mapPersona(graduado.usuario.persona);
    usuario.ruta_imagen = graduado.usuario.ruta_imagen;
    usuario.rol = this.mapRol(graduado.usuario.rol);

    const ciudad = new Ciudad();
    ciudad.id = graduado.ciudad.id;
    ciudad.nombre = graduado.ciudad.nombre;
    ciudad.provincia = this.mapProvincia(graduado.ciudad.provincia);

    const graduadoMapped = new Graduado1();
    graduadoMapped.id = graduado.id;
    graduadoMapped.usuario = usuario;
    graduadoMapped.ciudad = ciudad;
    graduadoMapped.año_graduacion = graduado.año_graduacion;
    graduadoMapped.emailPersonal = graduado.emailPersonal;
    graduadoMapped.estadocivil = graduado.estadocivil;
    graduadoMapped.ruta_pdf = graduado.ruta_pdf;
    graduadoMapped.url_pdf = graduado.url_pdf;

    return graduadoMapped;
  }

  private mapPersona(persona: Persona): Persona {
    const personaMapped = new Persona();
    personaMapped.id = persona.id;
    personaMapped.cedula = persona.cedula;
    personaMapped.primer_nombre = persona.primer_nombre;
    personaMapped.segundo_nombre = persona.segundo_nombre;
    personaMapped.fechaNacimiento = persona.fechaNacimiento;
    personaMapped.telefono = persona.telefono;
    personaMapped.apellido_paterno = persona.apellido_paterno;
    personaMapped.apellido_materno = persona.apellido_materno;

    return personaMapped;
  }

  private mapRol(rol: Rol): Rol {
    const rolMapped = new Rol();
    rolMapped.id = rol.id;
    rolMapped.nombre = rol.nombre;
    rolMapped.descripcion = rol.descripcion;

    return rolMapped;
  }

  private mapProvincia(provincia: Provincia): Provincia {
    const provinciaMapped = new Provincia();
    provinciaMapped.id = provincia.id;
    provinciaMapped.nombre = provincia.nombre;
    provinciaMapped.pais = provincia.pais;

    return provinciaMapped;
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
