
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { AdherentChercheurComponent } from './adherent-chercheur/adherent-chercheur.component';



    import { DemandeEstivageChercheurComponent } from './demande-estivage-chercheur/demande-estivage-chercheur.component';



    import { EtatReclamationChercheurComponent } from './etat-reclamation-chercheur/etat-reclamation-chercheur.component';



    import { EstivageChercheurComponent } from './estivage-chercheur/estivage-chercheur.component';



    import { VilleChercheurComponent } from './ville-chercheur/ville-chercheur.component';



    import { ProfilChercheurComponent } from './profil-chercheur/profil-chercheur.component';



    import { ConventionChercheurComponent } from './convention-chercheur/convention-chercheur.component';



    import { ImpressionCarteChercheurComponent } from './impression-carte-chercheur/impression-carte-chercheur.component';



    import { PieceJointeEstivageChercheurComponent } from './piece-jointe-estivage-chercheur/piece-jointe-estivage-chercheur.component';



    import { ProduitChercheurComponent } from './produit-chercheur/produit-chercheur.component';



    import { StatutChercheurComponent } from './statut-chercheur/statut-chercheur.component';



    import { EtatCarteChercheurComponent } from './etat-carte-chercheur/etat-carte-chercheur.component';



    import { RegionChercheurComponent } from './region-chercheur/region-chercheur.component';



    import { TacheChercheurComponent } from './tache-chercheur/tache-chercheur.component';



    import { ReclamationChercheurComponent } from './reclamation-chercheur/reclamation-chercheur.component';



    import { SituationModerateurChercheurComponent } from './situation-moderateur-chercheur/situation-moderateur-chercheur.component';



    import { EtatPrestationChercheurComponent } from './etat-prestation-chercheur/etat-prestation-chercheur.component';



    import { EnfantChercheurComponent } from './enfant-chercheur/enfant-chercheur.component';



    import { MissionChercheurComponent } from './mission-chercheur/mission-chercheur.component';



    import { PieceJointeMissionChercheurComponent } from './piece-jointe-mission-chercheur/piece-jointe-mission-chercheur.component';



    import { DemandeEstivageCentreChercheurComponent } from './demande-estivage-centre-chercheur/demande-estivage-centre-chercheur.component';



    import { NiveauImportanceChercheurComponent } from './niveau-importance-chercheur/niveau-importance-chercheur.component';



    import { ChercheurChercheurComponent } from './chercheur-chercheur/chercheur-chercheur.component';



    import { PieceJointeProduitChercheurComponent } from './piece-jointe-produit-chercheur/piece-jointe-produit-chercheur.component';



    import { ProjetChercheurComponent } from './projet-chercheur/projet-chercheur.component';



    import { PieceJointeConventionChercheurComponent } from './piece-jointe-convention-chercheur/piece-jointe-convention-chercheur.component';



    import { EchelonChercheurComponent } from './echelon-chercheur/echelon-chercheur.component';



    import { PrestationChercheurComponent } from './prestation-chercheur/prestation-chercheur.component';



    import { PieceJointeProjetChercheurComponent } from './piece-jointe-projet-chercheur/piece-jointe-projet-chercheur.component';



    import { PieceJointeReclamationChercheurComponent } from './piece-jointe-reclamation-chercheur/piece-jointe-reclamation-chercheur.component';



    import { EchelleChercheurComponent } from './echelle-chercheur/echelle-chercheur.component';



    import { TypePrestationChercheurComponent } from './type-prestation-chercheur/type-prestation-chercheur.component';



    import { OrganismeChercheurComponent } from './organisme-chercheur/organisme-chercheur.component';



    import { EtatTacheChercheurComponent } from './etat-tache-chercheur/etat-tache-chercheur.component';



    import { ConjointChercheurComponent } from './conjoint-chercheur/conjoint-chercheur.component';



    import { PieceJointeRendezVousChercheurComponent } from './piece-jointe-rendez-vous-chercheur/piece-jointe-rendez-vous-chercheur.component';



    import { PieceJointePrestationChercheurComponent } from './piece-jointe-prestation-chercheur/piece-jointe-prestation-chercheur.component';



    import { CentreEstivageChercheurComponent } from './centre-estivage-chercheur/centre-estivage-chercheur.component';



    import { PieceJointeAdherentChercheurComponent } from './piece-jointe-adherent-chercheur/piece-jointe-adherent-chercheur.component';



    import { GestionReclamationChercheurComponent } from './gestion-reclamation-chercheur/gestion-reclamation-chercheur.component';



    import { FonctionChercheurComponent } from './fonction-chercheur/fonction-chercheur.component';



    import { EtatDemandeEstivageChercheurComponent } from './etat-demande-estivage-chercheur/etat-demande-estivage-chercheur.component';



    import { GradeChercheurComponent } from './grade-chercheur/grade-chercheur.component';



    import { EstivageCentreEstivageChercheurComponent } from './estivage-centre-estivage-chercheur/estivage-centre-estivage-chercheur.component';



    import { EtatProjetChercheurComponent } from './etat-projet-chercheur/etat-projet-chercheur.component';



    import { QualiteChercheurComponent } from './qualite-chercheur/qualite-chercheur.component';



    import { RendezVousChercheurComponent } from './rendez-vous-chercheur/rendez-vous-chercheur.component';



    import { ModerateurChercheurComponent } from './moderateur-chercheur/moderateur-chercheur.component';


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
                                    component: AdherentChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeEstivageChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatReclamationChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EstivageChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'ville',
                            children: [
                                {
                                    path: 'list',
                                    component: VilleChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'profil',
                            children: [
                                {
                                    path: 'list',
                                    component: ProfilChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'convention',
                            children: [
                                {
                                    path: 'list',
                                    component: ConventionChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'impression-carte',
                            children: [
                                {
                                    path: 'list',
                                    component: ImpressionCarteChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeEstivageChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'produit',
                            children: [
                                {
                                    path: 'list',
                                    component: ProduitChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'statut',
                            children: [
                                {
                                    path: 'list',
                                    component: StatutChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-carte',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatCarteChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'region',
                            children: [
                                {
                                    path: 'list',
                                    component: RegionChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tache',
                            children: [
                                {
                                    path: 'list',
                                    component: TacheChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: ReclamationChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'situation-moderateur',
                            children: [
                                {
                                    path: 'list',
                                    component: SituationModerateurChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPrestationChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'enfant',
                            children: [
                                {
                                    path: 'list',
                                    component: EnfantChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'mission',
                            children: [
                                {
                                    path: 'list',
                                    component: MissionChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-mission',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeMissionChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-estivage-centre',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeEstivageCentreChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'niveau-importance',
                            children: [
                                {
                                    path: 'list',
                                    component: NiveauImportanceChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-produit',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeProduitChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'projet',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-convention',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeConventionChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'echelon',
                            children: [
                                {
                                    path: 'list',
                                    component: EchelonChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: PrestationChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeProjetChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeReclamationChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'echelle',
                            children: [
                                {
                                    path: 'list',
                                    component: EchelleChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: TypePrestationChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'organisme',
                            children: [
                                {
                                    path: 'list',
                                    component: OrganismeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-tache',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatTacheChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'conjoint',
                            children: [
                                {
                                    path: 'list',
                                    component: ConjointChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-rendez-vous',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeRendezVousChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointePrestationChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'centre-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: CentreEstivageChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-adherent',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeAdherentChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'gestion-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: GestionReclamationChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'fonction',
                            children: [
                                {
                                    path: 'list',
                                    component: FonctionChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-demande-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDemandeEstivageChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'grade',
                            children: [
                                {
                                    path: 'list',
                                    component: GradeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'estivage-centre-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EstivageCentreEstivageChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatProjetChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'qualite',
                            children: [
                                {
                                    path: 'list',
                                    component: QualiteChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'rendez-vous',
                            children: [
                                {
                                    path: 'list',
                                    component: RendezVousChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'moderateur',
                            children: [
                                {
                                    path: 'list',
                                    component: ModerateurChercheurComponent ,
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
export class FondationChercheurRoutingModule { }
