import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../data/service/AuthService';
import { UserService } from '../../../data/service/UserService';
import { Usuario } from '../../../data/model/usuario';
import { UserDTO } from '../../../data/model/UserDTO';
import { Persona } from '../../../data/model/persona';
import { PersonaService } from '../../../data/service/PersonService';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetService } from '../../../data/service/Asset.service';
import Swal from 'sweetalert2';
import { Rol } from '../../../data/model/rol';
import { RolService } from '../../../data/service/rol.service';
import { Graduado } from '../../../data/model/graduado';
import { GraduadoService } from '../../../data/service/graduado.service';
import { Ciudad } from '../../../data/model/ciudad';

@Component({
  selector: 'app-usuarios-lists',
  templateUrl: './usuarios-lists.component.html',
  styleUrls: ['./usuarios-lists.component.css', '../../../../assets/prefabs/headers.css']
})
export class UsuariosListsComponent implements OnInit {

  registerNewUserForm: FormGroup;


  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
    this.registerNewUserForm.get('nombreDelRol')?.disable();
  }


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private personService: PersonaService,
    private rolService: RolService,
    private graduateService: GraduadoService,
    private authService: AuthService,
    private assetService: AssetService,
    private sanitizer: DomSanitizer,
  ) {
    this.registerNewUserForm = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      nombreDelRol: ['ROL_GRADUADO', Validators.required,],
      fechaGraduacion: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      emailPersonal: ['', Validators.required]
    });
  };

  usersList: UserDTO[] = [];
  roleList: Rol[] = [];
  graduatedList: Graduado[] = [];
  person: Persona = new Persona();
  usuarioDTO: UserDTO = new UserDTO();
  role: Rol = new Rol();
  graduate: Graduado = new Graduado;

  editarClicked = false;
  public previsualizacion?: string;
  public archivos: any = []
  public loading?: boolean
  'mensaje': string;

  //Imágenes
  public rutaimagen: string = '';
  public urlImage: string = '';
  public username: string = '';
  public inforest: any = [];
  public getRuta: string = '';
  public mensajevalidado: string = '';

  onEditarClick(): void {
    this.editarClicked = true;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  getAllUsers(): void {
    this.userService.getUsersDTO().subscribe(users => {
      this.usersList = users;
    });
  }

  getAllRoles(): void {
    this.rolService.getRoles().subscribe(roles => {
      this.roleList = roles;
    });
  }

  getPersonById(id: number): void {
    this.personService.getPersonById(id).subscribe(per => {
      this.person = per;
    });
  }

  toggleSwitch(usuarioDTO: UserDTO): void {
    usuarioDTO.estado = !usuarioDTO.estado;
    this.updateStateUser(usuarioDTO.id, usuarioDTO);
  }

  register() {
    if (this.registerNewUserForm.valid) {

      const formData = this.registerNewUserForm.value;
      console.log(formData);

      this.person = {

        cedula: formData.cedula,
        primer_nombre: formData.primerNombre,
        segundo_nombre: formData.segundoNombre,
        fechaNacimiento: formData.fechaNacimiento,
        telefono: formData.telefono,
        apellido_paterno: formData.primerApellido,
        apellido_materno: formData.segundoApellido

      };

      // Crear la persona usando PersonaService
      this.personService.createPerson(this.person).subscribe(
        (personaResponse) => {

          this.mensajevalidado = 'Persona registrada exitosamente';
          if (this.mensajevalidado == 'Persona registrada exitosamente') {
            this.assetService.post(`http://localhost:8080/assets/upload`, formularioDeDatos)
              .subscribe(res => {
                this.loading = false;
                console.log('Respuesta del servidor', res);
                this.inforest = res;
                console.log(this.inforest);
                this.rutaimagen = this.inforest.key
                this.urlImage = this.inforest.url
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
                  this.username = usuarioDTO.nombreUsuario;
                  localStorage.setItem('name', this.username);

                });

                this.graduate = {
                  usuario: new Usuario,
                  ciudad: new Ciudad(),
                  fecha_graduacion: formData.fechaGraduacion,
                  emailPersonal: formData.emailPersonal,
                  estadocivil: formData.estadoCivil,
                  ruta_pdf: '',
                  url_pdf: ''

                }
                this.graduateService.createGraduado(this.graduate).subscribe(response => {

                  console.log(this.graduate);


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
      Object.keys(this.registerNewUserForm.controls).forEach(key => {
        const control = this.registerNewUserForm.get(key);
        if (control != null && control.invalid) {
          console.warn(`Campo '${key}' tiene errores:`, control.errors);
        }
      });
    }
  }

  updateStateUser(id: any, usuarioDTO: UserDTO): void {
    this.userService.updateUser(id, usuarioDTO).subscribe(updatedUser => {
      const index = this.usersList.findIndex(u => u.id === updatedUser.id);
      this.getAllUsers();
      if (index !== -1) {
        this.usersList[index] = updatedUser;
      }
    });
  }

  capturarFile(event: any): any {

    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);
    })
    this.archivos.push(archivoCapturado)
    console.log(event.target.files);
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

}
