  import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

  @Component({
    selector: 'app-layout-system',
    templateUrl: './layout-system.component.html',
    styleUrls: ['./layout-system.component.css']
  })
  export class LayoutSystemComponent implements OnInit {
    showAdminOptions = false;
    showEmpresarioOptions = true;
    showAlumniOptions = false;

    activeMenuItem: string = 'Dashboard';

    rolType: string = '';
    activeDropdown: string | null = null;
    name: string | null = localStorage.getItem('name');

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
      // NOTE: START SLIDER BAR
      this.setupSidebarDropdown();
      this.setupSidebarCollapse();
      this.setupProfileDropdown();
      // NOTE: END SLIDER BAR
      //this.checkUserRole();
    }

    setActiveMenuItem(menuItem: string): void {
      this.activeMenuItem = menuItem;
    }
  
    private checkUserRole() {
      const userRole = localStorage.getItem('userRole');
      console.log(userRole);
      if(userRole=='ROL_ADMINISTRADOR'){
        this.showAdminOptions = true;
        this.rolType='Admin';
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
