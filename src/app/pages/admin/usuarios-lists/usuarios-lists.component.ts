import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../data/service/AuthService';
import { UserService } from '../../../data/service/UserService';
import { Usuario } from '../../../data/model/usuario';
import { UserDTO } from '../../../data/model/UserDTO';
import { Persona } from '../../../data/model/persona';
import { PersonaService } from '../../../data/service/PersonService';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-usuarios-lists',
  templateUrl: './usuarios-lists.component.html',
  styleUrls: ['./usuarios-lists.component.css', '../../../../assets/prefabs/headers.css']
})
export class UsuariosListsComponent implements OnInit {

  ngOnInit(): void {
    this.getAllUsers();
  }

  constructor(
    private userService: UserService,
    private personService: PersonaService,
    private sanitizer: DomSanitizer,
  ) {
  };

  usersList: UserDTO[] = [];
  usuarioDTO: UserDTO = new UserDTO();

  person: Persona = new Persona();

  editarClicked = false;
  public previsualizacion?: string;
  public archivos: any = []

  onEditarClick(): void {
    this.editarClicked = true;
  }

  onRegistrarClick(): void {
    this.editarClicked = false;
  }

  datos: any[] = [
    { id: 1, nombre: 'Ejemplo 1', descripcion: 'Descripción 1' },
    { id: 2, nombre: 'Ejemplo 2', descripcion: 'Descripción 2' },
    { id: 0, nombre: 'Ejemplo 0', descripcion: 'Descripción 0' },

    // Agrega más datos según sea necesario
  ];

  sortByName() {
    this.datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  sortByCountry() {
    this.datos.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
  }

  sortByAge() {
  }

  getAllUsers(): void {
    this.userService.getUsersDTO().subscribe(users => {
      this.usersList = users;
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

}
