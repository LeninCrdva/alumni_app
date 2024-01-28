import { BsModalService, BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { Component, ElementRef, Renderer2, OnInit,Input } from '@angular/core';
import { UserService} from '../../data/service/UserService'
import { AssetService } from '../../data/service/Asset.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NuevoAdministradorModalComponent } from '../../pages/admin/nuevo-administrador-modal/nuevo-administrador-modal.component';
import { AdministradorService } from '../../data/service/administrador.service';
import { Administrador } from '../../data/model/administrador';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-layout-system',
  templateUrl: './layout-system.component.html',
  styleUrls: ['./layout-system.component.css']
})
export class LayoutSystemComponent implements OnInit {
  showAdminOptions = false;
  showEmpresarioOptions = false;
  showAlumniOptions = false;
  nuevoAdministrador: Administrador = new Administrador();
    activeMenuItem: string = 'Dashboard';

    rolType: string = '';
    activeDropdown: string | null = null;
    name: string | null = localStorage.getItem('name');
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
 //modal 

  constructor(private sanitizer: DomSanitizer,
    private assetService: AssetService,
    private el: ElementRef, 
    private renderer: Renderer2, private usuarioService: UserService,
    private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private router: Router,
    private administradorService: AdministradorService,) { }

  ngOnInit() {
    // NOTE: START SLIDER BAR
    this.setupSidebarDropdown();
    this.setupSidebarCollapse();
    this.setupProfileDropdown();
    this.loadUserDataByUsername();
    // NOTE: END SLIDER BAR
    this.cerrarSesion();
    this.checkUserRole();
  }
  loadUserDataByUsername() {
    const username = localStorage.getItem('name');  // Obtén el nombre de usuario de donde lo tengas guardado
    if (username) {
      this.usuarioService.getUserByUsername(username).subscribe(
        (response) => {

          //console.log('Datos del usuario por nombre:', response);
          localStorage.setItem('user_data', JSON.stringify(response));
          localStorage.setItem('url_imagen', response.url_imagen);
          localStorage.setItem('ruta_imagen', response.ruta_imagen);
          const storedRutaImagen = localStorage.getItem('ruta_imagen');
          const storedUrlImagen = localStorage.getItem('url_imagen');
          if (storedRutaImagen && storedUrlImagen) {
            this.rutaimagen = storedRutaImagen;
            this.urlImage = storedUrlImagen;
          } else {
            // Manejar el caso en el que la información no esté disponible en localStorage
            console.error('La información de imagen no está disponible en localStorage.');
          }
         
         // console.log('lo que se guardo en cache',localStorage.getItem('user_data'));

        },
        (error) => {
          console.error('Error al obtener datos del usuario por nombre:', error);
          // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
        }
      );
    }
  }

  setActiveMenuItem(menuItem: string): void {
    this.activeMenuItem = menuItem;
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
  
  deleteFile(rutakey: string) {
    this.assetService.delete(rutakey).subscribe(r => {
      console.log("archivo eliminado")
    })
  }



  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }
  cerrarSesion() {
    setTimeout(() => {
      Swal.fire({
        icon: 'info',
        title: 'Sesión Expirada',
        text: 'Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        localStorage.clear();
        this.router.navigate(['/inicio-sesion']);
      });
    }, 3600000);
  }
  cerrarSesionconclick() {
    Swal.fire({
      icon: 'info',
      title: 'Sesión Cerrada',
      text: 'Has cerrado sesión correctamente.',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      localStorage.clear();
      this.router.navigate(['/inicio-sesion']);
    });
  }
  
  
  
