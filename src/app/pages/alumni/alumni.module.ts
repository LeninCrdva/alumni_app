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

@NgModule({
    declarations: [
        DashboardComponent,
        ParametrosPreguntasComponent,
        StateListComponent,
        CarrerasCrudComponent,
        SectorEmpresarialCrudComponent,
        OfertaDetalleComponent,
        PerfilUsuarioComponent,
        PerfilFormComponent
    ],
    imports: [
        CommonModule,
        AlumniRoutingModule,
    ]
})

export class AlumniModule { }
