
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { AdherentAdherentComponent } from './adherent-adherent/adherent-adherent.component';



    import { DemandeEstivageAdherentComponent } from './demande-estivage-adherent/demande-estivage-adherent.component';



    import { EtatReclamationAdherentComponent } from './etat-reclamation-adherent/etat-reclamation-adherent.component';



    import { EstivageAdherentComponent } from './estivage-adherent/estivage-adherent.component';



    import { VilleAdherentComponent } from './ville-adherent/ville-adherent.component';



    import { ProfilAdherentComponent } from './profil-adherent/profil-adherent.component';



    import { ConventionAdherentComponent } from './convention-adherent/convention-adherent.component';



    import { ImpressionCarteAdherentComponent } from './impression-carte-adherent/impression-carte-adherent.component';



    import { PieceJointeEstivageAdherentComponent } from './piece-jointe-estivage-adherent/piece-jointe-estivage-adherent.component';



    import { ProduitAdherentComponent } from './produit-adherent/produit-adherent.component';



    import { StatutAdherentComponent } from './statut-adherent/statut-adherent.component';



    import { EtatCarteAdherentComponent } from './etat-carte-adherent/etat-carte-adherent.component';



    import { RegionAdherentComponent } from './region-adherent/region-adherent.component';



    import { TacheAdherentComponent } from './tache-adherent/tache-adherent.component';



    import { ReclamationAdherentComponent } from './reclamation-adherent/reclamation-adherent.component';



    import { SituationModerateurAdherentComponent } from './situation-moderateur-adherent/situation-moderateur-adherent.component';



    import { EtatPrestationAdherentComponent } from './etat-prestation-adherent/etat-prestation-adherent.component';



    import { EnfantAdherentComponent } from './enfant-adherent/enfant-adherent.component';



    import { MissionAdherentComponent } from './mission-adherent/mission-adherent.component';



    import { PieceJointeMissionAdherentComponent } from './piece-jointe-mission-adherent/piece-jointe-mission-adherent.component';



    import { DemandeEstivageCentreAdherentComponent } from './demande-estivage-centre-adherent/demande-estivage-centre-adherent.component';



    import { NiveauImportanceAdherentComponent } from './niveau-importance-adherent/niveau-importance-adherent.component';



    import { ChercheurAdherentComponent } from './chercheur-adherent/chercheur-adherent.component';



    import { PieceJointeProduitAdherentComponent } from './piece-jointe-produit-adherent/piece-jointe-produit-adherent.component';



    import { ProjetAdherentComponent } from './projet-adherent/projet-adherent.component';



    import { PieceJointeConventionAdherentComponent } from './piece-jointe-convention-adherent/piece-jointe-convention-adherent.component';



    import { EchelonAdherentComponent } from './echelon-adherent/echelon-adherent.component';



    import { PrestationAdherentComponent } from './prestation-adherent/prestation-adherent.component';



    import { PieceJointeProjetAdherentComponent } from './piece-jointe-projet-adherent/piece-jointe-projet-adherent.component';



    import { PieceJointeReclamationAdherentComponent } from './piece-jointe-reclamation-adherent/piece-jointe-reclamation-adherent.component';



    import { EchelleAdherentComponent } from './echelle-adherent/echelle-adherent.component';



    import { TypePrestationAdherentComponent } from './type-prestation-adherent/type-prestation-adherent.component';



    import { OrganismeAdherentComponent } from './organisme-adherent/organisme-adherent.component';



    import { EtatTacheAdherentComponent } from './etat-tache-adherent/etat-tache-adherent.component';



    import { ConjointAdherentComponent } from './conjoint-adherent/conjoint-adherent.component';



    import { PieceJointeRendezVousAdherentComponent } from './piece-jointe-rendez-vous-adherent/piece-jointe-rendez-vous-adherent.component';



    import { PieceJointePrestationAdherentComponent } from './piece-jointe-prestation-adherent/piece-jointe-prestation-adherent.component';



    import { CentreEstivageAdherentComponent } from './centre-estivage-adherent/centre-estivage-adherent.component';



    import { PieceJointeAdherentAdherentComponent } from './piece-jointe-adherent-adherent/piece-jointe-adherent-adherent.component';



    import { GestionReclamationAdherentComponent } from './gestion-reclamation-adherent/gestion-reclamation-adherent.component';



    import { FonctionAdherentComponent } from './fonction-adherent/fonction-adherent.component';



    import { EtatDemandeEstivageAdherentComponent } from './etat-demande-estivage-adherent/etat-demande-estivage-adherent.component';



    import { GradeAdherentComponent } from './grade-adherent/grade-adherent.component';



    import { EstivageCentreEstivageAdherentComponent } from './estivage-centre-estivage-adherent/estivage-centre-estivage-adherent.component';



    import { EtatProjetAdherentComponent } from './etat-projet-adherent/etat-projet-adherent.component';



    import { QualiteAdherentComponent } from './qualite-adherent/qualite-adherent.component';



    import { RendezVousAdherentComponent } from './rendez-vous-adherent/rendez-vous-adherent.component';



    import { ModerateurAdherentComponent } from './moderateur-adherent/moderateur-adherent.component';


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
                                    component: AdherentAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeEstivageAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatReclamationAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EstivageAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'ville',
                            children: [
                                {
                                    path: 'list',
                                    component: VilleAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'profil',
                            children: [
                                {
                                    path: 'list',
                                    component: ProfilAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'convention',
                            children: [
                                {
                                    path: 'list',
                                    component: ConventionAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'impression-carte',
                            children: [
                                {
                                    path: 'list',
                                    component: ImpressionCarteAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeEstivageAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'produit',
                            children: [
                                {
                                    path: 'list',
                                    component: ProduitAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'statut',
                            children: [
                                {
                                    path: 'list',
                                    component: StatutAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-carte',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatCarteAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'region',
                            children: [
                                {
                                    path: 'list',
                                    component: RegionAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tache',
                            children: [
                                {
                                    path: 'list',
                                    component: TacheAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: ReclamationAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'situation-moderateur',
                            children: [
                                {
                                    path: 'list',
                                    component: SituationModerateurAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPrestationAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'enfant',
                            children: [
                                {
                                    path: 'list',
                                    component: EnfantAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'mission',
                            children: [
                                {
                                    path: 'list',
                                    component: MissionAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-mission',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeMissionAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-estivage-centre',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeEstivageCentreAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'niveau-importance',
                            children: [
                                {
                                    path: 'list',
                                    component: NiveauImportanceAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-produit',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeProduitAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'projet',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-convention',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeConventionAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'echelon',
                            children: [
                                {
                                    path: 'list',
                                    component: EchelonAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: PrestationAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeProjetAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeReclamationAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'echelle',
                            children: [
                                {
                                    path: 'list',
                                    component: EchelleAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: TypePrestationAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'organisme',
                            children: [
                                {
                                    path: 'list',
                                    component: OrganismeAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-tache',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatTacheAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'conjoint',
                            children: [
                                {
                                    path: 'list',
                                    component: ConjointAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-rendez-vous',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeRendezVousAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointePrestationAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'centre-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: CentreEstivageAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-adherent',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeAdherentAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'gestion-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: GestionReclamationAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'fonction',
                            children: [
                                {
                                    path: 'list',
                                    component: FonctionAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-demande-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDemandeEstivageAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'grade',
                            children: [
                                {
                                    path: 'list',
                                    component: GradeAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'estivage-centre-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EstivageCentreEstivageAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatProjetAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'qualite',
                            children: [
                                {
                                    path: 'list',
                                    component: QualiteAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'rendez-vous',
                            children: [
                                {
                                    path: 'list',
                                    component: RendezVousAdherentComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'moderateur',
                            children: [
                                {
                                    path: 'list',
                                    component: ModerateurAdherentComponent ,
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
export class FondationAdherentRoutingModule { }
