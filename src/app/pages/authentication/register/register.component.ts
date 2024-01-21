import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from '../../../service/PersonService';
import { UserService } from '../../../service/UserService';
import { RolService } from '../../../service/rol.service';
import { AssetService } from '../../../service/Asset.service';
import { Persona } from '../../../Models/persona';  // Asegúrate de importar el modelo Persona
import { Usuario } from'../../../Models/usuario';  // Asegúrate de importar el modelo Usuario

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // Importa tus servicios aquí
  ) {
    this.registerForm = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      clave: ['', Validators.required],
      inputFoto: ['', Validators.required],  // Asegúrate de tener validación según tus necesidades
      nombreDelRol: [localStorage.getItem('userRole'), Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtener el rol del localStorage
    console.log('Rol recibido en RegisterComponent:', localStorage.getItem('userRole'));
  }

  register() {
    if (this.registerForm.valid) {
      // Aquí puedes manejar el envío de datos, por ejemplo:
      const formData = this.registerForm.value;
      console.log('Datos del formulario:', formData);
      // Puedes llamar a un servicio para enviar los datos al backend, etc.
    } else {
      // El formulario no es válido, puedes mostrar mensajes de error o hacer algo más.
      console.warn('El formulario no es válido.');
      // Mostrar mensajes de advertencia en la consola para cada campo inválido
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control != null && control.invalid) {
          console.warn(`Campo '${key}' tiene errores:`, control.errors);
        }
      });
    }
  }
  
  
}