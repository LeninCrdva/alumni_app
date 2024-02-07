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
import { MAIN_ROUTE } from '../../../data/service/MAIN_ROUTE';
import { GraduadoDTO } from '../../../data/model/DTO/GraduadoDTO';
import { CiudadService } from '../../../data/service/ciudad.service';
import { Observable, catchError, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-usuarios-lists',
  templateUrl: './usuarios-lists.component.html',
  styleUrls: ['./usuarios-lists.component.css', '../../../../assets/prefabs/headers.css']
})
export class UsuariosListsComponent implements OnInit {

  registerNewUserForm: FormGroup;
  editMode: boolean = false;


  ngOnInit(): void {
    this.getAllUsersBySelectedRoles();
    this.getAllSelectedRoles();
    this.getAllCities();
    this.getAllPersons();
    this.getAllGraduatesDTO();
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private personService: PersonaService,
    private rolService: RolService,
    private graduateService: GraduadoService,
    private cityService: CiudadService,
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
      nombreDelRol: ['', Validators.required,],
      año_graduacion: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      email_personal: ['', Validators.required],
      ciudadNombre: ['', Validators.required],
    });
  };

  usersList: UserDTO[] = [];
  roleList: Rol[] = [];
  graduatedList: Graduado[] = [];
  graduatedDTOList: GraduadoDTO[] = [];
  person: Persona = new Persona();
  personList: Persona[] = [];
  newPerson: Persona = new Persona();
  usuarioDTO: UserDTO = new UserDTO();
  newDTOUser: UserDTO = new UserDTO();
  role: Rol = new Rol();
  citiesList: Ciudad[] = [];
  city: Ciudad = new Ciudad();
  graduate: GraduadoDTO = new GraduadoDTO;
  newGraduate: GraduadoDTO = new GraduadoDTO;

  editarClicked = false;
  public previsualizacion?: string;
  public archivos: any = []
  public loading?: boolean
  public serialNumberArray: Array<number> = [];

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
    this.editMode = false;
  }

  getAllUsersBySelectedRoles(): void {
    const rolesToShow = ['ROL_GRADUADO'];
    this.userService.getUsersDTO().subscribe(users => {
      this.usersList = users.filter(user => rolesToShow.includes(user.rol));
    });
  }

  getAllPersons(): void {
    this.personService.getPerson().subscribe(persons => {
      this.personList = persons;
    });
  }

  getAllSelectedRoles(): void {
    const rolesToDisplay = ['ROL_GRADUADO', 'ROL_EMPRESARIO'];
    this.rolService.getRoles().subscribe(roles => {
      this.roleList = roles.filter(role => rolesToDisplay.includes(role.nombre));
    });
  }

  getAllCities(): void {
    this.cityService.getCiudades().subscribe(cities => {
      this.citiesList = cities;
    });
  }

  getAllGraduatesDTO(): void {
    this.graduateService.getGraduadosDTO().subscribe(gradu => {
      this.graduatedDTOList = gradu;
      console.log(gradu);
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
    this.editMode = false;
    if (this.registerNewUserForm.valid) {
      const formData = this.registerNewUserForm.value;
      this.person = {
        cedula: formData.cedula,
        primer_nombre: formData.primerNombre,
        segundo_nombre: formData.segundoNombre,
        fechaNacimiento: formData.fechaNacimiento,
        telefono: formData.telefono,
        apellido_paterno: formData.primerApellido,
        apellido_materno: formData.segundoApellido
      };

      this.personService.createPerson(this.person).subscribe(
        (personaResponse) => {
          const EndPoint = MAIN_ROUTE.API_ENDPOINT;

          this.mensajevalidado = 'Persona registrada exitosamente';
          if (this.mensajevalidado == 'Persona registrada exitosamente') {
            this.assetService.post(EndPoint + `/assets/upload`, formularioDeDatos)
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

                  this.graduate = {
                    usuario: formData.nombreUsuario,
                    ciudad: formData.ciudadNombre,
                    año_graduacion: formData.año_graduacion,
                    email_personal: formData.email_personal,
                    estadocivil: formData.estadoCivil,
                    ruta_pdf: '',
                    url_pdf: '',
                    idOferta: [],
                  }

                  console.log("Graduado datos: " + this.graduate.email_personal);

                  this.graduateService.createGraduadoDTO(this.graduate).subscribe(response => {

                    console.log(this.graduate);

                    Swal.fire({
                      icon: 'success',
                      text: 'Datos cargados'
                    });
                  });
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
      this.getAllUsersBySelectedRoles();
      if (index !== -1) {
        this.usersList[index] = updatedUser;
      }
    });
  }

  catchUserDTOInContext(userDto: UserDTO): void {
    try {
      this.editMode = true;
      if (userDto) {
        const contextDTO: UserDTO = { ...userDto };

        this.getPersonByIndentification(contextDTO.cedula).pipe(
          switchMap(person => {
            return forkJoin([
              of(person),
              this.getGraduateDTOByUserId(userDto.id)
            ]);
          }),
          map(([person, graduate]: [Persona, GraduadoDTO]) => {
            console.log(graduate);
            if (!graduate || !person) {
              console.error('Graduado o persona no válidos.');
              return null;
            }

            this.registerNewUserForm.patchValue({
              nombreUsuario: contextDTO.nombreUsuario,
              cedula: contextDTO.cedula,
              rol: contextDTO.rol,
              estado: contextDTO.estado,
              primerNombre: person.primer_nombre,
              segundoNombre: person.segundo_nombre,
              fechaNacimiento: person.fechaNacimiento,
              telefono: person.telefono,
              primerApellido: person.apellido_paterno,
              segundoApellido: person.apellido_materno,
              ciudadNombre: graduate.ciudad,
              año_graduacion: graduate.año_graduacion,
              estadoCivil: graduate.estadocivil,
              nombreDelRol: userDto.rol,
              email_personal: graduate.email_personal
            });

            this.newDTOUser = userDto;
            this.newPerson = person;
            this.newGraduate = graduate;
            return null;
          }),
          catchError(error => {
            console.error('Error al obtener datos de persona y graduado:', error);
            // Manejar el error de manera apropiada para tu aplicación
            return of(null);
          })
        ).subscribe();
      }
    } catch (error) {
      console.error('Error en catchUserDTOInContext:', error);
    }
  }


  UpdateAllData(): void {
    this.editMode = true;
    try {

      const idPerson = this.newPerson.id;
      const idUSer = this.newDTOUser.id;
      const idGrad = this.newGraduate.id;
      if (idPerson !== undefined) {
        const formData = this.registerNewUserForm.value;
        const personEdit: Persona = {
          id: idPerson,
          cedula: formData.cedula,
          primer_nombre: formData.primerNombre,
          segundo_nombre: formData.segundoNombre,
          fechaNacimiento: formData.fechaNacimiento,
          telefono: formData.telefono,
          apellido_paterno: formData.primerApellido,
          apellido_materno: formData.segundoApellido
        };

        const userEdit = {
          id: idUSer,
          nombreUsuario: formData.nombreUsuario,
          clave: formData.clave,
          rol: this.newDTOUser.rol,
          estado: this.newDTOUser.estado,
          cedula: this.newDTOUser.cedula,
          url_imagen: this.newDTOUser.ruta_imagen,
          ruta_imagen: this.newDTOUser.ruta_imagen
        }

        const graduteEdit : GraduadoDTO = {
          id: idGrad,
          usuario: formData.nombreUsuario,
          ciudad: formData.ciudadNombre,
          año_graduacion: formData.año_graduacion,
          email_personal: formData.email_personal,
          estadocivil: formData.estadoCivil,
          ruta_pdf: this.newGraduate.ruta_pdf,
          url_pdf: this.newGraduate.url_pdf,
          idOferta: this.newGraduate.idOferta
        }

        console.log(graduteEdit);

        this.editPerEndPoint(idPerson, personEdit);
        this.editUserEndPoint(idUSer, userEdit);
        this.editGraduateEndPoint(idGrad, graduteEdit);
      } else {
        console.error('Fatal Error: No se proporcionó un ID válido.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  getGraduateDTOByUserId(idUser: any): Observable<GraduadoDTO> {
    return this.graduateService.getGraduadoDTOByUserId(idUser);
  }

  getPersonByIndentification(identification: string): Observable<Persona> {
    return this.personService.getPersonByIdentification(identification);
  }

  editPerEndPoint(id: any, pers: Persona) {
    try {
      this.personService.updatePerson(id, pers).subscribe(updatedPer => {
        const index = this.personList.findIndex(u => u.id === updatedPer.id);
        this.getAllUsersBySelectedRoles();
        if (index !== -1) {
          this.personList[index] = updatedPer;
        }
        Swal.fire({
          icon: 'success',
          text: 'Persona actualizada'
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  editUserEndPoint(id: any, user: UserDTO) {
    try {
      this.userService.updateUser(id, user).subscribe(updatedPer => {
        const index = this.usersList.findIndex(u => u.id === updatedPer.id);
        this.getAllUsersBySelectedRoles();
        if (index !== -1) {
          this.usersList[index] = updatedPer;
        }
        Swal.fire({
          icon: 'success',
          text: 'Usuario Actualizado'
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  editGraduateEndPoint(id: any, grad: GraduadoDTO) {
    try {
      this.graduateService.updateGraduadoDTO(id, grad).subscribe(updatedGrad => {
        const index = this.graduatedDTOList.findIndex(u => u.id === updatedGrad.id);
        this.getAllUsersBySelectedRoles();
        if (index !== -1) {
          this.graduatedDTOList[index] = updatedGrad;
        }
        Swal.fire({
          icon: 'success',
          text: 'Graduado Actualizado'
        });
      });
    } catch (error) {
      console.log(error + " Error aquí");
    }
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
