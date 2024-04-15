import { Component, Renderer2, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../data/service/UserService';
import { PersonaService } from '../../../data/service/PersonService';
import { AdministradorService } from '../../../data/service/administrador.service';
import Swal from 'sweetalert2';
import { Persona } from '../../../data/model/persona';
import { ImageHandlerServiceFoto } from '../../../data/service/ImageHandlerServiceFoto';
import { ValidatorsUtil } from '../../../components/Validations/ReactiveValidatorsRegEx';
import { fechaNacimientoValidator } from '../../authentication/register/fechaNacimientoValidator';
import { DataValidationService } from '../../../data/service/data-validation.service';


@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent implements OnInit, AfterViewInit {

  updateAdminDataForm: FormGroup;
  adminInfo: any;
  pureInfo: any;
  urlPhoto: any;
  person: Persona = new Persona();

  constructor(private renderer: Renderer2, private el: ElementRef,
    private userService: UserService,
    formBuilder: FormBuilder,
    private personaService: PersonaService,
    private adminService: AdministradorService,
    public imageHandlerService: ImageHandlerServiceFoto,
    private dataValidationService: DataValidationService
  ) {

    this.updateAdminDataForm = formBuilder.group({
      primerNombre: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      segundoNombre: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      cedula: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patterOnlyNumbersValidator())]],
      telefono: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patterOnlyNumbersValidator())]],
      fechaNacimiento: ['', [Validators.required, fechaNacimientoValidator()]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getAdminInfo();
  }

  errorMessages = {
    "cedula": '',
    'email': '',
    'telefono': '',
  }

  getAdminInfo() {
    const userIdStorage = localStorage.getItem('name');
    if (userIdStorage !== null) {
      this.userService.getUserByUsername(userIdStorage).subscribe(data => {
        this.adminInfo = data;
        this.urlPhoto = this.adminInfo.urlImagen;
        this.imageHandlerService.getPrevisualizacion(this.urlPhoto);
        this.getadminInfoById();
      });
    }
  }
  capturarImagen(event: any) {
    this.imageHandlerService.capturarFile(event);
    this.imageHandlerService.previsualizacion;
  }

  getadminInfoById() {
    this.adminService.getAdministradorByUserId(this.adminInfo.id).subscribe(data => {
      this.pureInfo = data;
      this.patchAdminData();
    });
  }

  patchAdminData() {
    this.updateAdminDataForm.patchValue({
      primerNombre: this.adminInfo.persona.primerNombre,
      segundoNombre: this.adminInfo.persona.segundoNombre,
      apellidoPaterno: this.adminInfo.persona.apellidoPaterno,
      apellidoMaterno: this.adminInfo.persona.apellidoMaterno,
      cedula: this.adminInfo.persona.cedula,
      telefono: this.adminInfo.persona.telefono,
      fechaNacimiento: this.adminInfo.persona.fechaNacimiento,
      email: this.pureInfo.email,
    });
  }

  updateAdminData() {
    if (this.updateAdminDataForm.valid) {
      this.person = this.updateAdminDataForm.value;
      this.pureInfo.email = this.updateAdminDataForm.value.email;
      const id = this.adminInfo.persona.id;
      this.personaService.updatePerson(id, this.person).subscribe(() => {
        this.adminService.updateAdministrador(this.pureInfo.id, this.pureInfo).subscribe(() => {
          Swal.fire({
            title: 'Datos actualizados',
            icon: 'success',
            text: 'Los datos han sido actualizados correctamente',
            confirmButtonText: 'Aceptar',
            timer: 1500
          })
        });
      });
    } else {
      Object.values(this.updateAdminDataForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  ngAfterViewInit() {
    const allIndicator = this.el.nativeElement.querySelectorAll('.indicator li') as NodeListOf<HTMLLIElement>;
    const allContent = this.el.nativeElement.querySelectorAll('.content li') as NodeListOf<HTMLLIElement>;

    allIndicator.forEach(item => {
      this.renderer.listen(item, 'click', () => {
        const content = this.el.nativeElement.querySelector(item.dataset['target']);

        if (content) {
          allIndicator.forEach(i => {
            this.renderer.removeClass(i, 'active');
          });

          allContent.forEach(i => {
            this.renderer.removeClass(i, 'active');
          });

          this.renderer.addClass(content, 'active');
          this.renderer.addClass(item, 'active');
        }
      });
    });
  }

  duplicatedFields: { [key: string]: boolean } = {
    identityCard: false,
    phone: false,
    adminEmail: false
  };

  validateUniqueIdentityCard(): void {
    if (this.updateAdminDataForm.get('cedula')?.valid) {
      const currentIdentityCard = this.adminInfo.persona.cedula;
      const identityCard = this.updateAdminDataForm.get('cedula')?.value;
      if (identityCard !== currentIdentityCard) {
        this.dataValidationService.validateIdentityCard(identityCard).subscribe(res => {
          this.duplicatedFields['identityCard'] = res;
        });
      } else {
        this.duplicatedFields['identityCard'] = false;
      }
    }
  }

  validatePhone(): void {
    if (this.updateAdminDataForm.get('telefono')?.valid) {
      const currentPhone = this.adminInfo.persona.telefono;
      const phone = this.updateAdminDataForm.get('telefono')?.value;
      if (phone !== currentPhone) {
        this.dataValidationService.validatePhone(phone).subscribe(res => {
          this.duplicatedFields['phone'] = res;
        });
      } else {
        this.duplicatedFields['phone'] = false;
      }
    }
  }

  validateAdminEmail(): void {
    if (this.updateAdminDataForm.get('email')?.valid) {
      const currentEmail = this.pureInfo.email;
      const email = this.updateAdminDataForm.get('email')?.value;
      if (email !== currentEmail) {
        this.dataValidationService.validateAdminEmail(email).subscribe(res => {
          this.duplicatedFields['adminEmail'] = res;
        });
      } else {
        this.duplicatedFields['adminEmail'] = false;
      }
    }
  }

  isSaveButtonDisabled(): boolean {
    return Object.values(this.duplicatedFields).some(value => value);
  }

}