    private checkUserRole() {
      const userRole = localStorage.getItem('userRole');
      console.log(userRole);
      if (userRole == 'ROL_ADMINISTRADOR') {
        this.showAdminOptions = true;
        this.rolType = 'Admin';
        
        this.administradorService.checkAdministradorExists(this.nuevoAdministrador.usuario).subscribe(
          (exists) => {
            if (!exists) {
            
              const config = {
                initialState: {
                  nuevoAdministrador: this.nuevoAdministrador,
                },
                ignoreBackdropClick: true,  
                keyboard: false,  
              };
              this.bsModalRef = this.modalService.show(NuevoAdministradorModalComponent, config);
  
             
              this.bsModalRef.content.onClose.subscribe((result: string) => {
                if (result === 'guardadoExitoso') {
                  console.log('Guardado exitoso, puedes realizar acciones adicionales si es necesario.');
                }
              });
            } else {
              console.error('Ya existe un administrador con este nombre. Elige otro nombre.');
            }
          },
          (error) => {
            console.error('Error al verificar la existencia del administrador:', error);
          }
        );
      

      }
      else{
        if(userRole=='ROL_EMPRESARIO'){
        
          this.showEmpresarioOptions = true;
          this.rolType='Empresario';

        }
        else{
          if(userRole=='ROL_GRADUADO'){
            this.showAlumniOptions = true;
            this.rolType='Alumni';
            
          }
        }
      }
      
      // !Terminar de implementar
      // this.showAdminOptions = authorities.includes('ROL_ADMINISTRADOR');
      // this.showEmpresarioOptions = authorities.includes('ROL_EMPRESARIO');
      // this.showAlumniOptions = authorities.includes('ROL_GRADUADO');
    }

    // NOTE: SLIDER BAR

    private setupSidebarDropdown() {
      const allDropdown = this.el.nativeElement.querySelectorAll('#sidebar .side-dropdown');
      const sidebar = this.el.nativeElement.querySelector('#sidebar');

      allDropdown.forEach((item: any) => {
        const a = item.parentElement.querySelector('a:first-child');
        this.renderer.listen(a, 'click', (event) => {
          event.preventDefault();

          if (!a.classList.contains('active')) {
            allDropdown.forEach((i: any) => {
              const aLink = i.parentElement.querySelector('a:first-child');
              aLink.classList.remove('active');
              i.classList.remove('show');
            });
          }

          a.classList.toggle('active');
          item.classList.toggle('show');
        });
      });
    }

    private setupSidebarCollapse() {
      const toggleSidebar = this.el.nativeElement.querySelector('nav .toggle-sidebar');
      const allSideDivider = this.el.nativeElement.querySelectorAll('#sidebar .divider');
      const sidebar = this.el.nativeElement.querySelector('#sidebar');
      const allDropdown = this.el.nativeElement.querySelectorAll('#sidebar .side-dropdown');

      if (sidebar.classList.contains('hide')) {
        allSideDivider.forEach((item: any) => {
          item.textContent = '-';
        });

        allDropdown.forEach((item: any) => {
          const a = item.parentElement.querySelector('a:first-child');
          a.classList.remove('active');
          item.classList.remove('show');
        });
      } else {
        allSideDivider.forEach((item: any) => {
          item.textContent = item.dataset.text;
        });
      }

      this.renderer.listen(toggleSidebar, 'click', () => {
        sidebar.classList.toggle('hide');

        if (sidebar.classList.contains('hide')) {
          allSideDivider.forEach((item: any) => {
            item.textContent = '-';
          });

          allDropdown.forEach((item: any) => {
            const a = item.parentElement.querySelector('a:first-child');
            a.classList.remove('active');
            item.classList.remove('show');
          });
        } else {
          allSideDivider.forEach((item: any) => {
            item.textContent = item.dataset.text;
          });
        }
      });

      this.renderer.listen(sidebar, 'mouseleave', () => {
        if (sidebar.classList.contains('hide')) {
          allDropdown.forEach((item: any) => {
            const a = item.parentElement.querySelector('a:first-child');
            a.classList.remove('active');
            item.classList.remove('show');
          });
          allSideDivider.forEach((item: any) => {
            item.textContent = '-';
          });
        }
      });

      this.renderer.listen(sidebar, 'mouseenter', () => {
        if (sidebar.classList.contains('hide')) {
          allDropdown.forEach((item: any) => {
            const a = item.parentElement.querySelector('a:first-child');
            a.classList.remove('active');
            item.classList.remove('show');
          });
          allSideDivider.forEach((item: any) => {
            item.textContent = item.dataset.text;
          });
        }
      });
    }

    private setupProfileDropdown() {
      const profile = this.el.nativeElement.querySelector('nav .profile');
      const imgProfile = profile.querySelector('img');
      const aProfile = profile.querySelector('a');

      this.renderer.listen(imgProfile, 'click', () => {
        this.toggleDropdown();
      });

      this.renderer.listen(aProfile, 'click', (event) => {
        event.preventDefault();
        this.toggleDropdown();
      });
    }

    private toggleDropdown() {
      const dropdownProfile = this.el.nativeElement.querySelector('nav .profile-link');
      dropdownProfile.classList.toggle('show');
    }
  }
