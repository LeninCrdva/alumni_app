import { Component } from '@angular/core';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';
import { Empresa } from '../../../data/model/empresa';
import { EmpresaService } from '../../../data/service/empresa.service';
import { error } from 'jquery';

@Component({
  selector: 'app-postulaciones-add-form',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css', '../../../../assets/prefabs/headers.css']
})
export class OfertasLaboralesComponent {

  editarClicked = false;

  onEditarClick(): void {
    this.editarClicked = true;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  ofertaslaborales: any = {};
  empresas: Empresa[] = [];

  constructor(private ofertalaburoService: OfertalaboralService, private empresaService:EmpresaService) { }

  ngOnInit(): void {
    this.getAllEmpresas();
    

    this.ofertaslaborales = {
      id: 0,
      salario: 0,
      fechaCierre: '',
      fechaPublicacion: '',
      cargo: '',
      experiencia: '',
      fechaApertura: '',
      areaConocimiento: '',
      estado: 'false',
      nombreEmpresa: '',
      correoGraduado: [],

    };
    this.getFechaPublicacion();


  }

  getFechaPublicacion(){
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Agrega un cero si el mes es de un solo dígito
    const day = currentDate.getDate().toString().padStart(2, '0'); // Agrega un cero si el día es de un solo dígito
    const year = currentDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    this.ofertaslaborales.fechaPublicacion = formattedDate;
    console.log(formattedDate);
  }

  getAllEmpresas() {
    this.empresaService.getEmpresas().subscribe( 
      empresass => this.empresas = empresass,
      error => console.error(error)
    )
  }


}
