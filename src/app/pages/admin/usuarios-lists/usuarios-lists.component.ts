import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from '../../../data/service/AuthService';
import { UserService } from '../../../data/service/UserService';
import { Persona } from '../../../data/model/persona';
import { PersonaService } from '../../../data/service/PersonService';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Rol } from '../../../data/model/rol';
import { RolService } from '../../../data/service/rol.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesService } from '../../../data/DataTables.service';
import { FiltersService } from '../../../data/Filters.service';
import { AlertsService } from '../../../data/Alerts.service';
import { RegisterDTO } from '../../../data/model/DTO/RegisterDTO';
import { UserDTO } from '../../../data/model/DTO/UserDTO';
import { Ciudad } from '../../../data/model/ciudad';
import { sectorempresarial } from '../../../data/model/sectorEmpresarial';
import { CiudadService } from '../../../data/service/ciudad.service';
import { EmpresarioDTO } from '../../../data/model/DTO/EmpresarioDTO';
import { GraduadoDTO } from '../../../data/model/DTO/GraduadoDTO';
import { EmpresaDTO } from '../../../data/model/DTO/EmpresaDTO';
import { GraduadoService } from '../../../data/service/graduado.service';
import { EmpresarioService } from '../../../data/service/empresario.service';
import { fechaNacimientoValidator } from '../../authentication/register/fechaNacimientoValidator';
import { ValidatorsUtil } from '../../../components/Validations/ReactiveValidatorsRegEx';
import { AuditEntryService } from '../../../data/service/auditEntry.service';
import { AuditEntryDTO } from '../../../data/model/DTO/AuditEntryDTO';
import { AuditActionType } from '../../../data/model/enum/enums';

@Component({
  selector: 'app-usuarios-lists',
  templateUrl: './usuarios-lists.component.html',
  styleUrls: ['./usuarios-lists.component.css']
})
export class UsuariosListsComponent implements OnInit {

  registerNewUserForm: FormGroup;
  formCase1: FormGroup;
  formCase2: FormGroup;
  editMode: boolean = false;
  ciudadesList: Ciudad[] = [];
  businessSectorsList: sectorempresarial[] = [];
  roleName!: string;
  'registerDto': RegisterDTO;
  id: any;
  showPassword: boolean = false;
  editarClicked = false;
  usersList: UserDTO[] = [];
  usersListFiltered: UserDTO[] = [];
  dataForValidation: UserDTO[] = [];
  roleList: Rol[] = [];
  person: Persona = new Persona();
  userDTO: UserDTO = new UserDTO();
  registerDTO: RegisterDTO = new RegisterDTO();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  initializeTable: boolean = true;
  dtoptions: DataTables.Settings = {};
  userId!: number;

