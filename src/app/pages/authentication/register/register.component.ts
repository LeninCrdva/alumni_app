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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  'mensaje': string;
  'modalRef': BsModalRef;
  //imagenes//
  public previsualizacion?: string;
  public archivos: any = []
  public loading?: boolean
  public rutaimagen: string = '';
  public urlImage: string = '';
  public username: string = '';
  public inforest: any = [];
  public getRuta: string = '';
  public deleteimage: any = localStorage.getItem('rutaimagen');
  public mensajevalidado: string = '';

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
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      nombreDelRol: [localStorage.getItem('userRole'), Validators.required],
    });
  }
  'persona': Persona;
  ngOnInit(): void {


    console.log('Rol recibido en RegisterComponent:', localStorage.getItem('userRole'));

  }
  closeModal(): void {
    this.modalRef.hide();
  }
  //-----------------------Imagen--------------------------------------------------//

  capturarFile(event: any): any {

    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);

    })
    this.archivos.push(archivoCapturado)
    // 
    // console.log(event.target.files);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();

      reader.readAsDataURL($event);

      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };

      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      console.error('Error al extraer base64:', e);
      resolve({
        base: null
      });
    }
  });


  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }






  //----------------------------------------------------------------//

  deleteFile(rutakey: string) {
    this.assetService.delete(rutakey).subscribe(r => {
      console.log("archivo eliminado")
    })
  }



  register() {
    if (this.registerForm.valid) {

      const formData = this.registerForm.value;
      console.log(formData);

      this.persona = {

        cedula: formData.cedula,
        primer_nombre: formData.primerNombre,
        segundo_nombre: formData.segundoNombre,
        fechaNacimiento: formData.fechaNacimiento,
        telefono: formData.telefono,
        apellido_paterno: formData.primerApellido,
        apellido_materno: formData.segundoApellido

      };
      // Crear la persona usando PersonaService
      this.personaService.createPerson(this.persona).subscribe(
        (personaResponse) => {

          this.mensajevalidado = 'Persona registrada exitosamente';
          console.log(this.mensajevalidado);
          if (this.mensajevalidado == 'Persona registrada exitosamente') {
            //Foto
            this.assetService.post(`http://localhost:8080/assets/upload`, formularioDeDatos)
              .subscribe(res => {
                this.loading = false;
                console.log('Respuesta del servidor', res);
                this.inforest = res;
                console.log(this.inforest);
                this.rutaimagen = this.inforest.key
                this.urlImage = this.inforest.url
                //Registro Usuario
                const usuarioDTO = {
                  nombreUsuario: formData.nombreUsuario,
                  clave: formData.clave,
                  cedula: formData.cedula,
                  rol: formData.nombreDelRol,
                  estado: false,
                  ruta_imagen: this.rutaimagen,
                  url_imagen: this.urlImage

                };

                this.authService.signup(usuarioDTO).subscribe(response => {

                  console.log('Usuario registrado:', response);
                  this.username=usuarioDTO.nombreUsuario;
                  localStorage.setItem('name', this.username);
                  this.router.navigate(['account/login']);


                });
                Swal.fire({
                  icon: 'success',
                  text: 'Datos cargados'
                });



              }, () => {
                this.loading = false;
                alert('Error');
              })

          }
        },
        (error) => {
          this.mensajevalidado = 'Error: no puede haber campos vacios';
          console.error(this.mensajevalidado, error);


        });
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo: string | Blob) => {
        formularioDeDatos.append('multipartFile', archivo)
      })




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


}