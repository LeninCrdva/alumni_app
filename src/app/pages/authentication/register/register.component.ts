import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../data/service/AuthService';
import { AssetService } from '../../../data/service/Asset.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { RegisterDTO } from '../../../data/model/DTO/RegisterDTO';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { fechaNacimientoValidator } from './fechaNacimientoValidator';
import { CiudadService } from '../../../data/service/ciudad.service';
import { Ciudad } from '../../../data/model/ciudad';
import { sectorempresarial } from '../../../data/model/sectorEmpresarial';
import { SectorEmpresarialService } from '../../../data/service/sectorempresarial.service';
import { GraduadoDTO } from '../../../data/model/DTO/GraduadoDTO';
import { EmpresarioDTO } from '../../../data/model/DTO/EmpresarioDTO';
import { EmpresaDTO } from '../../../data/model/DTO/EmpresaDTO';
import { AlertsService } from '../../../data/Alerts.service';
import { ValidatorsUtil } from '../../../components/Validations/ReactiveValidatorsRegEx';
import { ImageHandlerServiceFoto } from '../../../data/service/ImageHandlerServiceFoto';
import { PdfHandlerService } from '../../../data/service/pdfHandlerService.service';
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
  subRegisterForm: FormGroup;
  formCase1: FormGroup;
  formSubCase1: FormGroup;
  formCase2: FormGroup;

  //imagenes//
  public archivos: any = []
  public loading?: boolean
  public username: string = '';
  public inforest: any = [];
  public getRuta: string = '';
  public mensajevalidado: string = '';
  urlPhoto: any;
  'registerDto': RegisterDTO;
  roleName!: string;
  ciudadesList: Ciudad[] = [];
  businessSectorsList: sectorempresarial[] = [];

  constructor(
    public pdfHandlerService: PdfHandlerService,
    public imageHandlerService: ImageHandlerServiceFoto,
    private fb: FormBuilder,
    private assetService: AssetService,
    private authService: AuthService,
    private ciudadService: CiudadService,
    private businessSectorService: SectorEmpresarialService,
    private router: Router,
    private renderer: Renderer2,
    private alertService: AlertsService,
  ) {
    this.roleName = localStorage.getItem('userRole') ?? '';

    this.registerForm = this.fb.group({
      primerNombre: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      segundoNombre: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      primerApellido: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      segundoApellido: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersValidator())]],
      cedula: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patterOnlyNumbersValidator())]],
      sexo: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patterOnlyNumbersValidator())]],
      fechaNacimiento: ['', [Validators.required, fechaNacimientoValidator()]],
      nombreDelRol: [localStorage.getItem('userRole') ?? '', Validators.required],
    });

    this.subRegisterForm = this.fb.group({
      nombreUsuario: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternOnlyLettersAndNumbersValidator())]],
      clave: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternPasswordValidator())]],
    });

    this.formCase1 = this.fb.group({
      descripcion: ['', Validators.required],
      anios: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      puesto: ['', Validators.required],
    });

    this.formSubCase1 = this.fb.group({
      ciudad: ['', Validators.required],
      sectorEmpresarial: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.pattern(ValidatorsUtil.patternRucValidator())]],
      nombre: ['', Validators.required],
      tipoEmpresa: ['', Validators.required],
      razonSocial: ['', Validators.required],
      area: ['', [Validators.required]],
      sitioWeb: [''],
      ubicacion: ['', [Validators.required]],
    });

    this.formCase2 = this.fb.group({
      ciudad: ['', Validators.required],
      anioGraduacion: ['', Validators.required],
      emailPersonal: ['', [Validators.required, Validators.email]],
      estadoCivil: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.changeSections();
    this.simpleControl();
    this.controlByRole(this.roleName);
  }

  ngAferViewInit(): void {
  }

  simpleControl(): void {
    if (!this.roleName) {
      this.router.navigate(['account/login']);
    }
  }

  cleanErrorsForm(formName: FormGroup): void {
    Object.keys(formName.controls).forEach(key => {
      const control = formName.get(key);
      if (control != null && control.valid) {
        control.markAsUntouched();
      }
    });
  }

  changeSections(): void {
    jQuery(() => {
      const navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn'),
        allPrevBtn = $('.prevBtn');

      allWells.hide();

      navListItems.on('click', function (e) {
        e.preventDefault();
        const href = $(this).attr('href');
        if (href) {
          const $target = $(href),
            $item = $(this);
          if ($item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').trigger('focus');
          }
        }
      });

      allPrevBtn.on('click', function () {
        const curStep = $(this).closest('.setup-content'),
          curStepBtn = curStep.attr('id'),
          prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children('a');
        prevStepWizard.removeAttr('disabled').trigger('click');
      });

      allNextBtn.on('click', function () {
        const curStep = $(this).closest('.setup-content'),
          curStepBtn = curStep.attr('id'),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children('a');
        nextStepWizard.removeAttr('disabled').trigger('click');
      });

      $('div.setup-panel div a.btn-primary').trigger('click');
    });
  }

  showInputsValidations() {
    this.alertService.showInputsValidations(this.renderer);
  }

  resetInputsValidations() {
    this.alertService.resetInputsValidations(this.renderer);
  }

  loadCities() {
    this.ciudadService.getCiudades().subscribe((ciudades) => {
      this.ciudadesList = ciudades;
    });
  }

  loadBusinessSectors() {
    this.businessSectorService.getSectoresEmpresariales().subscribe((sectores) => {
      this.businessSectorsList = sectores;
    });
  }

  controlByRole(rol: string): void {
    this.loadCities();
    switch (rol) {
      case 'EMPRESARIO':
        this.loadBusinessSectors();
        break;
      default:
        break;
    }
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

  //-----------------------Imagen o Archivos--------------------------------------------------//
  rutaImagen: any;
  rutaPdf: any;

  onFileSelected(event: any): void {
    this.imageHandlerService.capturarFile(event);
    this.imageHandlerService.previsualizacion;
  }

  onPdfSelected(event: any): void {
    this.pdfHandlerService.handlePdfFile(event);
    this.pdfHandlerService.pdfUrl;
  }

  deleteFile(rutakey: string) {
    this.assetService.delete(rutakey).subscribe(r => {
      console.log("archivo eliminado")
    })
  }

  async uploadAndSetRutaImagen(file: File, type: string = 'image') {
    try {
      const observable = this.assetService.upload(file);
      const data: HttpEvent<any> | undefined = await lastValueFrom(observable);

      if (type === 'image') {
        if (data instanceof HttpResponse) {
          const key = data.body?.key;
          this.rutaImagen = key;
        }
      } else {
        if (data instanceof HttpResponse) {
          const key = data.body?.key;
          this.rutaPdf = key;
        }
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  }

  async register() {
    if (this.registerForm.valid) {

      const formData = this.registerForm.value;
      const subFormData = this.subRegisterForm.value;
      if (this.imageHandlerService.archivos) {
        await this.uploadAndSetRutaImagen(this.imageHandlerService.archivos[0]);
        await this.uploadAndSetRutaImagen(this.pdfHandlerService.pdfFile[0], 'pdf');
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
        nombreUsuario: subFormData.nombreUsuario,
        clave: subFormData.clave,
        rol: formData.nombreDelRol,
        estado: formData.nombreDelRol === 'GRADUADO' ? true : false,
        rutaImagen: this.rutaImagen,
        urlImagen: '',
      };
      this.authService.signup(this.registerDto, this.registerBusinessMan(this.registerDto.nombreUsuario),
        this.registerCompany(this.registerDto.nombreUsuario), this.registerGraduate(this.registerDto.nombreUsuario, this.rutaPdf)).subscribe(() => {
          this.router.navigate(['account/login']);
          this.showAlert(this.registerDto);
        }
        );
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control != null && control.invalid) {
          console.warn(`Campo '${key}' tiene errores:`, control.errors);
        }
      });
    }
  }

  registerGraduate(user: string, rutaPdf: any): GraduadoDTO | undefined {
    if (this.formCase2.valid) {
      const formData = this.formCase2.value;
      let graduate: GraduadoDTO = {
        usuario: user,
        ciudad: formData.ciudad,
        anioGraduacion: formData.anioGraduacion,
        emailPersonal: formData.emailPersonal,
        estadoCivil: formData.estadoCivil,
        rutaPdf: rutaPdf,
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

  registerCompany(businessManUser: string): EmpresaDTO | undefined {
    if (this.formSubCase1.valid) {
      const formData = this.formSubCase1.value;
      let company: EmpresaDTO = {
        empresario: businessManUser,
        ciudad: formData.ciudad,
        sectorEmpresarial: formData.sectorEmpresarial,
        ruc: formData.ruc,
        nombre: formData.nombre,
        tipoEmpresa: formData.tipoEmpresa,
        razonSocial: formData.razonSocial,
        area: formData.area,
        sitioWeb: formData.sitioWeb,
        ubicacion: formData.ubicacion,
        estado: false
      };
      return company;
    }
    return undefined;
  }

  showAlert(resp: RegisterDTO) {
    if (resp.rol.includes('EMPRESARIO') || resp.rol.includes('ADMINISTRADOR')) {
      Swal.fire({
        icon: 'info',
        text: 'Su cuenta se ha registrado correctamente, pero necesita ser aprobada por un administrador para poder iniciar sesión.'
      });
      /*switch (resp.rol) {
        case 'ADMINISTRADOR':
          this.openNuevoAdministradorModal();
          break;
        case 'EMPRESARIO':
          this.openNuevoEmpresarioModal();
          break;
       
      }*/
    } else {
      Swal.fire({
        icon: 'success',
        text: 'Datos cargados'
      });
    }
  }
}