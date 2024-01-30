import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraduadoService } from '../../../data/service/graduado.service';
import { ofertaLaboral } from '../../../data/model/ofertaLaboral';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css', '../../../../assets/prefabs/headers.css']
})
export class PostulacionesComponent implements OnInit {
  postulaciones: ofertaLaboral[] = [];
  
  
  constructor(private postulacionesService:GraduadoService, private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.detallarOferta();
  }

  async detallarOferta(): Promise<void> {

    const authoritieStorage = localStorage.getItem('authorities')

    if (authoritieStorage) {
      const parsedData = JSON.parse(authoritieStorage);
    
      // Verificar si el usuario tiene el rol 'graduado'
      if (Array.isArray(parsedData) && parsedData.includes('ROL_GRADUADO')) {
        const userIdStorage = localStorage.getItem('name')
        if(userIdStorage) {
          console.log(localStorage.getItem('name'))
          this.postulaciones = (await this.postulacionesService.getOfertasLaboralesByUsername(userIdStorage).toPromise()) || [];
        }
        console.log('El usuario es graduado. Realizar acciones para graduados.');
      } else if (Array.isArray(parsedData) && parsedData.includes('ROL_EMPRESARIO')) {
        // El usuario tiene el rol 'empresario'
        // Puedes agregar lógica específica para 'empresario'
        console.log('El usuario es empresario. Realizar acciones para empresarios.');
      } else {
        console.log('El usuario no tiene un rol específico.');
      }
    }
  }
  
}
