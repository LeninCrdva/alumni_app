import { Component } from '@angular/core';
import { OfertalaboralService } from '../../../data/service/ofertalaboral.service';
import { Empresa } from '../../../data/model/empresa';
import { EmpresaService } from '../../../data/service/empresa.service';
import { error } from 'jquery';
import { ofertaLaboralDTO } from '../../../Models/ofertaLaboralDTO';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-postulaciones-add-form',
  templateUrl: './ofertas-laborales.component.html',
  styleUrls: ['./ofertas-laborales.component.css', '../../../../assets/prefabs/headers.css']
})
export class OfertasLaboralesComponent {

  editarClicked = false;
  idEdit: number = 0;
  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onEditarClick(id: number | undefined = 0): void {
    this.editarClicked = true;
    //this.ofertaslaboralesCarga = { ...ofertalaboral};
    this.getOfertaLaboralById(id);
    this.idEdit = id;

  }

  ofertaslaborales: any = {};
  ofertaslaboralesCarga: any = {};
  ofertaslaboraleslist:ofertaLaboralDTO[] = [];
  empresas: Empresa[] = [];
  fechaPublicacion: String = '';

  constructor(private ofertalaburoService: OfertalaboralService, private empresaService:EmpresaService) { }

  ngOnInit(): void {
    this.getAllEmpresas();
    this.getAllOfertasLaborales();

    this.ofertaslaborales = {
      id: 0,
      salario: 0,
      fechaCierre: '',
      fechaPublicacion: '',
      cargo: '',
      experiencia: '',
      fechaApertura: '',
      areaConocimiento: '',
      estado: '',
      nombreEmpresa: '',
      correoGraduado: [],

    };

    this.ofertaslaboralesCarga = {
      id: 0,
      salario: 0,
      fechaCierre: '',
      fechaPublicacion: '',
      cargo: '',
      experiencia: '',
      fechaApertura: '',
      areaConocimiento: '',
      estado: '',
      nombreEmpresa: '',
      correoGraduado: [],

    };
    this.getFechaPublicacion();
    this.ofertaslaborales.estado = false;


  }

 getFechaPublicacion(){
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Agrega un cero si el mes es de un solo dígito
    const day = currentDate.getDate().toString().padStart(2, '0'); // Agrega un cero si el día es de un solo dígito
    const year = currentDate.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    this.fechaPublicacion = formattedDate;
    if(this.editarClicked == true){
      this.ofertaslaborales.fechaPublicacion = new Date(formattedDate);

    }else{
      this.ofertaslaboralesCarga.fechaPublicacion = new Date(formattedDate);
    }
    console.log(formattedDate);
  }
  /*
  getFechaPublicacion1() {
    const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'mm/dd/yyyy');
    this.ofertaslaborales.fechaPublicacion = formattedDate || ''; // Asegúrate de manejar el caso en el que formattedDate sea nulo
    console.log(formattedDate);
  }*/
 

  getAllEmpresas() {
    this.empresaService.getEmpresas().subscribe( 
      empresass => this.empresas = empresass,
      error => console.error(error)
    )
  }
  getAllOfertasLaborales() {
    this.ofertalaburoService.getOfertasLaborales().subscribe(
      ofertas => this.ofertaslaboraleslist = ofertas,
      error => console.error(error)
    )
  }

  deleteOfertaLaboral(id: number | undefined = 0) {
    this.ofertalaburoService.deleteOfertabyID(id).subscribe();   
    console.log('Eliminado', id);
  }
  createOfertaLaboral() { 
    this.ofertalaburoService.createOfertaLaboral(this.ofertaslaborales).subscribe(
      (response) => {
        console.log(response);
        this.ofertaslaborales = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateOfertaLaboral() {
    console.log('Almeja', this.idEdit, this.ofertaslaboralesCarga);

    this.ofertalaburoService.updateOfertaLaboral(this.idEdit ,this.ofertaslaboralesCarga).subscribe(
      (response) => {
        console.log(response);
        this.ofertaslaborales = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getOfertaLaboralById(id: number) {
    this.ofertalaburoService.getOfertaLaboralByIdToDTO(id).subscribe(
      ofertas => this.ofertaslaboralesCarga = ofertas,
      error => console.error(error)
    )
  }

}
