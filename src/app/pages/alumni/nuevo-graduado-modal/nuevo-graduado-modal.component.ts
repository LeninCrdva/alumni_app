import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GraduadoService } from '../../../data/service/graduado.service';
import { Graduado3 } from '../../../data/model/graduado';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Ciudad} from '../../../data/model/ciudad';
import { CiudadService } from '../../../data/service/ciudad.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevo-graduado-modal',
  templateUrl: './nuevo-graduado-modal.component.html',
  styleUrl: './nuevo-graduado-modal.component.css'
})
export class NuevoGraduadoModalComponent implements OnInit {

  nuevoGraduadoForm: FormGroup = new FormGroup({});
 
  usuarioGuardado: string = localStorage.getItem('name') || '';
  ciudades: Ciudad[] = [];
  nuevoGraduado: Graduado3 = new Graduado3();
  archivoSeleccionado: File | null = null;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private graduadoService: GraduadoService,
    private modalService: BsModalService,
    private ciudadService: CiudadService,
    
  ) { 

  }

  ngOnInit() {
    this.nuevoGraduado.usuario = this.usuarioGuardado;
    this.buildForm();
    this.nuevoGraduadoForm.get('usuario')?.setValue(this.usuarioGuardado);
    this.cargarCiudades();
  }
   buildForm() {
    this.nuevoGraduadoForm = this.fb.group({
      usuario: ['', Validators.required],
      emailPersonal: ['', Validators.required],
      ciudad: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      ruta_pdf: ['', Validators.required],
    });
  }

  cargarCiudades() {
    this.ciudadService.getCiudades().subscribe(
      (ciudades) => {
        this.ciudades = ciudades;
      },
      (error) => {
        console.error('Error al cargar las ciudades:', error);
      }
    );
  }

  guardarGraduado() {
    if (this.nuevoGraduadoForm.valid) {
      console.log('Datos a guardar:', this.nuevoGraduadoForm.value);
      // Realizar la operación de guardado solo si el formulario es válido
     /* this.graduadoService.createGraduado2(this.nuevoGraduadoForm.value).subscribe(
        (result) => {
          console.log('Graduado creado con éxito:', result);
          this.bsModalRef.hide();
        },
        (error) => {
          console.error('Error al crear graduado:', error);
        }
      );*/
    } else {
      console.error('Formulario no válido. Verifica que todos los campos estén llenos.');
    }
  }

  onArchivoSeleccionado(event: any) {
    const archivos: FileList = event.target.files;
    if (archivos.length > 0) {
      const archivo = archivos[0];
      if (archivo.name.toLowerCase().endsWith('.pdf')) {
        this.archivoSeleccionado = archivo;
        this.nuevoGraduadoForm.get('ruta_pdf')?.setValue(archivo.name);
      } else {
        console.error('Por favor, seleccione un archivo PDF.');
        this.archivoSeleccionado = null;
        this.nuevoGraduadoForm.get('ruta_pdf')?.setValue(null);
        event.target.value = '';
      }
    }
  }

  cerrarModal() {
    if (this.nuevoGraduadoForm.valid) {
      this.bsModalRef.hide();
    } else {
      console.error('No se puede cerrar el modal. Verifica que todos los campos estén llenos.');
    }
  }


}