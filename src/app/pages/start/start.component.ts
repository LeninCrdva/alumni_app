import { Component, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  private readonly ROL_ADMINISTRADOR = 'ROL_ADMINISTRADOR';
  private readonly ROL_EMPRESARIO = 'ROL_EMPRESARIO';
  private readonly ROL_GRADUADO = 'ROL_GRADUADO';
  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) { }
  
  options: AnimationOptions = {
    path: '../../assets/anims/Anim_1.json',
  };
  
  ngOnInit(): void {
    this.toggleMenu('.navbar', '#menu-icon');
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const header = this.el.nativeElement.querySelector('header');
    if (window.scrollY > 0) {
      this.renderer.addClass(header, 'abajo');
    } else {
      this.renderer.removeClass(header, 'abajo');
    }
  }
  loginAsAdmin(): void {
    localStorage.setItem('userRole', this.ROL_ADMINISTRADOR);
    this.router.navigate(['/account/login']);
  }
  loginAsEmpresario(): void {
    localStorage.setItem('userRole', this.ROL_EMPRESARIO);
    this.router.navigate(['/account/login']);
  }

  loginAsGraduado(): void {
    localStorage.setItem('userRole', this.ROL_GRADUADO);
    this.router.navigate(['/account/login']);
  }
  private navigateToRegister(): void {
    this.router.navigate(['/register'], { queryParams: { role: localStorage.getItem('userRole') } });
  }

  private toggleMenu(navId: string, burgerId: string): void {
    const nav = this.el.nativeElement.querySelector(navId);
    const burgerBtn = this.el.nativeElement.querySelector(burgerId);
    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('show-icon');
      nav.classList.toggle('open');
    });
  }

}