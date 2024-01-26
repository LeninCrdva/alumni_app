import { Component } from '@angular/core';
import { Empresa } from '../../../data/model/empresa';
import { Ciudad } from '../../../data/model/ciudad';
import { sectorempresarial } from '../../../data/model/sectorEmpresarial';
import { EmpresaService } from '../../../data/service/empresa.service';
import { CiudadService } from '../../../data/service/ciudad.service';
import { SectorEmpresarialService } from '../../../data/service/sectorempresarial.service';
import { Empresario } from '../../../data/model/empresario';

@Component({
  selector: 'app-referencias-empresariales',
  templateUrl: './referencias-empresariales.component.html',
  styleUrls: ['./referencias-empresariales.component.css', '../../../../assets/temporal/style.css']
})
export class ReferenciasEmpresarialesComponent {
  
  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }
  
  onRegistrarClick(): void {
    this.editarClicked = false;
  }
    
  empresascreated: Empresa[] = [];
  empresanueva: Empresa | null = null;
  empresaeditar: Empresa | undefined;
  ciudades: Ciudad[] = [];
  sectoresEmpresariales: sectorempresarial[] = [];

  constructor(private empresaService: EmpresaService, private ciudadService: CiudadService, private sectorempresarialService: SectorEmpresarialService) { }

  ngOnInit(): void {
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
