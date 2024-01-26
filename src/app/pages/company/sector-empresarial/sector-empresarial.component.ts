import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../data/model/empresa';
import { Empresario } from '../../../data/model/empresario';
import { Ciudad } from '../../../data/model/ciudad';
import { sectorempresarial } from '../../../data/model/sectorEmpresarial';
import { EmpresaService } from '../../../data/service/empresa.service';
import { CiudadService } from '../../../data/service/ciudad.service';
import { SectorEmpresarialService } from '../../../data/service/sectorempresarial.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent implements OnInit {

  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }
  
  onRegistrarClick(): void {
    this.editarClicked = false;
  }
    
  empresascreated: Empresa[] = [];
  empresanueva: any = {};
  empresaeditar: Empresa | undefined;
  ciudades: Ciudad[] = [];
  sectoresEmpresariales: sectorempresarial[] = [];

  ciudadessearch: Ciudad| undefined;
  sectoresEmpresarialessearch: sectorempresarial | undefined;

  ID_Ciudad: number = 0;
  ID_Sector: number = 0;

  constructor(private empresaService: EmpresaService, private ciudadService: CiudadService, private sectorempresarialService: SectorEmpresarialService) { }

  ngOnInit(): void {
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
      this.empresanueva.ciudad = this.ciudadessearch || new Ciudad(); // Manejar el caso de que ciudadessearch sea undefined
      this.empresanueva.sectorempresarial = this.sectoresEmpresarialessearch || new sectorempresarial(); // Manejar el caso de que sectoresEmpresarialessearch sea undefined
      console.log(this.ID_Ciudad);
      console.log(this.ID_Sector);
      console.log(this.ciudadessearch);
      console.log(this.sectoresEmpresarialessearch);
      console.log(this.empresanueva);
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

  getCiudadIDName(){
    this.ciudadService.getCiudades().subscribe(
      ciudades => this.ciudades = ciudades,
      error => console.error(error)
    );
  }
  
  
  getSectoresEmpresariales(){
    this.sectorempresarialService.getSectoresEmpresariales().subscribe(
      sectores => this.sectoresEmpresariales = sectores,
      error => console.error(error)
    );
  }

  buscarCiudad(id: number) {
    this.ciudadService.getCiudadById(id).subscribe(
      ciudad => this.ciudadessearch = ciudad,
      error => console.error(error)
    );
  }

  buscarSector(id: number) {
    this.sectorempresarialService.getSectorEmpresarialById(id).subscribe(
      sector => this.sectoresEmpresarialessearch = sector,
      error => console.error(error)
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
