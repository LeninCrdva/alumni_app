import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../../data/service/PersonService';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../../data/service/AuthService';
import { AssetService } from '../../../data/service/Asset.service';
import { Persona } from '../../../data/model/persona';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AnimationOptions } from 'ngx-lottie';
import { RegisterDTO } from '../../../data/model/DTO/RegisterDTO';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { firstValueFrom, lastValueFrom, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  options_Register: AnimationOptions = {
    path: '../../../assets/anims/register_anim.json',
  };
  isSubmit = false;
  registerForm: FormGroup;
  'mensaje': string;
  'modalRef': BsModalRef;
  //imagenes//
  public archivos: any = []
  public loading?: boolean
  public username: string = '';
  public inforest: any = [];
  public getRuta: string = '';
  //public deleteimage: any = localStorage.getItem('rutaimagen');
  public mensajevalidado: string = '';
  urlPhoto: any;
  'registerDto': RegisterDTO;

  constructor(
    private fb: FormBuilder,
    private assetService: AssetService,
    private authService: AuthService,
    private personaService: PersonaService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.registerForm = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      cedula: ['', Validators.required],
      sexo: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      nombreDelRol: [localStorage.getItem('userRole'), Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('Rol recibido en RegisterComponent:', localStorage.getItem('userRole'));
  }

  onSexoChange(event: any, value: string) {
    if (event.target.checked) {
      this.registerForm.patchValue({
        sexo: value
      });
    } else {
      this.registerForm.patchValue({
        sexo: ''
      });
    }
  }
  closeModal(): void {
    this.modalRef.hide();
  }

  //-----------------------Imagen--------------------------------------------------//
  rutaImagen: any;
  selectedFile: File | null = null;
  previsualizacion: boolean = false;
  imagenPrevisualizada: string | ArrayBuffer | null = '';

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.previsualizacion = true;
      const reader = new FileReader();
      reader.onload = () => {
        this.urlPhoto = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    } else {
      this.previsualizacion = false;
      this.urlPhoto = '';
      this.selectedFile = null;
    }
  }

  clearImage(): void {
    this.previsualizacion = false;
    this.urlPhoto = '';
    const fileInput = document.getElementById("file") as HTMLInputElement;
    fileInput.value = '';
  }

  //----------------------------------------------------------------//
  deleteFile(rutakey: string) {
    this.assetService.delete(rutakey).subscribe(r => {
      console.log("archivo eliminado")
    })
  }

  async uploadAndSetRutaImagen(file: File) {
    try {
      const observable = this.assetService.upload(file);
      const data: HttpEvent<any> | undefined = await lastValueFrom(observable);

      if (data instanceof HttpResponse) {
        const key = data.body?.key;
        this.rutaImagen = key;
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  }


  async register() {
    this.isSubmit = true;
    if (this.registerForm.valid) {

      const formData = this.registerForm.value;

      if (this.selectedFile) {
        console.log('Archivo seleccionado:', this.selectedFile);
        await this.uploadAndSetRutaImagen(this.selectedFile);
      }
      this.registerDto = {

        cedula: formData.cedula,
        primerNombre: formData.primerNombre,
        segundoNombre: formData.segundoNombre,
        fechaNacimiento: formData.fechaNacimiento,
        telefono: formData.telefono,
        apellidoPaterno: formData.primerApellido,
        apellidoMaterno: formData.segundoApellido,
        sexo: formData.sexo,
        nombreUsuario: formData.nombreUsuario,
        clave: formData.clave,
        rol: formData.nombreDelRol,
        estado: formData.nombreDelRol === 'GRADUADO' ? true : false,
        rutaImagen: this.rutaImagen,
        urlImagen: '',

      };

      console.log('Datos del formulario:', this.registerDto);
      this.authService.signup(this.registerDto).subscribe(response => {

        console.log('Usuario registrado:', response);

        this.username = this.registerDto.nombreUsuario;
        localStorage.setItem('name', this.username);
        
        this.showAlert(this.registerDto);
        
        this.router.navigate(['account/login']);
      });
    } else {
      console.warn('El formulario no es válido.');
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control != null && control.invalid) {
          console.warn(`Campo '${key}' tiene errores:`, control.errors);
        }
      });
    }
  }

  showAlert(resp: RegisterDTO) {
    if (resp.rol.includes('EMPRESARIO') || resp.rol.includes('ADMINISTRADOR')) {
      Swal.fire({
        icon: 'info',
        text: 'Su cuenta se ha registrado correctamente, pero necesita ser aprobada por un administrador para poder iniciar sesión.'
      });
    } else {
      Swal.fire({
        icon: 'success',
        text: 'Datos cargados'
      });
    }
  }
}