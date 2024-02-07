import { Component, Renderer2, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Usuario } from '../../../data/model/usuario';
import { UserService } from '../../../data/service/UserService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../../data/service/PersonService';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CiudadDTO } from '../../../data/model/DTO/ciudadDTO';
import { CiudadService } from '../../../data/service/ciudad.service';
import { GraduadoDTO } from '../../../data/model/DTO/GraduadoDTO';
import { GraduadoService } from '../../../data/service/graduado.service';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css', '../../../../assets/prefabs/headers.css']
})
export class PerfilFormComponent implements AfterViewInit, OnInit {
  usuarioInfo: Usuario = new Usuario();
  graduadoInfo: GraduadoDTO = new GraduadoDTO();
  updatePersonForm: FormGroup;
  updateUbicacionForm: FormGroup;
  ciudades: CiudadDTO[] = []
  provincias: string[] = [];

  constructor(private renderer: Renderer2, private el: ElementRef, private userService: UserService,
    private formBuilder: FormBuilder, private personaService: PersonaService, private router: Router, private ciudadService: CiudadService, private graduateService: GraduadoService) {
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
    this.getAllInfoGraduate()
    this.getGraduadoDTOInfoAndCity()
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
        user => {
          this.usuarioInfo = user;
          this.initializePersonForm()
        }
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
        const ciudadSeleccionada = this.updateUbicacionForm.get('ciudad')?.value;
        const idUser = this.usuarioInfo.persona.id
        const idGraduado = this.graduadoInfo.id

        this.usuarioInfo.persona = {
          cedula: formDataPerson.cedula,
          primer_nombre: formDataPerson.primerNombre,
          segundo_nombre: formDataPerson.segundoNombre,
          fechaNacimiento: formDataPerson.fechaNacimiento,
          telefono: formDataPerson.telefono,
          apellido_paterno: formDataPerson.primerApellido,
          apellido_materno: formDataPerson.segundoApellido
        }

        this.graduadoInfo.ciudad = ciudadSeleccionada;

        this.personaService.updatePerson(idUser, this.usuarioInfo.persona).subscribe(
          persona => {
            this.usuarioInfo.persona = persona;
            this.graduateService.updateGraduadoDTO(idGraduado, this.graduadoInfo).subscribe(data => {
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

  initializePersonForm(): void {
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

  initializeCityForm(): void {
    
    this.updateUbicacionForm.patchValue({
      ciudad: this.graduadoInfo.ciudad
    });

    this.onCiudadChange();
  }

  getGraduadoDTOInfoAndCity(): void {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      this.ciudadService.getCiudadesDTO().subscribe(data => {
        this.ciudades = data;
        this.graduateService.getGraduadoDTOByUserId(parseInt(userId)).subscribe(data => {
          this.graduadoInfo = data;
          this.initializeCityForm();
        })
      })
    }
  }

  onCiudadChange(): void {
    const ciudadSeleccionada = this.updateUbicacionForm.get('ciudad')?.value;

    this.provincias = this.ciudades
      .filter(ciudad => ciudad.nombre === ciudadSeleccionada)
      .map(ciudad => ciudad.provincia);

    this.updateUbicacionForm.get('provincia')?.setValue(this.provincias[0]);
  }
}