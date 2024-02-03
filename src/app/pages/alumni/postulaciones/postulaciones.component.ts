import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraduadoService } from '../../../data/service/graduado.service';
import { ofertaLaboral } from '../../../data/model/ofertaLaboral';
import { GraduadoDTO } from '../../../data/model/DTO/GraduadoDTO';
import Swal from 'sweetalert2';
import { ofertaLaboralDTO } from '../../../Models/ofertaLaboralDTO';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css', '../../../../assets/prefabs/headers.css']
})
export class PostulacionesComponent implements OnInit {
  postulaciones: ofertaLaboral[] = [];
  graduadoDTO: GraduadoDTO = new GraduadoDTO();

  constructor(private postulacionesService: GraduadoService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.detallarOferta();
  }

  async detallarOferta(): Promise<void> {

    const authoritieStorage = localStorage.getItem('authorities')

    if (authoritieStorage) {
      const parsedData = JSON.parse(authoritieStorage);

      if (Array.isArray(parsedData) && parsedData.includes('ROL_GRADUADO')) {
        const userIdStorage = localStorage.getItem('name')
        if (userIdStorage) {
          this.postulaciones = (await this.postulacionesService.getOfertasLaboralesByUsername(userIdStorage).toPromise()) || [];
        }
        console.log('El usuario es graduado. Realizar acciones para graduados.');
      } else if (Array.isArray(parsedData) && parsedData.includes('ROL_EMPRESARIO')) {
        console.log('El usuario es empresario. Realizar acciones para empresarios.');
      } else {
        console.log('El usuario no tiene un rol específico.');
      }
    }
  }

  createGraduadoDTO(oferta: ofertaLaboral): GraduadoDTO {
    const nuevoGraduadoDTO: GraduadoDTO = new GraduadoDTO();
    nuevoGraduadoDTO.idOferta = [];

    if (oferta.id !== undefined) {
      nuevoGraduadoDTO.idOferta.push(oferta.id);
    } else {
      console.error("La oferta no tiene un ID definido.");
    }
    return nuevoGraduadoDTO;
  }

  cancelOffer(Offer: GraduadoDTO) {

    const idUser = localStorage.getItem('user_id');

    if (idUser) {
      this.postulacionesService.getGraduadoByUsuarioId(parseInt(idUser)).subscribe(
        grad => {
          this.graduadoDTO = grad;

          console.log('Valor de ID graduado', this.graduadoDTO);

          Swal.fire({
            title: "¿Realmente quiere cancelar esta postulación?",
            text: "Esta acción es irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, cancelar postulación!"
          }).then((result) => {
            if (result.isConfirmed && this.graduadoDTO?.id !== undefined) {
              this.postulacionesService.cancelOfferInGraduado(Offer, this.graduadoDTO.id).subscribe(
                grad => {
                  this.graduadoDTO = grad;
                  this.detallarOferta();
                  Swal.fire({
                    title: "¡Eliminado!",
                    text: "Se ha cancelado la postulación",
                    icon: "success"
                  });
                }
              );
              
            }
          });
        }
      );
    }
  }
}
