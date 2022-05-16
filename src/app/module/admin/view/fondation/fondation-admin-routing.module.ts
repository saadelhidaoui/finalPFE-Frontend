
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { AdherentAdminComponent } from './adherent-admin/adherent-admin.component';



    import { DemandeEstivageAdminComponent } from './demande-estivage-admin/demande-estivage-admin.component';



    import { EtatReclamationAdminComponent } from './etat-reclamation-admin/etat-reclamation-admin.component';



    import { EstivageAdminComponent } from './estivage-admin/estivage-admin.component';



    import { VilleAdminComponent } from './ville-admin/ville-admin.component';



    import { ProfilAdminComponent } from './profil-admin/profil-admin.component';



    import { ConventionAdminComponent } from './convention-admin/convention-admin.component';



    import { ImpressionCarteAdminComponent } from './impression-carte-admin/impression-carte-admin.component';



    import { PieceJointeEstivageAdminComponent } from './piece-jointe-estivage-admin/piece-jointe-estivage-admin.component';



    import { ProduitAdminComponent } from './produit-admin/produit-admin.component';



    import { StatutAdminComponent } from './statut-admin/statut-admin.component';



    import { EtatCarteAdminComponent } from './etat-carte-admin/etat-carte-admin.component';



    import { RegionAdminComponent } from './region-admin/region-admin.component';



    import { TacheAdminComponent } from './tache-admin/tache-admin.component';



    import { ReclamationAdminComponent } from './reclamation-admin/reclamation-admin.component';



    import { SituationModerateurAdminComponent } from './situation-moderateur-admin/situation-moderateur-admin.component';



    import { EtatPrestationAdminComponent } from './etat-prestation-admin/etat-prestation-admin.component';



    import { EnfantAdminComponent } from './enfant-admin/enfant-admin.component';



    import { MissionAdminComponent } from './mission-admin/mission-admin.component';



    import { PieceJointeMissionAdminComponent } from './piece-jointe-mission-admin/piece-jointe-mission-admin.component';



    import { DemandeEstivageCentreAdminComponent } from './demande-estivage-centre-admin/demande-estivage-centre-admin.component';



    import { NiveauImportanceAdminComponent } from './niveau-importance-admin/niveau-importance-admin.component';



    import { ChercheurAdminComponent } from './chercheur-admin/chercheur-admin.component';



    import { PieceJointeProduitAdminComponent } from './piece-jointe-produit-admin/piece-jointe-produit-admin.component';



    import { ProjetAdminComponent } from './projet-admin/projet-admin.component';



    import { PieceJointeConventionAdminComponent } from './piece-jointe-convention-admin/piece-jointe-convention-admin.component';



    import { EchelonAdminComponent } from './echelon-admin/echelon-admin.component';



    import { PrestationAdminComponent } from './prestation-admin/prestation-admin.component';



    import { PieceJointeProjetAdminComponent } from './piece-jointe-projet-admin/piece-jointe-projet-admin.component';



    import { PieceJointeReclamationAdminComponent } from './piece-jointe-reclamation-admin/piece-jointe-reclamation-admin.component';



    import { EchelleAdminComponent } from './echelle-admin/echelle-admin.component';



    import { TypePrestationAdminComponent } from './type-prestation-admin/type-prestation-admin.component';



    import { OrganismeAdminComponent } from './organisme-admin/organisme-admin.component';



    import { EtatTacheAdminComponent } from './etat-tache-admin/etat-tache-admin.component';



    import { ConjointAdminComponent } from './conjoint-admin/conjoint-admin.component';



    import { PieceJointeRendezVousAdminComponent } from './piece-jointe-rendez-vous-admin/piece-jointe-rendez-vous-admin.component';



    import { PieceJointePrestationAdminComponent } from './piece-jointe-prestation-admin/piece-jointe-prestation-admin.component';



    import { CentreEstivageAdminComponent } from './centre-estivage-admin/centre-estivage-admin.component';



    import { PieceJointeAdherentAdminComponent } from './piece-jointe-adherent-admin/piece-jointe-adherent-admin.component';



    import { GestionReclamationAdminComponent } from './gestion-reclamation-admin/gestion-reclamation-admin.component';



    import { FonctionAdminComponent } from './fonction-admin/fonction-admin.component';



    import { EtatDemandeEstivageAdminComponent } from './etat-demande-estivage-admin/etat-demande-estivage-admin.component';



    import { GradeAdminComponent } from './grade-admin/grade-admin.component';



    import { EstivageCentreEstivageAdminComponent } from './estivage-centre-estivage-admin/estivage-centre-estivage-admin.component';



    import { EtatProjetAdminComponent } from './etat-projet-admin/etat-projet-admin.component';



    import { QualiteAdminComponent } from './qualite-admin/qualite-admin.component';



    import { RendezVousAdminComponent } from './rendez-vous-admin/rendez-vous-admin.component';



    import { ModerateurAdminComponent } from './moderateur-admin/moderateur-admin.component';


