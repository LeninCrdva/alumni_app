import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumniRoutingModule } from './alumni-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParametrosPreguntasComponent } from './parametros-preguntas/parametros-preguntas.component';
import { StateListComponent } from './state-list/state-list.component';
import { CarrerasCrudComponent } from './carreras-crud/carreras-crud.component';
import { SectorEmpresarialCrudComponent } from '../admin/sector-empresarial-crud/sector-empresarial-crud.component';
import { OfertaDetalleComponent } from './oferta-detalle/oferta-detalle.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { CapacitacionesComponent } from './capacitaciones/capacitaciones.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { TitulosComponent } from './titulos/titulos.component';
import { ReferenciasPersonalesComponent } from './referencias-personales/referencias-personales.component';
import { OfertasDeTrabajoComponent } from './ofertas-de-trabajo/ofertas-de-trabajo.component';
import { ComunidadComponent } from './comunidad/comunidad.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ParametrosPreguntasComponent,
        StateListComponent,
        CarrerasCrudComponent,
        SectorEmpresarialCrudComponent,
        OfertaDetalleComponent,
        PerfilUsuarioComponent,
        PerfilFormComponent,
        CapacitacionesComponent,
        ExperienciaComponent,
        TitulosComponent,
        ReferenciasPersonalesComponent,
        OfertasDeTrabajoComponent,
        ComunidadComponent
    ],
    imports: [
        CommonModule,
        AlumniRoutingModule,
    ]
})

export class AlumniModule { }
