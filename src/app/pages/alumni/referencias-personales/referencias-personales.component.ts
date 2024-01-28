import { Component } from '@angular/core';
import { Referencias_personales } from '../../../data/model/referencia_personal';
import { Graduado } from '../../../data/model/graduado';
import { ReferenciaPersonalService } from '../../../data/service/referenciapersonal.service';
import { UserService } from '../../../data/service/UserService';
import { Usuario } from '../../../data/model/usuario';

@Component({
  selector: 'app-referencias-personales',
  templateUrl: './referencias-personales.component.html',
  styleUrls: ['./referencias-personales.component.css', '../../../../assets/prefabs/headers.css']
})
export class ReferenciasPersonalesComponent {
  name: string | null = localStorage.getItem('name');
  usuarios: Usuario | any = [];

  graduado: Graduado | any = [];

  referencia_personal: Referencias_personales[] = [];
  nuevoReferenciaPersonal: Referencias_personales = { nombre: '', graduado: this.graduado, telefono: '', email: '' };
  nuevoReferenciaPersonalCarga: Referencias_personales = { id: 0, nombre: '', graduado: this.graduado, telefono: '', email: '' };
  nuevoReferenciaPersonalEdit: Referencias_personales = { id: 0, nombre: '', graduado: this.graduado, telefono: '', email: '' };

  editarClicked = false;

  constructor(private referenciaPService: ReferenciaPersonalService, private usuarioService: UserService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.loadReferenciasPer();
  }

  loadReferenciasPer() {
    this.referenciaPService.getReferenciasPersonales().subscribe(
      referenciasP => this.referencia_personal = referenciasP,
      error => console.error(error)
    );
  }

  createReferenciaPer() {
    this.editarClicked = false;
    this.referenciaPService.createReferenciasPersonales(this.nuevoReferenciaPersonal).subscribe(
      referenciasP => {
        console.log('Refencia personal creada exitosamente:', referenciasP);
        this.loadReferenciasPer();
      },
      error => console.error('Error al crear la refencia personal:', error)
    );
  }

  onEditarClick(referenciasP: Referencias_personales): void {
    this.editarClicked = true;
    this.nuevoReferenciaPersonal = { ...referenciasP };
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onUpdateClick() {
    const id = this.nuevoReferenciaPersonalCarga.id;
    if (id !== undefined) {
      this.referenciaPService.updateReferenciasPersonales(id, this.nuevoReferenciaPersonalCarga).subscribe(
        refeActualizado => {
          console.log('Sector actualizado exitosamente:', refeActualizado);

          this.loadReferenciasPer();
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
        this.nuevoReferenciaPersonal.graduado = this.usuarios;
        console.log('Usuario obtenido exitosamente:', this.nuevoReferenciaPersonal.graduado);
      },
      error => console.error('Error al obtener usuario:', error)
    );
  }
}
