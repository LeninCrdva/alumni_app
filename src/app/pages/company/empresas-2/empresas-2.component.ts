import { Component } from '@angular/core';
import { Empresa } from '../../../data/model/empresa';
import { Ciudad } from '../../../data/model/ciudad';
import { sectorempresarial } from '../../../data/model/sectorEmpresarial';
import { EmpresaService } from '../../../data/service/empresa.service';
import { CiudadService } from '../../../data/service/ciudad.service';
import { SectorEmpresarialService } from '../../../data/service/sectorempresarial.service';
import { Empresario } from '../../../data/model/empresario';
import { Usuario } from '../../../data/model/usuario';

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
  empresarioOb: any = {};
  //Para ciudad y sector empresarial
  ciudadSeleccionada: any = {};
  empresascreated: Empresa[] = [];
  empresanueva: any = {};
  empresaeditar: Empresa | undefined;
  ciudades: Ciudad[] = [];
  sectoresEmpresariales: sectorempresarial[] = [];

  ID_Ciudad: number = 0;
  ID_Sector: number = 0;

  constructor(private empresaService: EmpresaService, private ciudadService: CiudadService, private sectorempresarialService: SectorEmpresarialService) { }

  ngOnInit(): void {
    this.empresarioOb = {
      id: 0,
      usuario: new Usuario,
      estado: false,
      puesto: '',
      anios: 0,
      email: '',
    }
    this.empresanueva = {
      empresario: null, // O el valor por defecto que desees
      ciudad: null,
      sectorempresarial: null,
      ruc: '',
      nombre: '',
      tipoEmpresa: '',
      razonsocial: '',
      area: '',
      ubicacion: '',
      sitioweb: '',
      // O el valor por defecto que desees
    };


    this.cargarEmpresas();
    this.getEmpresarioById(this.idUser);
  }

  cargarEmpresas() {
    this.empresaService.getEmpresas().subscribe(
      empresas => this.empresascreated = empresas,
      error => console.error(error)
    );
  }

  crearEmpresa() {
    if (this.empresanueva) { // Add null check for this.ciudadSeleccionada
      this.buscarCiudad(this.ID_Ciudad);
      this.buscarSector(this.ID_Sector);
      this.empresaService.createEmpresa(this.empresanueva).subscribe(
        empresa => {

          console.log('Empresa creada exitosamente:', empresa);
          this.empresanueva = this.createEmpresaVacia(); // Limpiar el formulario
          this.cargarEmpresas(); // Recargar la lista después de crear
        },
        error => console.error('Error al crear empresa:', error)
      );
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
            this.cargarEmpresas();
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
      ciudad => 
      this.empresanueva.ciudad = ciudad,
      error => console.error(error)
    );
  }

  buscarSector(id: number) {
    this.sectorempresarialService.getSectorEmpresarialById(id).subscribe(
      sector => this.empresanueva.sectorempresarial = sector,
      error => console.error(error)
    );
  }

  getEmpresarioById(id: number) {
    this.empresaService.getEmpresarioByUsuarioId(id).subscribe(
      empresario => {
        this.empresarioOb = empresario;
        this.empresanueva.empresario = this.empresarioOb;
        console.log('Empresario obtenido exitosamente:', empresario);
      },
      error => console.error('Error al obtener empresario:', error)
    );
    
  }

  private createEmpresaVacia(): Empresa {
    return {
      id: 0,
      empresario: new Empresario(), // Deberías instanciar las otras clases también aquí si es necesario
      ciudad: new Ciudad(),
      sectorempresarial: new sectorempresarial(),
      ruc: '',
      nombre: '',
      tipoEmpresa: '',
      razonsocial: '',
      area: '',
      ubicacion: '',
      sitioweb: ''
    };
  }

}