@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [


                        {

                            path: 'adherent',
                            children: [
                                {
                                    path: 'list',
                                    component: AdherentAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeEstivageAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatReclamationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EstivageAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'ville',
                            children: [
                                {
                                    path: 'list',
                                    component: VilleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'profil',
                            children: [
                                {
                                    path: 'list',
                                    component: ProfilAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'convention',
                            children: [
                                {
                                    path: 'list',
                                    component: ConventionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'impression-carte',
                            children: [
                                {
                                    path: 'list',
                                    component: ImpressionCarteAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeEstivageAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'produit',
                            children: [
                                {
                                    path: 'list',
                                    component: ProduitAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'statut',
                            children: [
                                {
                                    path: 'list',
                                    component: StatutAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-carte',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatCarteAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'region',
                            children: [
                                {
                                    path: 'list',
                                    component: RegionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tache',
                            children: [
                                {
                                    path: 'list',
                                    component: TacheAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: ReclamationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'situation-moderateur',
                            children: [
                                {
                                    path: 'list',
                                    component: SituationModerateurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPrestationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'enfant',
                            children: [
                                {
                                    path: 'list',
                                    component: EnfantAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'mission',
                            children: [
                                {
                                    path: 'list',
                                    component: MissionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-mission',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeMissionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-estivage-centre',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeEstivageCentreAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'niveau-importance',
                            children: [
                                {
                                    path: 'list',
                                    component: NiveauImportanceAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-produit',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeProduitAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'projet',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-convention',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeConventionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'echelon',
                            children: [
                                {
                                    path: 'list',
                                    component: EchelonAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: PrestationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeProjetAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeReclamationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'echelle',
                            children: [
                                {
                                    path: 'list',
                                    component: EchelleAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: TypePrestationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'organisme',
                            children: [
                                {
                                    path: 'list',
                                    component: OrganismeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-tache',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatTacheAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'conjoint',
                            children: [
                                {
                                    path: 'list',
                                    component: ConjointAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-rendez-vous',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeRendezVousAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointePrestationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'centre-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: CentreEstivageAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-adherent',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeAdherentAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'gestion-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: GestionReclamationAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'fonction',
                            children: [
                                {
                                    path: 'list',
                                    component: FonctionAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-demande-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDemandeEstivageAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'grade',
                            children: [
                                {
                                    path: 'list',
                                    component: GradeAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'estivage-centre-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EstivageCentreEstivageAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatProjetAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'qualite',
                            children: [
                                {
                                    path: 'list',
                                    component: QualiteAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'rendez-vous',
                            children: [
                                {
                                    path: 'list',
                                    component: RendezVousAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'moderateur',
                            children: [
                                {
                                    path: 'list',
                                    component: ModerateurAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class FondationAdminRoutingModule { }
