import { Component, Renderer2, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../data/service/UserService';
import { PersonaService } from '../../../data/service/PersonService';
import { AdministradorService } from '../../../data/service/administrador.service';
import { AssetService } from '../../../data/service/Asset.service';
import { InputsValidations } from '../../../components/Validations/InputsValidations';
import Swal from 'sweetalert2';
import { Persona } from '../../../data/model/persona';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Usuario } from '../../../data/model/usuario';
import { UserDTO } from '../../../data/model/DTO/UserDTO';


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
    private formBuilder: FormBuilder,
    private personaService: PersonaService,
    private adminService: AdministradorService,
    private assetService: AssetService) {

    this.updateAdminDataForm = formBuilder.group({
      primer_nombre: ['', Validators.required],
      segundo_nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.getAdminInfo();
  }

  getAdminInfo() {
    const userIdStorage = localStorage.getItem('name');
    if (userIdStorage !== null) {
      this.userService.getUserByUsername(userIdStorage).subscribe(data => {

        this.adminInfo = data;
        this.urlPhoto = this.adminInfo.rutaImagen;
        console.log(this.adminInfo);
        this.getadminInfoById();
      });
    }
  }

  getadminInfoById() {
    this.adminService.getAdministradorByUserId(this.adminInfo.id).subscribe(data => {
      this.pureInfo = data;
      this.patchAdminData();
    });
  }

  patchAdminData() {
    this.updateAdminDataForm.patchValue({
      primer_nombre: this.adminInfo.persona.primer_nombre,
      segundo_nombre: this.adminInfo.persona.segundo_nombre,
      apellido_paterno: this.adminInfo.persona.apellido_paterno,
      apellido_materno: this.adminInfo.persona.apellido_materno,
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
          this.updatePhoto();
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

  updatePhoto() {
    const userIdStorage: number = parseInt(localStorage.getItem('userId') || '0');
    this.userService.getUserDTOById(userIdStorage).subscribe((data) => {
      data.rutaImagen = this.urlPhoto;
      this.userService.updateUserPhoto(userIdStorage, data.rutaImagen).subscribe(() => {
        this.getAdminInfo();
      });

    });
  }

  uploadPhoto(event: any) {
    const file = event.target.files[0];
    this.assetService.upload(file).subscribe((data: HttpEvent<any>) => {
      if (data instanceof HttpResponse) {
        const key = data.body?.key;
        this.urlPhoto = key;
      }
    });
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

}
