import { Component } from '@angular/core';
import { Capacitacion } from '../../../data/model/capacitacion';
import { Graduado } from '../../../data/model/graduado';
import { UserService } from '../../../data/service/UserService';
import { CapacitacionService } from '../../../data/service/capacitacion.service';
import { Usuario } from '../../../data/model/usuario';

@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.css', '../../../../assets/prefabs/headers.css']
})
export class CapacitacionesComponent {
  name: string | null = localStorage.getItem('name');
  usuarios: Usuario | any = [];
  
  graduado: Graduado | any = [];

  capacitacion: Capacitacion[] = [];
  nuevoCapacitacion: Capacitacion = { horas: 0, tipo_certificado: '', fecha_inicio: new Date(), fecha_fin: new Date(), institucion: '', nombre: '', graduado: this.graduado };
  nuevoCapacitacionCarga: Capacitacion = { id:0, horas: 0, tipo_certificado: '', fecha_inicio: new Date(), fecha_fin: new Date(), institucion: '', nombre: '', graduado: this.graduado };
  nuevoCapacitacionEdit: Capacitacion = { id: 0, horas: 0, tipo_certificado: '', fecha_inicio: new Date(), fecha_fin: new Date(), institucion: '', nombre: '', graduado: this.graduado };

  editarClicked = false;

  constructor(private capacitacionService: CapacitacionService, private usuarioService: UserService) { }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.loadCapacitacion();
  }

  loadCapacitacion() {
    this.capacitacionService.getCapacitaciones().subscribe(
      capacitaciones => this.capacitacion = capacitaciones,
      error => console.error(error)
    );
  }

  createCapacitacion() {
    this.editarClicked = false;
    this.capacitacionService.createCapacitacion(this.nuevoCapacitacion).subscribe(
      capacitaciones => {
        console.log('Capacitación creada exitosamente:', capacitaciones);
        this.loadCapacitacion();
      },
      error => console.error('Error al crear la capacitación:', error)
    );
  }

  onEditarClick(capaciones: Capacitacion): void {
    this.editarClicked = true;
    this.nuevoCapacitacion = { ...capaciones };
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  onUpdateClick() {
    const id = this.nuevoCapacitacionCarga.id;
    if (id !== undefined) {
      this.capacitacionService.updateCapacitacion(id, this.nuevoCapacitacionCarga).subscribe(
        refeActualizado => {
          console.log('Capacitación actualizado exitosamente:', refeActualizado);

          this.loadCapacitacion();
        },
        error => console.error('Error al actualizar el titulo:', error)
      );
    } else {
      console.error('Error: El ID de la capacitación es undefined.');
    }
  }

  onDeleteClick(id: number) {

  }

  obtenerUsuario() {
    this.usuarioService.getUsuarioByUsername(this.name ?? '').subscribe(
      usuario => {
        this.usuarios = usuario;
        console.log('Usuario obtenido exitosamente:', this.usuarios);
        this.nuevoCapacitacion.graduado = this.usuarios;
        console.log('Usuario obtenido exitosamente:', this.nuevoCapacitacion.graduado);
      },
      error => console.error('Error al obtener usuario:', error)
    );
  }
}
