
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { AdherentModerateurComponent } from './adherent-moderateur/adherent-moderateur.component';



    import { DemandeEstivageModerateurComponent } from './demande-estivage-moderateur/demande-estivage-moderateur.component';



    import { EtatReclamationModerateurComponent } from './etat-reclamation-moderateur/etat-reclamation-moderateur.component';



    import { EstivageModerateurComponent } from './estivage-moderateur/estivage-moderateur.component';



    import { VilleModerateurComponent } from './ville-moderateur/ville-moderateur.component';



    import { ProfilModerateurComponent } from './profil-moderateur/profil-moderateur.component';



    import { ConventionModerateurComponent } from './convention-moderateur/convention-moderateur.component';



    import { ImpressionCarteModerateurComponent } from './impression-carte-moderateur/impression-carte-moderateur.component';



    import { PieceJointeEstivageModerateurComponent } from './piece-jointe-estivage-moderateur/piece-jointe-estivage-moderateur.component';



    import { ProduitModerateurComponent } from './produit-moderateur/produit-moderateur.component';



    import { StatutModerateurComponent } from './statut-moderateur/statut-moderateur.component';



    import { EtatCarteModerateurComponent } from './etat-carte-moderateur/etat-carte-moderateur.component';



    import { RegionModerateurComponent } from './region-moderateur/region-moderateur.component';



    import { TacheModerateurComponent } from './tache-moderateur/tache-moderateur.component';



    import { ReclamationModerateurComponent } from './reclamation-moderateur/reclamation-moderateur.component';



    import { SituationModerateurModerateurComponent } from './situation-moderateur-moderateur/situation-moderateur-moderateur.component';



    import { EtatPrestationModerateurComponent } from './etat-prestation-moderateur/etat-prestation-moderateur.component';



    import { EnfantModerateurComponent } from './enfant-moderateur/enfant-moderateur.component';



    import { MissionModerateurComponent } from './mission-moderateur/mission-moderateur.component';



    import { PieceJointeMissionModerateurComponent } from './piece-jointe-mission-moderateur/piece-jointe-mission-moderateur.component';



    import { DemandeEstivageCentreModerateurComponent } from './demande-estivage-centre-moderateur/demande-estivage-centre-moderateur.component';



    import { NiveauImportanceModerateurComponent } from './niveau-importance-moderateur/niveau-importance-moderateur.component';



    import { ChercheurModerateurComponent } from './chercheur-moderateur/chercheur-moderateur.component';



    import { PieceJointeProduitModerateurComponent } from './piece-jointe-produit-moderateur/piece-jointe-produit-moderateur.component';



    import { ProjetModerateurComponent } from './projet-moderateur/projet-moderateur.component';



    import { PieceJointeConventionModerateurComponent } from './piece-jointe-convention-moderateur/piece-jointe-convention-moderateur.component';



    import { EchelonModerateurComponent } from './echelon-moderateur/echelon-moderateur.component';



    import { PrestationModerateurComponent } from './prestation-moderateur/prestation-moderateur.component';



    import { PieceJointeProjetModerateurComponent } from './piece-jointe-projet-moderateur/piece-jointe-projet-moderateur.component';



    import { PieceJointeReclamationModerateurComponent } from './piece-jointe-reclamation-moderateur/piece-jointe-reclamation-moderateur.component';



    import { EchelleModerateurComponent } from './echelle-moderateur/echelle-moderateur.component';



    import { TypePrestationModerateurComponent } from './type-prestation-moderateur/type-prestation-moderateur.component';



    import { OrganismeModerateurComponent } from './organisme-moderateur/organisme-moderateur.component';



    import { EtatTacheModerateurComponent } from './etat-tache-moderateur/etat-tache-moderateur.component';



    import { ConjointModerateurComponent } from './conjoint-moderateur/conjoint-moderateur.component';



    import { PieceJointeRendezVousModerateurComponent } from './piece-jointe-rendez-vous-moderateur/piece-jointe-rendez-vous-moderateur.component';



    import { PieceJointePrestationModerateurComponent } from './piece-jointe-prestation-moderateur/piece-jointe-prestation-moderateur.component';



    import { CentreEstivageModerateurComponent } from './centre-estivage-moderateur/centre-estivage-moderateur.component';



    import { PieceJointeAdherentModerateurComponent } from './piece-jointe-adherent-moderateur/piece-jointe-adherent-moderateur.component';



    import { GestionReclamationModerateurComponent } from './gestion-reclamation-moderateur/gestion-reclamation-moderateur.component';



    import { FonctionModerateurComponent } from './fonction-moderateur/fonction-moderateur.component';



    import { EtatDemandeEstivageModerateurComponent } from './etat-demande-estivage-moderateur/etat-demande-estivage-moderateur.component';



    import { GradeModerateurComponent } from './grade-moderateur/grade-moderateur.component';



    import { EstivageCentreEstivageModerateurComponent } from './estivage-centre-estivage-moderateur/estivage-centre-estivage-moderateur.component';



    import { EtatProjetModerateurComponent } from './etat-projet-moderateur/etat-projet-moderateur.component';



    import { QualiteModerateurComponent } from './qualite-moderateur/qualite-moderateur.component';



    import { RendezVousModerateurComponent } from './rendez-vous-moderateur/rendez-vous-moderateur.component';



    import { ModerateurModerateurComponent } from './moderateur-moderateur/moderateur-moderateur.component';


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
                                    component: AdherentModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeEstivageModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatReclamationModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EstivageModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'ville',
                            children: [
                                {
                                    path: 'list',
                                    component: VilleModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'profil',
                            children: [
                                {
                                    path: 'list',
                                    component: ProfilModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'convention',
                            children: [
                                {
                                    path: 'list',
                                    component: ConventionModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'impression-carte',
                            children: [
                                {
                                    path: 'list',
                                    component: ImpressionCarteModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeEstivageModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'produit',
                            children: [
                                {
                                    path: 'list',
                                    component: ProduitModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'statut',
                            children: [
                                {
                                    path: 'list',
                                    component: StatutModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-carte',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatCarteModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'region',
                            children: [
                                {
                                    path: 'list',
                                    component: RegionModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'tache',
                            children: [
                                {
                                    path: 'list',
                                    component: TacheModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: ReclamationModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'situation-moderateur',
                            children: [
                                {
                                    path: 'list',
                                    component: SituationModerateurModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatPrestationModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'enfant',
                            children: [
                                {
                                    path: 'list',
                                    component: EnfantModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'mission',
                            children: [
                                {
                                    path: 'list',
                                    component: MissionModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-mission',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeMissionModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'demande-estivage-centre',
                            children: [
                                {
                                    path: 'list',
                                    component: DemandeEstivageCentreModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'niveau-importance',
                            children: [
                                {
                                    path: 'list',
                                    component: NiveauImportanceModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-produit',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeProduitModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'projet',
                            children: [
                                {
                                    path: 'list',
                                    component: ProjetModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-convention',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeConventionModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'echelon',
                            children: [
                                {
                                    path: 'list',
                                    component: EchelonModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: PrestationModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeProjetModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeReclamationModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'echelle',
                            children: [
                                {
                                    path: 'list',
                                    component: EchelleModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: TypePrestationModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'organisme',
                            children: [
                                {
                                    path: 'list',
                                    component: OrganismeModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-tache',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatTacheModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'conjoint',
                            children: [
                                {
                                    path: 'list',
                                    component: ConjointModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-rendez-vous',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeRendezVousModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-prestation',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointePrestationModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'centre-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: CentreEstivageModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'piece-jointe-adherent',
                            children: [
                                {
                                    path: 'list',
                                    component: PieceJointeAdherentModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'gestion-reclamation',
                            children: [
                                {
                                    path: 'list',
                                    component: GestionReclamationModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'fonction',
                            children: [
                                {
                                    path: 'list',
                                    component: FonctionModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-demande-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDemandeEstivageModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'grade',
                            children: [
                                {
                                    path: 'list',
                                    component: GradeModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'estivage-centre-estivage',
                            children: [
                                {
                                    path: 'list',
                                    component: EstivageCentreEstivageModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-projet',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatProjetModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'qualite',
                            children: [
                                {
                                    path: 'list',
                                    component: QualiteModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'rendez-vous',
                            children: [
                                {
                                    path: 'list',
                                    component: RendezVousModerateurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'moderateur',
                            children: [
                                {
                                    path: 'list',
                                    component: ModerateurModerateurComponent ,
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
export class FondationModerateurRoutingModule { }
