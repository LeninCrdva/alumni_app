import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParametrosPreguntasComponent } from './parametros-preguntas/parametros-preguntas.component';
import { StateListComponent } from './state-list/state-list.component';
import { SectorEmpresarialCrudComponent } from '../admin/sector-empresarial-crud/sector-empresarial-crud.component';
import { CarrerasCrudComponent } from './carreras-crud/carreras-crud.component';
import { OfertaDetalleComponent } from './oferta-detalle/oferta-detalle.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { OfertasDeTrabajoComponent } from './ofertas-de-trabajo/ofertas-de-trabajo.component';
import { TitulosComponent } from './titulos/titulos.component';
import { ReferenciasPersonalesComponent } from './referencias-personales/referencias-personales.component';
import { ComunidadComponent } from './comunidad/comunidad.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { CapacitacionesComponent } from './capacitaciones/capacitaciones.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    // NOTE: PERFIL
    { path: 'perfil', component: PerfilUsuarioComponent },
    { path: 'update-perfil', component: PerfilFormComponent },
    { path: 'experiencia', component: ExperienciaComponent },
    { path: 'capacitaciones', component: CapacitacionesComponent },
    { path: 'titulos', component: TitulosComponent },
    { path: 'referencias-personales', component: ReferenciasPersonalesComponent },
    
    // NOTE: OFERTAS
    { path: 'postulaciones', component: PostulacionesComponent },
    { path: 'parametros-preguntas', component: ParametrosPreguntasComponent },
    { path: 'estados', component: StateListComponent },
    { path: 'carrera', component: CarrerasCrudComponent },
    { path: 'sector-empresarial', component: SectorEmpresarialCrudComponent },
    { path: 'oferta-detalle', component: OfertaDetalleComponent },
    { path: 'ofertas-trabajo', component: OfertasDeTrabajoComponent },
    // NOTE: COMUNIDAD
    { path: 'comunidad', component: ComunidadComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AlumniRoutingModule { }