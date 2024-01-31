import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EmpresarioService } from '../../../data/service/empresario.service';
import { Empresario2 } from '../../../data/model/empresario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-empresario-modal',
  templateUrl: './nuevo-empresario-modal.component.html',
  styleUrl: './nuevo-empresario-modal.component.css'
})
export class NuevoEmpresarioModalComponent implements OnInit {
  nuevoEmpresario: Empresario2 = new Empresario2();
  @Output() onClose: EventEmitter<string> = new EventEmitter();
  usuarioGuardado: string = localStorage.getItem('name') || '';
  formularioEmpresario: FormGroup = new FormGroup({});
  mensajeMostrado = false;

  constructor(
    public bsModalRef: BsModalRef,
    private empresarioService: EmpresarioService, // Ajusta según la ubicación de tu servicio
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.nuevoEmpresario.usuario = this.usuarioGuardado;
  }

  buildForm() {
    this.formularioEmpresario = this.formBuilder.group({
      estado: [true, Validators.required],
      puesto: ['', Validators.required],
      anios: [null, [Validators.required, Validators.min(0)]],
      usuario: [this.usuarioGuardado, Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  guardarEmpresario() {
    if (this.formularioEmpresario.valid) {
      // Realizar la operación de guardado
      this.empresarioService.createEmpresario(this.formularioEmpresario.value).subscribe(
        (result) => {
          console.log('Empresario creado con éxito:', result);
          this.mensajeMostrado = true; // Marcar el mensaje como mostrado
          this.mostrarSweetAlert(true);
        },
        (error) => {
          console.error('Error al crear Empresario:', error);
          this.mostrarSweetAlert(false);
        }
      );
    } else {
      console.error('Formulario no válido. Verifica que todos los campos estén llenos y sean válidos.');
    }
  }

  mostrarSweetAlert(esExitoso: boolean) {
    const titulo = esExitoso ? 'Completado exitosamente' : 'Error al guardar';
    const mensaje = esExitoso ? 'La empresa se ha guardado exitosamente.' : 'Hubo un error al intentar guardar la empresa.';

    Swal.fire({
      icon: esExitoso ? 'success' : 'error',
      title: titulo,
      text: mensaje,
      allowOutsideClick: !esExitoso,
    }).then((result) => {
      if (esExitoso || result.isConfirmed) {
        this.onClose.emit(esExitoso ? 'guardadoExitoso' : 'errorGuardado');
        this.bsModalRef.hide();
      }
    });
  }

  cerrarModal() {
    if (this.mensajeMostrado) {
      this.bsModalRef.hide();
    } else {
      console.log('Espera a que se muestre el mensaje antes de cerrar la modal.');
    }
  }
}