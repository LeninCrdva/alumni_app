import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  'userRole2': string;

  ngOnInit(): void {
    // Obtener el rol del localStorage
   // this.userRole2 = localStorage.getItem('userRole');
    console.log('Rol recibido en RegisterComponent:', localStorage.getItem('userRole'));
  }
}