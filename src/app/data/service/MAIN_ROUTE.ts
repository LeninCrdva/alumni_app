import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MAIN_ROUTE {

  //static API_ENDPOINT = 'http://localhost:5000';
  //static API_ENDPOINT = ''http://alumnibacked23-env-43.eba-gemair7x.us-east-1.elasticbeanstalk.com'; <-- Esta es la URL de la API en AWS
  static API_ENDPOINT = 'http://localhost:8080';
}