  ngOnInit(): void {
    this.loadData();
    this.loadCities();
    this.editMode = false;
    const columnTitles = ['#', 'Nombre Usuario', 'Cédula', 'Rol', 'Estado'];
    this.dtoptions = this.dtService.setupDtOptions(columnTitles, 'Buscar Usuarios...');
    this.filterService.initializeDropdowns('filterTable', columnTitles,);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private personService: PersonaService,
    private rolService: RolService,
    private ciudadService: CiudadService,
    private gradutateService: GraduadoService,
    private businessManService: EmpresarioService,
    private authService: AuthService,
    public dtService: DataTablesService,
    public filterService: FiltersService,
    public alertService: AlertsService,
    private AuditService: AuditEntryService,
    private renderer: Renderer2
  ) {
    this.registerNewUserForm = this.fb.group({
      primerNombre: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      segundoNombre: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      primerApellido: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      segundoApellido: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      cedula: ['', [Validators.required, this.noDuplicateCedulaValidation(), Validators.pattern(ValidatorsUtil.patterOnlyNumbersValidator())]],
      sexo: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patterOnlyNumbersValidator())]],
      fechaNacimiento: ['', [Validators.required, fechaNacimientoValidator()]],
      nombreUsuario: ['', [Validators.required, this.noDuplicateUsernameValidation(), Validators.pattern(ValidatorsUtil.patternOnlyLettersAndNumbersValidator())]],
      clave: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternPasswordValidator())]],
    });

    this.formCase1 = this.fb.group({
      descripcion: ['', Validators.required],
      anios: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      puesto: ['', Validators.required],
    });

    this.formCase2 = this.fb.group({
      ciudad: ['', Validators.required],
      anioGraduacion: ['', Validators.required],
      emailPersonal: ['', [Validators.required, Validators.email]],
      estadoCivil: ['', Validators.required],
    });
    this.editMode = true;
    this.userId = localStorage.getItem('user_id') ? parseInt(localStorage.getItem('user_id')!) : 0;
  };

  onRegistrarClick(): void {
    this.registerNewUserForm.reset();
    this.formCase1.reset();
    this.formCase2.reset();
    this.alertService.resetInputsValidations(this.renderer);
    this.editMode = false;
  }

  onEditarClick(): void {
    this.editarClicked = true;
  }

  titleHandler(): string {
    return this.editMode ? 'Editar ' + this.roleName : 'Crear nuevo ' + this.roleName;
  }

  closeModal(): void {
    this.registerNewUserForm.reset();
    this.editMode = false;
    const cancelButton = document.getElementById('close-button') as HTMLElement;
    if (cancelButton) {
      cancelButton.click();
    }
  }

  callModal(): void {
    const boton = document.getElementById('open-modal-action');
    if (boton) {
      boton.click();
    }
    this.callAllForms();
  }

  controlOptionsOnCreate(role: string): void {
    switch (role) {
      case 'GRADUADO':
        this.callModal();
        break;
      case 'EMPRESARIO':
        this.callModal();
        break;
      case 'RESPONSABLE_CARRERA':
        this.callModal();
        break;
      default:
        break;
    }
  }

  showSelectedOption(): void {
    Swal.fire({
      title: "Seleccione una opción",
      icon: "question",
      html: `
      <b>Seleccione una opción para continuar</b>
      <br>
      <div class="container mt-4">
        <div class="body">
          <div class="">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">            
                <label class="option-btn">
                  <input type="radio" name="option" id="graduadoBtn" autocomplete="off" value="GRADUADO"> Graduado
                </label>
              </li>
              <li class="list-group-item">
                  <label class="option-btn">
                    <input type="radio" name="option" id="empresarioBtn" autocomplete="off" value="EMPRESARIO"> Empresario
                  </label>
              </li>
              <li class="list-group-item">
                <label class="option-btn">
                  <input type="radio" name="option" id="responsableBtn" autocomplete="off" value="RESPONSABLE_CARRERA"> Responsable Carrera
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      `,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: false,
      didOpen: (modalElement) => {
        const radioButtons = modalElement.querySelectorAll('.option-btn input[type="radio"]');
        radioButtons.forEach((radioButton) => {
          radioButton.addEventListener('click', (event) => {
            const selectedOption = (event.target as HTMLInputElement).value;
            this.roleName = selectedOption;
            this.controlOptionsOnCreate(this.roleName);
            Swal.close();
          });
        });
      }
    });
  }

  getAllUsersBySelectedRoles(): void {
    const rolesToShow = ['GRADUADO', 'EMPRESARIO'];
    this.userService.getUsersDTO().subscribe((users) => {
      this.usersList = users.filter((user) => rolesToShow.includes(user.rol));
      this.usersListFiltered = [...this.usersList];
    });
  }

  getAllSelectedRoles(): void {
    const rolesToDisplay = ['GRADUADO', 'EMPRESARIO', 'RESPONSABLE_CARRERA'];
    this.rolService.getRoles().subscribe(roles => {
      this.roleList = roles.filter(role => rolesToDisplay.includes(role.nombre));
    });
  }

  loadCities() {
    this.ciudadService.getCiudades().subscribe((ciudades) => {
      this.ciudadesList = ciudades;
    });
  }

  onSexoChange(event: any, value: string) {
    if (event.target.checked) {
      this.registerNewUserForm.patchValue({
        sexo: value
      });
    } else {
      this.registerNewUserForm.patchValue({
        sexo: ''
      });
    }
  }

  async register() {
    if (this.registerNewUserForm.valid) {
      if (this.roleName) {
        switch (this.roleName) {
          case 'GRADUADO':
            if (this.formCase2.valid) {
              const formData = this.registerNewUserForm.value;
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
                rol: this.roleName,
                estado: formData.nombreDelRol === 'GRADUADO' ? true : false,
                rutaImagen: '',
                urlImagen: '',
              };
              this.authService.signup(this.registerDto, this.registerBusinessMan(this.registerDto.nombreUsuario),
                new EmpresaDTO, this.registerGraduate(this.registerDto.nombreUsuario)).subscribe(() => {
                  let audit: AuditEntryDTO = {
                    timeStamp: new Date(),
                    actionType: 'INSERT',
                    userId: this.userId,
                    resourceName: 'Usuario: ' + formData.nombreUsuario,
                    actionDetails: 'Usuario: ' + formData.nombreUsuario + " Cédula: " + formData.cedula + " Rol: " + this.roleName,
                    oldValue: '',
                    newValue: ''
                  }
                  this.createAuditEntry(audit);
                });
            } else {
              this.showErrorsForm(this.formCase2);
            }
            break;
          case 'EMPRESARIO':
            if (this.formCase1.valid) {
              const formData = this.registerNewUserForm.value;
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
                rol: this.roleName,
                estado: formData.nombreDelRol === 'GRADUADO' ? true : false,
                rutaImagen: '',
                urlImagen: '',
              };
              this.authService.signup(this.registerDto, this.registerBusinessMan(this.registerDto.nombreUsuario),
                new EmpresaDTO, this.registerGraduate(this.registerDto.nombreUsuario)).subscribe(() => {
                  let audit: AuditEntryDTO = {
                    timeStamp: new Date(),
                    actionType: 'INSERT',
                    userId: this.userId,
                    resourceName: 'Usuario: ' + formData.nombreUsuario,
                    actionDetails: 'Usuario: ' + formData.nombreUsuario + " Cédula: " + formData.cedula + " Rol: " + this.roleName,
                    oldValue: '',
                    newValue: ''
                  }
                  this.createAuditEntry(audit);
                });
            } else {
              this.showErrorsForm(this.formCase1);
            }
            break;
        }
      }
    } else {
      this.showErrorsForm(this.registerNewUserForm);
    }
  }

  async createAuditEntry(audit: AuditEntryDTO) {
    this.AuditService.createAuditory(audit).subscribe({
      next: () => {
        this.loadData();
        this.closeModal();
      }
    });
  }

  showErrorsForm(formName: FormGroup): void {
    Object.keys(formName.controls).forEach(key => {
      const control = formName.get(key);
      if (control != null && control.invalid) {
        control.markAsTouched();
      }
    });
  }

  cleanErrorsForm(formName: FormGroup): void {
    Object.keys(formName.controls).forEach(key => {
      const control = formName.get(key);
      if (control != null && control.valid) {
        control.markAsUntouched();
      }
    });
  }

  callAllForms(): void {
    this.cleanErrorsForm(this.registerNewUserForm);
    this.cleanErrorsForm(this.formCase1);
    this.cleanErrorsForm(this.formCase2);
  }

  registerGraduate(user: string): GraduadoDTO | undefined {
    if (this.formCase2.valid) {
      const formData = this.formCase2.value;
      let graduate: GraduadoDTO = {
        usuario: user,
        ciudad: formData.ciudad,
        anioGraduacion: formData.anioGraduacion,
        emailPersonal: formData.emailPersonal,
        estadoCivil: formData.estadoCivil,
        rutaPdf: '',
        urlPdf: ''
      };
      return graduate;
    }
    return undefined;
  }

  registerBusinessMan(user: string): EmpresarioDTO | undefined {
    if (this.formCase1.valid) {
      const formData = this.formCase1.value;
      let businessMan: EmpresarioDTO = {
        usuario: user,
        descripcion: formData.descripcion,
        anios: formData.anios,
        email: formData.email,
        puesto: formData.puesto,
        estado: false
      };
      return businessMan;
    }
    return undefined;
  }

  loadData() {
    this.userService.getUsersDTO().subscribe(
      result => {
        const rolesToShow = ['GRADUADO', 'EMPRESARIO', 'RESPONSABLE_CARRERA'];
        this.dataForValidation = result;
        this.usersList = result.filter((user) => rolesToShow.includes(user.rol));
        this.usersListFiltered = [...this.usersList];
        if (this.initializeTable) {
          this.dtTrigger.next(null);
          this.initializeTable = false;
        } else {
          this.dtService.rerender(this.dtElement, this.dtTrigger);
        }
      }
    );
  }

  registerUser(): void {
    this.editMode = false;
    if (this.registerNewUserForm.valid) {
      const formData = this.registerNewUserForm.value;
      this.registerDTO = {
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
        estado: false,
        rutaImagen: '',
        urlImagen: ''
      };
      this.authService.signup(this.registerDTO).subscribe(response => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado',
          text: 'El usuario ha sido registrado con éxito',
          timer: 2000
        });
        this.closeModal();
      });
    } else {
      Object.values(this.registerNewUserForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  updateStateUser(id: any, usuarioDTO: UserDTO): void {
    this.userService.updateState(id, usuarioDTO.estado).subscribe(updatedUser => {
      const index = this.usersList.findIndex(u => u.id === updatedUser.id);
      this.loadData();
      if (index !== -1) {
        this.usersList[index] = updatedUser;
      }
    });
  }

  getDataForUpdate(identification: any, id: any, role: any): void {
    this.editMode = true;
    this.personService.getPersonByIdentification(identification).subscribe((person) => {
      this.id = person.id;
      this.patchPersonAndUserData(this.id, person);
      switch (role) {
        case 'GRADUADO':
          this.roleName = 'GRADUADO';
          this.patchGraduateData(id);
          break;
        case 'EMPRESARIO':
          this.roleName = 'EMPRESARIO';
          this.patchBusinessManData(id);
          break;
        default:
          break;
      }
    });
  }

  patchPersonAndUserData(id: any, person: Persona): void {
    this.userService.getUserDTOById(id).subscribe((user) => {
      this.registerNewUserForm.patchValue({
        primerNombre: person.primerNombre,
        segundoNombre: person.segundoNombre,
        primerApellido: person.apellidoPaterno,
        segundoApellido: person.apellidoMaterno,
        cedula: person.cedula,
        telefono: person.telefono,
        fechaNacimiento: person.fechaNacimiento,
        sexo: person.sexo,
        nombreUsuario: user.nombreUsuario,
        nombreDelRol: user.rol,
      });
    });
  }

  patchGraduateData(userId: any): void {
    this.gradutateService.getGraduadoDTOByUserId(userId).subscribe((graduate) => {
      if (graduate) {
        this.formCase2.patchValue({
          ciudad: graduate.ciudad,
          anioGraduacion: graduate.anioGraduacion,
          emailPersonal: graduate.emailPersonal,
          estadoCivil: graduate.estadoCivil
        });
      }
    });
  }

  patchBusinessManData(userId: any): void {
    this.businessManService.getBusinessManByUserId(userId).subscribe((businessMan) => {
      if (businessMan) {
        this.formCase1.patchValue({
          descripcion: businessMan.descripcion,
          anios: businessMan.anios,
          email: businessMan.email,
          puesto: businessMan.puesto
        });
      }
    });
  }

  toggleSwitch(usuarioDTO: UserDTO): void {
    usuarioDTO.estado = !usuarioDTO.estado;
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea ${usuarioDTO.estado ? 'activar' : 'desactivar'} al Usuario ${usuarioDTO.nombreUsuario}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sí, ${usuarioDTO.estado ? 'activar' : 'desactivar'}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateStateUser(usuarioDTO.id, usuarioDTO);
      } else {
        usuarioDTO.estado = !usuarioDTO.estado;
      }
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async updateUserData() {
    if (this.registerNewUserForm.valid) {
      const formData = this.registerNewUserForm.value;
      this.person.primerNombre = formData.primerNombre;
      this.person.segundoNombre = formData.segundoNombre;
      this.person.apellidoPaterno = formData.primerApellido;
      this.person.apellidoMaterno = formData.segundoApellido;
      this.person.cedula = formData.cedula;
      this.person.telefono = formData.telefono;
      this.person.fechaNacimiento = formData.fechaNacimiento;
      this.person.sexo = formData.sexo;
      let userDTO = new UserDTO();
      userDTO.nombreUsuario = formData.nombreUsuario;
      userDTO.rol = this.roleName;
      this.personService.updatePerson(this.id, this.person).subscribe(() => {
        this.userService.updateSomeDataUser(this.id, userDTO).subscribe(() => {
          this.controlCaseUpdate();
          this.loadData();
          this.closeModal();
        });
      });
    } else {
      Object.values(this.registerNewUserForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  controlCaseUpdate(): void {
    switch (this.roleName) {
      case 'GRADUADO':
        this.updateGraduate();
        break;
      case 'EMPRESARIO':
        this.updateBusinessMan();
        break;
    }
  }

  async updateGraduate() {
    if (this.formCase2.valid) {
      const formData = this.formCase2.value;
      let graduate: GraduadoDTO = {
        usuario: this.userDTO.nombreUsuario,
        ciudad: formData.ciudad,
        anioGraduacion: formData.anioGraduacion,
        emailPersonal: formData.emailPersonal,
        estadoCivil: formData.estadoCivil,
        rutaPdf: '',
        urlPdf: ''
      };
      this.gradutateService.updateGraduadoDTO(this.userDTO.id, graduate).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado',
          text: 'El usuario ha sido actualizado con éxito',
          timer: 2000
        });
      });
    } else {
      this.showErrorsForm(this.formCase2);
      console.log('Formulario inválido 2');
    }
  }

  async updateBusinessMan() {
    if (this.formCase1.valid) {
      const formData = this.formCase1.value;
      let businessMan: EmpresarioDTO = {
        usuario: this.userDTO.nombreUsuario,
        descripcion: formData.descripcion,
        anios: formData.anios,
        email: formData.email,
        puesto: formData.puesto,
        estado: true
      };
      if (this.userDTO.id) {
        this.businessManService.updateEmpresarioDTO(this.userDTO.id, businessMan).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            text: 'El usuario ha sido actualizado con éxito',
            timer: 2000
          });
        });
      }
    } else {
      this.showErrorsForm(this.formCase1);
      console.log('Formulario inválido 1');
    }
  }

  showWarningAlert(): void {
    Swal.fire({
      title: 'Edición desactivada',
      text: 'Para editar un usuario, primero debe activarlo.',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
    });
  }

  async showUserData(identification: string, id: any) {
    this.personService.getPersonByIdentification(identification).subscribe(async (person) => {
      this.person = person;
      this.userService.getUserDTOById(id).subscribe((user) => {
        this.userDTO = user;
      });
    });
  }

  handleClick(cedula: string, id: any, estado: boolean, role: string) {
    if (estado) {
      this.getDataForUpdate(cedula, id, role);
    } else {
      this.showWarningAlert();
    }
  }

  fileContent: string | ArrayBuffer | null = null;

  async importarDatos(): Promise<void> {
    if (!this.fileContent || typeof this.fileContent !== 'string') {
      this.alertService.mostrarSweetAlert(false, 'No hay archivo o formato inválido.');
      return;
    }

    try {
      this.alertService.mostrarAlertaCargando('Importando datos...');
      const data = JSON.parse(this.fileContent);

      if (Array.isArray(data)) {
        for (const dataToRestore of data) {
          //await this.ofertaService.createOfertaLaboral(dataToRestore).toPromise();
        }
        this.alertService.mostrarSweetAlert(true, 'Todo el contenido fue restaurado con éxito.');
      } else {
        this.alertService.mostrarSweetAlert(false, 'El JSON proporcionado no es un array.');
      }
    } catch (error: any) {
      this.alertService.mostrarSweetAlert(false, 'Error al parsear JSON: ' + error.message);
    } finally {
      this.alertService.detenerAlertaCargando();
    }
    this.loadData();
  }

  noDuplicateUsernameValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nombreUsuario = control.value;
      if (nombreUsuario) {
        const isDuplicate = this.dataForValidation.some(user => user.nombreUsuario.toUpperCase() === nombreUsuario.toUpperCase() && user.nombreUsuario.toUpperCase() !== control.value);
        return isDuplicate ? { duplicated: true } : null;
      }
      return null;
    };
  }

  noDuplicateCedulaValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cedula = control.value;
      if (cedula) {
        const isDuplicate = this.dataForValidation.some(user => user.cedula === cedula);
        return isDuplicate ? { duplicated: true } : null;
      }
      return null;
    };
  }
}
