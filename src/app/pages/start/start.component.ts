import { Component, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';
import { AnimationItem } from 'lottie-web';
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

  // Note: Animaciones
  options_Anim1: AnimationOptions = {
    path: '../../../assets/anims/Anim_1.json',
  };

  options_Anim2: AnimationOptions = {
    path: '../../../assets/anims/Anim_2.json',
  };
  options_Anim3: AnimationOptions = {
    path: '../../../assets/anims/Anim_3.json',
  };


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const header = this.el.nativeElement.querySelector('header');
    if (window.scrollY > 0) {
      this.renderer.addClass(header, 'abajo');
    } else {
      this.renderer.removeClass(header, 'abajo');
    }

    this.handleScroll();
  }

  private handleScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    sections.forEach(sec => {
      const top = window.scrollY;
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(links => {
          this.renderer.removeClass(links, 'active');
          const activeLink = this.el.nativeElement.querySelector(`header nav a[href*=${id}]`);
          this.renderer.addClass(activeLink, 'active');
        });
      }
    });
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

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnInit(): void {
    this.toggleMenu('.navbar', '#menu-icon');
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