import { Component, Renderer2, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Usuario } from '../../../data/model/usuario';
import { Empresario } from '../../../data/model/empresario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../data/service/UserService';
import { PersonaService } from '../../../data/service/PersonService';
import { Router } from '@angular/router';
import { EmpresarioService } from '../../../data/service/empresario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css', '../../../../assets/prefabs/headers.css']
})
export class PerfilFormComponent implements AfterViewInit, OnInit {
  usuarioInfo: Usuario = new Usuario();
  empresarioInfo: Empresario = new Empresario();
  updatePersonForm: FormGroup;
  updateUbicacionForm: FormGroup;
  provincias: string[] = [];

  constructor(private renderer: Renderer2, private el: ElementRef, private userService: UserService,
    private formBuilder: FormBuilder, private personaService: PersonaService, private router: Router, private empresarioService: EmpresarioService) {
    this.updatePersonForm = formBuilder.group({
      primerNombre: ['', Validators.required],
      segundoNombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    })

    this.updateUbicacionForm = formBuilder.group({
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllCitiesAndGraduate()
    this.getAllInfoGraduate()
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

  getAllInfoGraduate(): void {
    const userIdStorage = localStorage.getItem('name')

    if (userIdStorage) {
      this.userService.getUserByUsername(userIdStorage).subscribe(
        user => { this.usuarioInfo = user; this.initializeForm() }
      )
    }
  }

  updateInfoGraduate() {
    Swal.fire({
      title: "¿Realmente deseas cambiar tus datos personales?",
      text: "Esta acción es irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, actualizar información!"
    }).then((result) => {
      if (result.isConfirmed && this.updatePersonForm.valid && this.updateUbicacionForm) {
        const formDataPerson = this.updatePersonForm.value;
        const idUser = this.usuarioInfo.persona.id
        const idEmpresario = this.empresarioInfo.id || 0;

        this.usuarioInfo.persona = {
          cedula: formDataPerson.cedula,
          primer_nombre: formDataPerson.primerNombre,
          segundo_nombre: formDataPerson.segundoNombre,
          fechaNacimiento: formDataPerson.fechaNacimiento,
          telefono: formDataPerson.telefono,
          apellido_paterno: formDataPerson.primerApellido,
          apellido_materno: formDataPerson.segundoApellido
        }


        this.personaService.updatePerson(idUser, this.usuarioInfo.persona).subscribe(
          persona => {
            this.usuarioInfo.persona = persona;
            this.empresarioService.updateEmpresario(idEmpresario, this.empresarioInfo).subscribe(data => {
              Swal.fire({
                title: '¡Información actualizada!',
                text: 'Tu información se ha actualizado correctamente',
                icon: "success"
              });
              this.router.navigate(['system/alumni/perfil']);
            })
          }
        )
      }
    });
  }

  initializeForm(): void {
    this.updatePersonForm.patchValue({
      primerNombre: this.usuarioInfo.persona?.primer_nombre,
      segundoNombre: this.usuarioInfo.persona?.segundo_nombre,
      primerApellido: this.usuarioInfo.persona?.apellido_paterno,
      segundoApellido: this.usuarioInfo.persona?.apellido_materno,
      cedula: this.usuarioInfo.persona?.cedula,
      telefono: this.usuarioInfo.persona?.telefono,
      fechaNacimiento: this.usuarioInfo.persona?.fechaNacimiento,
    });

  }

  getAllCitiesAndGraduate(): void {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      this.empresarioService.getEmpresarioById(userId).subscribe(data => { this.empresarioInfo = data })

    }
  }
}
