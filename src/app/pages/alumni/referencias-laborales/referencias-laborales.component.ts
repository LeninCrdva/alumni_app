import { Component } from "@angular/core";
import { Usuario } from "../../../data/model/usuario";
import { Graduado } from "../../../data/model/graduado";
import { Referencias_profesionales } from "../../../data/model/referencia_profesional";
import { ReferenciaProfesionalService } from "../../../data/service/referenciaprofesional.service";
import { UserService } from "../../../data/service/UserService";

@Component({
  selector: 'app-referencias-laborales',
  templateUrl: './referencias-laborales.component.html',
  styleUrls: ['./referencias-laborales.component.css', '../../../../assets/prefabs/headers.css']
})
export class ReferenciasLaboralesComponent {
  name: string | null = localStorage.getItem('name');
  usuarios: Usuario | any = [];

  graduado: Graduado | any = [];

  referencia_profesional: Referencias_profesionales[] = [];
  nuevoReferenciaProfesional: Referencias_profesionales = { nombre: '', graduado: this.graduado, institucion: '', email: '' };
  nuevoReferenciaProfesionalCarga: Referencias_profesionales = { id: 0, nombre: '', graduado: this.graduado, institucion: '', email: '' };
  nuevoReferenciaProfesionalEdit: Referencias_profesionales = { id: 0, nombre: '', graduado: this.graduado, institucion: '', email: '' };
  editarClicked = false;

  constructor(private referenciaProService: ReferenciaProfesionalService, private usuarioService: UserService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.loadReferenciaPro();
  }

  loadReferenciaPro() {
    this.referenciaProService.getReferenciasProfesionales().subscribe(
      referenciasP => this.referencia_profesional = referenciasP,
      error => console.error(error)
    );
  }

  createReferenciaPro() {
    this.editarClicked = false;
    this.referenciaProService.createReferenciasProfesionales(this.nuevoReferenciaProfesional).subscribe(
      referenciasP => {
        console.log('Refencia profesional creada exitosamente:', referenciasP);
        this.loadReferenciaPro();
      },
      error => console.error('Error al crear la refencia profesional:', error)
    );
  }

  onEditarClick(referenciasP: Referencias_profesionales): void {
    this.editarClicked = true;
    this.nuevoReferenciaProfesional = { ...referenciasP };
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onUpdateClick() {
    const id = this.nuevoReferenciaProfesionalCarga.id;
    if (id !== undefined) {
      this.referenciaProService.updateReferenciasPersonales(id, this.nuevoReferenciaProfesionalCarga).subscribe(
        refeActualizado => {
          console.log('Sector actualizado exitosamente:', refeActualizado);

          this.loadReferenciaPro();
        },
        error => console.error('Error al actualizar el titulo:', error)
      );
    } else {
      console.error('Error: El ID del titulo es undefined.');
    }
  }

  onDeleteClick(id: number) {

  }

  obtenerUsuario() {
    this.usuarioService.getUsuarioByUsername(this.name ?? '').subscribe(
      usuario => {
        this.usuarios = usuario;
        console.log('Usuario obtenido exitosamente:', this.usuarios);
        this.nuevoReferenciaProfesional.graduado = this.usuarios;
        console.log('Usuario obtenido exitosamente:', this.nuevoReferenciaProfesional.graduado);
      },
      error => console.error('Error al obtener usuario:', error)
    );
  }
}