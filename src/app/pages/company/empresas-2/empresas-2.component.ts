import { Component } from '@angular/core';
import { Empresa } from '../../../data/model/empresa';
import { Ciudad } from '../../../data/model/ciudad';
import { sectorempresarial } from '../../../data/model/sectorEmpresarial';
import { EmpresaService } from '../../../data/service/empresa.service';
import { CiudadService } from '../../../data/service/ciudad.service';
import { SectorEmpresarialService } from '../../../data/service/sectorempresarial.service';
import { Empresario } from '../../../data/model/empresario';
import { Usuario } from '../../../data/model/usuario';
import { EmpresarioService } from '../../../data/service/empresario.service';
import { Provincia } from '../../../data/model/provincia';

@Component({
  selector: 'app-empresas-2',
  templateUrl: './empresas-2.component.html',
  styleUrl: './empresas-2.component.css'
})
export class Empresas2Component {

  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  //ID del usuario logueado
  idUser: number = parseInt(localStorage.getItem('idUser') || '0', 10);
  //Para obtener el empresario del usuario logueado
  empresariouser: String | undefined= '';
  //Para ciudad y sector empresarial
  ciudadSeleccionada:any={};
  sectorSeleccionado: any= {};
  //Para obtener el empresario del usuario logueado
  empresass: Empresa[] = [];
  empresanueva: any = {};
  empresaeditar: Empresa | undefined;
  ciudades: Ciudad[] = [];
  sectoresEmpresariales: sectorempresarial[] = [];

  ID_Ciudad: number = 0;
  ID_Sector: number = 0;

  constructor(private empresaService: EmpresaService, private ciudadService: CiudadService, private sectorempresarialService: SectorEmpresarialService, private serviceempresario:EmpresarioService) { }

  ngOnInit(): void {
    this.buscarEmpresass();

    this.ciudadSeleccionada = {
      id: 0,
      nombre: '',
      provincia: new Provincia(),
    }
    this.sectorSeleccionado = {
      id: 0,
      nombre: '',
      descripcion: '',
    }
    this.empresanueva = {
      empresario: '', // O el valor por defecto que desees
      ciudad: new Ciudad(),
      sectorEmpresarial: new sectorempresarial(),
      ruc: '',
      nombre: '',
      tipoEmpresa: '',
      razonSocial: '',
      area: '',
      ubicacion: '',
      sitioWeb: '',
      // O el valor por defecto que desees
    };

    this.serviceempresario.getEmpresario().subscribe(
      empresario => {
        this.empresariouser = empresario?.usuario;
        console.log('Empresario objeto ultra maximo:', empresario?.usuario);
      },
      error => console.error('Error al obtener el empresario:', error)
    );
  this.getCiudadIDName();
  this.getSectoresEmpresariales();
  }

  souts(){
    console.log('CYTUUUUUUUUUUUUUU', this.empresanueva.ciudad);
    console.log('MARTAAAAAAAAA', this.empresanueva.sectorEmpresarial.nombre);

  }

  crearEmpresa() {
    if (this.empresanueva) { // Add null check for this.ciudadSeleccionada
      this.empresanueva.empresario = this.empresariouser;
      console.log('Empresario:', this.empresanueva.empresario);
      console.log('Empresario1111:', this.empresanueva);

      this.empresaService.createEmpresa(this.empresanueva).subscribe(
        empresa => {

          console.log('Empresa creada exitosamente:', empresa);
          this.empresanueva = this.createEmpresaVacia(); // Limpiar el formulario
        },
        error => console.error('Error al crear empresa:', error),
      );
      this.souts();
    }
 }


  editarEmpresa() {
    const id = this.empresaeditar?.id; // Add null check before accessing the property
    if (id !== undefined) {
      if (this.empresaeditar) { // Add null check before calling the method
        this.empresaService.updateEmpresa(id, this.empresaeditar).subscribe(
          empresaActualizada => {
            console.log('Empresa actualizada exitosamente:', empresaActualizada);
            this.empresaeditar = this.createEmpresaVacia(); // Limpiar el formulario
          },
          error => console.error('Error al actualizar empresa:', error)
        );
      }
    }
  }

  getCiudadIDName() {
    this.ciudadService.getCiudades().subscribe(
      ciudades => this.ciudades = ciudades,
      error => console.error(error)
    );
  }


  getSectoresEmpresariales() {
    this.sectorempresarialService.getSectoresEmpresariales().subscribe(
      sectores => this.sectoresEmpresariales = sectores,
      error => console.error(error)
    );
  }

  buscarCiudad(id: number) {
    this.ciudadService.getCiudadById(id).subscribe(
      ciudad => {
        if(ciudad){
          console.log('Ciudad:', ciudad);
          //this.ciudadSeleccionada = ciudad;
          this.empresanueva.ciudad = ciudad;
          console.log('Ciudad seleccionada:', this.empresanueva.ciudad);
        }else{
          console.log('No se puede obtener la ciudad');
        }
          
      },
      error => console.error(error)

      
    );
  }
  
  buscarSector(id: number) {
    this.sectorempresarialService.getSectorEmpresarialById(id).subscribe(
      sector => {
        if(sector){
          console.log('Sector:', sector);
          //this.sectorSeleccionado = sector;
          this.empresanueva.sectorEmpresarial = sector;
          console.log('Sector seleccionado:', this.empresanueva.sectorempresarial);
        }else{
          console.log('No se puede obtener el sector');
        }
      },
      
      error => console.error(error)
      
      
    );
  }

  buscarEmpresass(){
    this.empresaService.getEmpresas().subscribe(
      empresas => {
        this.empresass = empresas;
        console.log('Empresas obtenidas exitosamente:', empresas);
      },
      error => console.error('Error al obtener empresas:', error)
    );
  }

  private createEmpresaVacia(): Empresa {
    return {
      id: 0,
      empresario: '', // Deberías instanciar las otras clases también aquí si es necesario
      ciudad: new Ciudad(),
      sectorempresarial: new sectorempresarial(),
      ruc: '',
      nombre: '',
      tipoEmpresa: '',
      razonSocial: '',
      area: '',
      ubicacion: '',
      sitioweb: ''
    };
  }

}

