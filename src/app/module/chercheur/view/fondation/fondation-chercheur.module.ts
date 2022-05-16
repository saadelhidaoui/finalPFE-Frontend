import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import { MultiSelectModule } from 'primeng/multiselect';

import { AdherentCreateChercheurComponent } from './adherent-chercheur/create-chercheur/adherent-create-chercheur.component';
import { AdherentEditChercheurComponent } from './adherent-chercheur/edit-chercheur/adherent-edit-chercheur.component';
import { AdherentViewChercheurComponent } from './adherent-chercheur/view-chercheur/adherent-view-chercheur.component';
import { AdherentListChercheurComponent } from './adherent-chercheur/list-chercheur/adherent-list-chercheur.component';
import { AdherentChercheurComponent } from './adherent-chercheur/adherent-chercheur.component';
import { DemandeEstivageCreateChercheurComponent } from './demande-estivage-chercheur/create-chercheur/demande-estivage-create-chercheur.component';
import { DemandeEstivageEditChercheurComponent } from './demande-estivage-chercheur/edit-chercheur/demande-estivage-edit-chercheur.component';
import { DemandeEstivageViewChercheurComponent } from './demande-estivage-chercheur/view-chercheur/demande-estivage-view-chercheur.component';
import { DemandeEstivageListChercheurComponent } from './demande-estivage-chercheur/list-chercheur/demande-estivage-list-chercheur.component';
import { DemandeEstivageChercheurComponent } from './demande-estivage-chercheur/demande-estivage-chercheur.component';
import { EtatReclamationCreateChercheurComponent } from './etat-reclamation-chercheur/create-chercheur/etat-reclamation-create-chercheur.component';
import { EtatReclamationEditChercheurComponent } from './etat-reclamation-chercheur/edit-chercheur/etat-reclamation-edit-chercheur.component';
import { EtatReclamationViewChercheurComponent } from './etat-reclamation-chercheur/view-chercheur/etat-reclamation-view-chercheur.component';
import { EtatReclamationListChercheurComponent } from './etat-reclamation-chercheur/list-chercheur/etat-reclamation-list-chercheur.component';
import { EtatReclamationChercheurComponent } from './etat-reclamation-chercheur/etat-reclamation-chercheur.component';
import { EstivageCreateChercheurComponent } from './estivage-chercheur/create-chercheur/estivage-create-chercheur.component';
import { EstivageEditChercheurComponent } from './estivage-chercheur/edit-chercheur/estivage-edit-chercheur.component';
import { EstivageViewChercheurComponent } from './estivage-chercheur/view-chercheur/estivage-view-chercheur.component';
import { EstivageListChercheurComponent } from './estivage-chercheur/list-chercheur/estivage-list-chercheur.component';
import { EstivageChercheurComponent } from './estivage-chercheur/estivage-chercheur.component';
import { VilleCreateChercheurComponent } from './ville-chercheur/create-chercheur/ville-create-chercheur.component';
import { VilleEditChercheurComponent } from './ville-chercheur/edit-chercheur/ville-edit-chercheur.component';
import { VilleViewChercheurComponent } from './ville-chercheur/view-chercheur/ville-view-chercheur.component';
import { VilleListChercheurComponent } from './ville-chercheur/list-chercheur/ville-list-chercheur.component';
import { VilleChercheurComponent } from './ville-chercheur/ville-chercheur.component';
import { ProfilCreateChercheurComponent } from './profil-chercheur/create-chercheur/profil-create-chercheur.component';
import { ProfilEditChercheurComponent } from './profil-chercheur/edit-chercheur/profil-edit-chercheur.component';
import { ProfilViewChercheurComponent } from './profil-chercheur/view-chercheur/profil-view-chercheur.component';
import { ProfilListChercheurComponent } from './profil-chercheur/list-chercheur/profil-list-chercheur.component';
import { ProfilChercheurComponent } from './profil-chercheur/profil-chercheur.component';
import { ConventionCreateChercheurComponent } from './convention-chercheur/create-chercheur/convention-create-chercheur.component';
import { ConventionEditChercheurComponent } from './convention-chercheur/edit-chercheur/convention-edit-chercheur.component';
import { ConventionViewChercheurComponent } from './convention-chercheur/view-chercheur/convention-view-chercheur.component';
import { ConventionListChercheurComponent } from './convention-chercheur/list-chercheur/convention-list-chercheur.component';
import { ConventionChercheurComponent } from './convention-chercheur/convention-chercheur.component';
import { ImpressionCarteCreateChercheurComponent } from './impression-carte-chercheur/create-chercheur/impression-carte-create-chercheur.component';
import { ImpressionCarteEditChercheurComponent } from './impression-carte-chercheur/edit-chercheur/impression-carte-edit-chercheur.component';
import { ImpressionCarteViewChercheurComponent } from './impression-carte-chercheur/view-chercheur/impression-carte-view-chercheur.component';
import { ImpressionCarteListChercheurComponent } from './impression-carte-chercheur/list-chercheur/impression-carte-list-chercheur.component';
import { ImpressionCarteChercheurComponent } from './impression-carte-chercheur/impression-carte-chercheur.component';
import { PieceJointeEstivageCreateChercheurComponent } from './piece-jointe-estivage-chercheur/create-chercheur/piece-jointe-estivage-create-chercheur.component';
import { PieceJointeEstivageEditChercheurComponent } from './piece-jointe-estivage-chercheur/edit-chercheur/piece-jointe-estivage-edit-chercheur.component';
import { PieceJointeEstivageViewChercheurComponent } from './piece-jointe-estivage-chercheur/view-chercheur/piece-jointe-estivage-view-chercheur.component';
import { PieceJointeEstivageListChercheurComponent } from './piece-jointe-estivage-chercheur/list-chercheur/piece-jointe-estivage-list-chercheur.component';
import { PieceJointeEstivageChercheurComponent } from './piece-jointe-estivage-chercheur/piece-jointe-estivage-chercheur.component';
import { ProduitCreateChercheurComponent } from './produit-chercheur/create-chercheur/produit-create-chercheur.component';
import { ProduitEditChercheurComponent } from './produit-chercheur/edit-chercheur/produit-edit-chercheur.component';
import { ProduitViewChercheurComponent } from './produit-chercheur/view-chercheur/produit-view-chercheur.component';
import { ProduitListChercheurComponent } from './produit-chercheur/list-chercheur/produit-list-chercheur.component';
import { ProduitChercheurComponent } from './produit-chercheur/produit-chercheur.component';
import { StatutCreateChercheurComponent } from './statut-chercheur/create-chercheur/statut-create-chercheur.component';
import { StatutEditChercheurComponent } from './statut-chercheur/edit-chercheur/statut-edit-chercheur.component';
import { StatutViewChercheurComponent } from './statut-chercheur/view-chercheur/statut-view-chercheur.component';
import { StatutListChercheurComponent } from './statut-chercheur/list-chercheur/statut-list-chercheur.component';
import { StatutChercheurComponent } from './statut-chercheur/statut-chercheur.component';
import { EtatCarteCreateChercheurComponent } from './etat-carte-chercheur/create-chercheur/etat-carte-create-chercheur.component';
import { EtatCarteEditChercheurComponent } from './etat-carte-chercheur/edit-chercheur/etat-carte-edit-chercheur.component';
import { EtatCarteViewChercheurComponent } from './etat-carte-chercheur/view-chercheur/etat-carte-view-chercheur.component';
import { EtatCarteListChercheurComponent } from './etat-carte-chercheur/list-chercheur/etat-carte-list-chercheur.component';
import { EtatCarteChercheurComponent } from './etat-carte-chercheur/etat-carte-chercheur.component';
import { RegionCreateChercheurComponent } from './region-chercheur/create-chercheur/region-create-chercheur.component';
import { RegionEditChercheurComponent } from './region-chercheur/edit-chercheur/region-edit-chercheur.component';
import { RegionViewChercheurComponent } from './region-chercheur/view-chercheur/region-view-chercheur.component';
import { RegionListChercheurComponent } from './region-chercheur/list-chercheur/region-list-chercheur.component';
import { RegionChercheurComponent } from './region-chercheur/region-chercheur.component';
import { TacheCreateChercheurComponent } from './tache-chercheur/create-chercheur/tache-create-chercheur.component';
import { TacheEditChercheurComponent } from './tache-chercheur/edit-chercheur/tache-edit-chercheur.component';
import { TacheViewChercheurComponent } from './tache-chercheur/view-chercheur/tache-view-chercheur.component';
import { TacheListChercheurComponent } from './tache-chercheur/list-chercheur/tache-list-chercheur.component';
import { TacheChercheurComponent } from './tache-chercheur/tache-chercheur.component';
import { ReclamationCreateChercheurComponent } from './reclamation-chercheur/create-chercheur/reclamation-create-chercheur.component';
import { ReclamationEditChercheurComponent } from './reclamation-chercheur/edit-chercheur/reclamation-edit-chercheur.component';
import { ReclamationViewChercheurComponent } from './reclamation-chercheur/view-chercheur/reclamation-view-chercheur.component';
import { ReclamationListChercheurComponent } from './reclamation-chercheur/list-chercheur/reclamation-list-chercheur.component';
import { ReclamationChercheurComponent } from './reclamation-chercheur/reclamation-chercheur.component';
import { SituationModerateurCreateChercheurComponent } from './situation-moderateur-chercheur/create-chercheur/situation-moderateur-create-chercheur.component';
import { SituationModerateurEditChercheurComponent } from './situation-moderateur-chercheur/edit-chercheur/situation-moderateur-edit-chercheur.component';
import { SituationModerateurViewChercheurComponent } from './situation-moderateur-chercheur/view-chercheur/situation-moderateur-view-chercheur.component';
import { SituationModerateurListChercheurComponent } from './situation-moderateur-chercheur/list-chercheur/situation-moderateur-list-chercheur.component';
import { SituationModerateurChercheurComponent } from './situation-moderateur-chercheur/situation-moderateur-chercheur.component';
import { EtatPrestationCreateChercheurComponent } from './etat-prestation-chercheur/create-chercheur/etat-prestation-create-chercheur.component';
import { EtatPrestationEditChercheurComponent } from './etat-prestation-chercheur/edit-chercheur/etat-prestation-edit-chercheur.component';
import { EtatPrestationViewChercheurComponent } from './etat-prestation-chercheur/view-chercheur/etat-prestation-view-chercheur.component';
import { EtatPrestationListChercheurComponent } from './etat-prestation-chercheur/list-chercheur/etat-prestation-list-chercheur.component';
import { EtatPrestationChercheurComponent } from './etat-prestation-chercheur/etat-prestation-chercheur.component';
import { EnfantCreateChercheurComponent } from './enfant-chercheur/create-chercheur/enfant-create-chercheur.component';
import { EnfantEditChercheurComponent } from './enfant-chercheur/edit-chercheur/enfant-edit-chercheur.component';
import { EnfantViewChercheurComponent } from './enfant-chercheur/view-chercheur/enfant-view-chercheur.component';
import { EnfantListChercheurComponent } from './enfant-chercheur/list-chercheur/enfant-list-chercheur.component';
import { EnfantChercheurComponent } from './enfant-chercheur/enfant-chercheur.component';
import { MissionCreateChercheurComponent } from './mission-chercheur/create-chercheur/mission-create-chercheur.component';
import { MissionEditChercheurComponent } from './mission-chercheur/edit-chercheur/mission-edit-chercheur.component';
import { MissionViewChercheurComponent } from './mission-chercheur/view-chercheur/mission-view-chercheur.component';
import { MissionListChercheurComponent } from './mission-chercheur/list-chercheur/mission-list-chercheur.component';
import { MissionChercheurComponent } from './mission-chercheur/mission-chercheur.component';
import { PieceJointeMissionCreateChercheurComponent } from './piece-jointe-mission-chercheur/create-chercheur/piece-jointe-mission-create-chercheur.component';
import { PieceJointeMissionEditChercheurComponent } from './piece-jointe-mission-chercheur/edit-chercheur/piece-jointe-mission-edit-chercheur.component';
import { PieceJointeMissionViewChercheurComponent } from './piece-jointe-mission-chercheur/view-chercheur/piece-jointe-mission-view-chercheur.component';
import { PieceJointeMissionListChercheurComponent } from './piece-jointe-mission-chercheur/list-chercheur/piece-jointe-mission-list-chercheur.component';
import { PieceJointeMissionChercheurComponent } from './piece-jointe-mission-chercheur/piece-jointe-mission-chercheur.component';
import { DemandeEstivageCentreCreateChercheurComponent } from './demande-estivage-centre-chercheur/create-chercheur/demande-estivage-centre-create-chercheur.component';
import { DemandeEstivageCentreEditChercheurComponent } from './demande-estivage-centre-chercheur/edit-chercheur/demande-estivage-centre-edit-chercheur.component';
import { DemandeEstivageCentreViewChercheurComponent } from './demande-estivage-centre-chercheur/view-chercheur/demande-estivage-centre-view-chercheur.component';
import { DemandeEstivageCentreListChercheurComponent } from './demande-estivage-centre-chercheur/list-chercheur/demande-estivage-centre-list-chercheur.component';
import { DemandeEstivageCentreChercheurComponent } from './demande-estivage-centre-chercheur/demande-estivage-centre-chercheur.component';
import { NiveauImportanceCreateChercheurComponent } from './niveau-importance-chercheur/create-chercheur/niveau-importance-create-chercheur.component';
import { NiveauImportanceEditChercheurComponent } from './niveau-importance-chercheur/edit-chercheur/niveau-importance-edit-chercheur.component';
import { NiveauImportanceViewChercheurComponent } from './niveau-importance-chercheur/view-chercheur/niveau-importance-view-chercheur.component';
import { NiveauImportanceListChercheurComponent } from './niveau-importance-chercheur/list-chercheur/niveau-importance-list-chercheur.component';
import { NiveauImportanceChercheurComponent } from './niveau-importance-chercheur/niveau-importance-chercheur.component';
import { ChercheurCreateChercheurComponent } from './chercheur-chercheur/create-chercheur/chercheur-create-chercheur.component';
import { ChercheurEditChercheurComponent } from './chercheur-chercheur/edit-chercheur/chercheur-edit-chercheur.component';
import { ChercheurViewChercheurComponent } from './chercheur-chercheur/view-chercheur/chercheur-view-chercheur.component';
import { ChercheurListChercheurComponent } from './chercheur-chercheur/list-chercheur/chercheur-list-chercheur.component';
import { ChercheurChercheurComponent } from './chercheur-chercheur/chercheur-chercheur.component';
import { PieceJointeProduitCreateChercheurComponent } from './piece-jointe-produit-chercheur/create-chercheur/piece-jointe-produit-create-chercheur.component';
import { PieceJointeProduitEditChercheurComponent } from './piece-jointe-produit-chercheur/edit-chercheur/piece-jointe-produit-edit-chercheur.component';
import { PieceJointeProduitViewChercheurComponent } from './piece-jointe-produit-chercheur/view-chercheur/piece-jointe-produit-view-chercheur.component';
import { PieceJointeProduitListChercheurComponent } from './piece-jointe-produit-chercheur/list-chercheur/piece-jointe-produit-list-chercheur.component';
import { PieceJointeProduitChercheurComponent } from './piece-jointe-produit-chercheur/piece-jointe-produit-chercheur.component';
import { ProjetCreateChercheurComponent } from './projet-chercheur/create-chercheur/projet-create-chercheur.component';
import { ProjetEditChercheurComponent } from './projet-chercheur/edit-chercheur/projet-edit-chercheur.component';
import { ProjetViewChercheurComponent } from './projet-chercheur/view-chercheur/projet-view-chercheur.component';
import { ProjetListChercheurComponent } from './projet-chercheur/list-chercheur/projet-list-chercheur.component';
import { ProjetChercheurComponent } from './projet-chercheur/projet-chercheur.component';
import { PieceJointeConventionCreateChercheurComponent } from './piece-jointe-convention-chercheur/create-chercheur/piece-jointe-convention-create-chercheur.component';
import { PieceJointeConventionEditChercheurComponent } from './piece-jointe-convention-chercheur/edit-chercheur/piece-jointe-convention-edit-chercheur.component';
import { PieceJointeConventionViewChercheurComponent } from './piece-jointe-convention-chercheur/view-chercheur/piece-jointe-convention-view-chercheur.component';
import { PieceJointeConventionListChercheurComponent } from './piece-jointe-convention-chercheur/list-chercheur/piece-jointe-convention-list-chercheur.component';
import { PieceJointeConventionChercheurComponent } from './piece-jointe-convention-chercheur/piece-jointe-convention-chercheur.component';
import { EchelonCreateChercheurComponent } from './echelon-chercheur/create-chercheur/echelon-create-chercheur.component';
import { EchelonEditChercheurComponent } from './echelon-chercheur/edit-chercheur/echelon-edit-chercheur.component';
import { EchelonViewChercheurComponent } from './echelon-chercheur/view-chercheur/echelon-view-chercheur.component';
import { EchelonListChercheurComponent } from './echelon-chercheur/list-chercheur/echelon-list-chercheur.component';
import { EchelonChercheurComponent } from './echelon-chercheur/echelon-chercheur.component';
import { PrestationCreateChercheurComponent } from './prestation-chercheur/create-chercheur/prestation-create-chercheur.component';
import { PrestationEditChercheurComponent } from './prestation-chercheur/edit-chercheur/prestation-edit-chercheur.component';
import { PrestationViewChercheurComponent } from './prestation-chercheur/view-chercheur/prestation-view-chercheur.component';
import { PrestationListChercheurComponent } from './prestation-chercheur/list-chercheur/prestation-list-chercheur.component';
import { PrestationChercheurComponent } from './prestation-chercheur/prestation-chercheur.component';
import { PieceJointeProjetCreateChercheurComponent } from './piece-jointe-projet-chercheur/create-chercheur/piece-jointe-projet-create-chercheur.component';
import { PieceJointeProjetEditChercheurComponent } from './piece-jointe-projet-chercheur/edit-chercheur/piece-jointe-projet-edit-chercheur.component';
import { PieceJointeProjetViewChercheurComponent } from './piece-jointe-projet-chercheur/view-chercheur/piece-jointe-projet-view-chercheur.component';
import { PieceJointeProjetListChercheurComponent } from './piece-jointe-projet-chercheur/list-chercheur/piece-jointe-projet-list-chercheur.component';
import { PieceJointeProjetChercheurComponent } from './piece-jointe-projet-chercheur/piece-jointe-projet-chercheur.component';
import { PieceJointeReclamationCreateChercheurComponent } from './piece-jointe-reclamation-chercheur/create-chercheur/piece-jointe-reclamation-create-chercheur.component';
import { PieceJointeReclamationEditChercheurComponent } from './piece-jointe-reclamation-chercheur/edit-chercheur/piece-jointe-reclamation-edit-chercheur.component';
import { PieceJointeReclamationViewChercheurComponent } from './piece-jointe-reclamation-chercheur/view-chercheur/piece-jointe-reclamation-view-chercheur.component';
import { PieceJointeReclamationListChercheurComponent } from './piece-jointe-reclamation-chercheur/list-chercheur/piece-jointe-reclamation-list-chercheur.component';
import { PieceJointeReclamationChercheurComponent } from './piece-jointe-reclamation-chercheur/piece-jointe-reclamation-chercheur.component';
import { EchelleCreateChercheurComponent } from './echelle-chercheur/create-chercheur/echelle-create-chercheur.component';
import { EchelleEditChercheurComponent } from './echelle-chercheur/edit-chercheur/echelle-edit-chercheur.component';
import { EchelleViewChercheurComponent } from './echelle-chercheur/view-chercheur/echelle-view-chercheur.component';
import { EchelleListChercheurComponent } from './echelle-chercheur/list-chercheur/echelle-list-chercheur.component';
import { EchelleChercheurComponent } from './echelle-chercheur/echelle-chercheur.component';
import { TypePrestationCreateChercheurComponent } from './type-prestation-chercheur/create-chercheur/type-prestation-create-chercheur.component';
import { TypePrestationEditChercheurComponent } from './type-prestation-chercheur/edit-chercheur/type-prestation-edit-chercheur.component';
import { TypePrestationViewChercheurComponent } from './type-prestation-chercheur/view-chercheur/type-prestation-view-chercheur.component';
import { TypePrestationListChercheurComponent } from './type-prestation-chercheur/list-chercheur/type-prestation-list-chercheur.component';
import { TypePrestationChercheurComponent } from './type-prestation-chercheur/type-prestation-chercheur.component';
import { OrganismeCreateChercheurComponent } from './organisme-chercheur/create-chercheur/organisme-create-chercheur.component';
import { OrganismeEditChercheurComponent } from './organisme-chercheur/edit-chercheur/organisme-edit-chercheur.component';
import { OrganismeViewChercheurComponent } from './organisme-chercheur/view-chercheur/organisme-view-chercheur.component';
import { OrganismeListChercheurComponent } from './organisme-chercheur/list-chercheur/organisme-list-chercheur.component';
import { OrganismeChercheurComponent } from './organisme-chercheur/organisme-chercheur.component';
import { EtatTacheCreateChercheurComponent } from './etat-tache-chercheur/create-chercheur/etat-tache-create-chercheur.component';
import { EtatTacheEditChercheurComponent } from './etat-tache-chercheur/edit-chercheur/etat-tache-edit-chercheur.component';
import { EtatTacheViewChercheurComponent } from './etat-tache-chercheur/view-chercheur/etat-tache-view-chercheur.component';
import { EtatTacheListChercheurComponent } from './etat-tache-chercheur/list-chercheur/etat-tache-list-chercheur.component';
import { EtatTacheChercheurComponent } from './etat-tache-chercheur/etat-tache-chercheur.component';
import { ConjointCreateChercheurComponent } from './conjoint-chercheur/create-chercheur/conjoint-create-chercheur.component';
import { ConjointEditChercheurComponent } from './conjoint-chercheur/edit-chercheur/conjoint-edit-chercheur.component';
import { ConjointViewChercheurComponent } from './conjoint-chercheur/view-chercheur/conjoint-view-chercheur.component';
import { ConjointListChercheurComponent } from './conjoint-chercheur/list-chercheur/conjoint-list-chercheur.component';
import { ConjointChercheurComponent } from './conjoint-chercheur/conjoint-chercheur.component';
import { PieceJointeRendezVousCreateChercheurComponent } from './piece-jointe-rendez-vous-chercheur/create-chercheur/piece-jointe-rendez-vous-create-chercheur.component';
import { PieceJointeRendezVousEditChercheurComponent } from './piece-jointe-rendez-vous-chercheur/edit-chercheur/piece-jointe-rendez-vous-edit-chercheur.component';
import { PieceJointeRendezVousViewChercheurComponent } from './piece-jointe-rendez-vous-chercheur/view-chercheur/piece-jointe-rendez-vous-view-chercheur.component';
import { PieceJointeRendezVousListChercheurComponent } from './piece-jointe-rendez-vous-chercheur/list-chercheur/piece-jointe-rendez-vous-list-chercheur.component';
import { PieceJointeRendezVousChercheurComponent } from './piece-jointe-rendez-vous-chercheur/piece-jointe-rendez-vous-chercheur.component';
import { PieceJointePrestationCreateChercheurComponent } from './piece-jointe-prestation-chercheur/create-chercheur/piece-jointe-prestation-create-chercheur.component';
import { PieceJointePrestationEditChercheurComponent } from './piece-jointe-prestation-chercheur/edit-chercheur/piece-jointe-prestation-edit-chercheur.component';
import { PieceJointePrestationViewChercheurComponent } from './piece-jointe-prestation-chercheur/view-chercheur/piece-jointe-prestation-view-chercheur.component';
import { PieceJointePrestationListChercheurComponent } from './piece-jointe-prestation-chercheur/list-chercheur/piece-jointe-prestation-list-chercheur.component';
import { PieceJointePrestationChercheurComponent } from './piece-jointe-prestation-chercheur/piece-jointe-prestation-chercheur.component';
import { CentreEstivageCreateChercheurComponent } from './centre-estivage-chercheur/create-chercheur/centre-estivage-create-chercheur.component';
import { CentreEstivageEditChercheurComponent } from './centre-estivage-chercheur/edit-chercheur/centre-estivage-edit-chercheur.component';
import { CentreEstivageViewChercheurComponent } from './centre-estivage-chercheur/view-chercheur/centre-estivage-view-chercheur.component';
import { CentreEstivageListChercheurComponent } from './centre-estivage-chercheur/list-chercheur/centre-estivage-list-chercheur.component';
import { CentreEstivageChercheurComponent } from './centre-estivage-chercheur/centre-estivage-chercheur.component';
import { PieceJointeAdherentCreateChercheurComponent } from './piece-jointe-adherent-chercheur/create-chercheur/piece-jointe-adherent-create-chercheur.component';
import { PieceJointeAdherentEditChercheurComponent } from './piece-jointe-adherent-chercheur/edit-chercheur/piece-jointe-adherent-edit-chercheur.component';
import { PieceJointeAdherentViewChercheurComponent } from './piece-jointe-adherent-chercheur/view-chercheur/piece-jointe-adherent-view-chercheur.component';
import { PieceJointeAdherentListChercheurComponent } from './piece-jointe-adherent-chercheur/list-chercheur/piece-jointe-adherent-list-chercheur.component';
import { PieceJointeAdherentChercheurComponent } from './piece-jointe-adherent-chercheur/piece-jointe-adherent-chercheur.component';
import { GestionReclamationCreateChercheurComponent } from './gestion-reclamation-chercheur/create-chercheur/gestion-reclamation-create-chercheur.component';
import { GestionReclamationEditChercheurComponent } from './gestion-reclamation-chercheur/edit-chercheur/gestion-reclamation-edit-chercheur.component';
import { GestionReclamationViewChercheurComponent } from './gestion-reclamation-chercheur/view-chercheur/gestion-reclamation-view-chercheur.component';
import { GestionReclamationListChercheurComponent } from './gestion-reclamation-chercheur/list-chercheur/gestion-reclamation-list-chercheur.component';
import { GestionReclamationChercheurComponent } from './gestion-reclamation-chercheur/gestion-reclamation-chercheur.component';
import { FonctionCreateChercheurComponent } from './fonction-chercheur/create-chercheur/fonction-create-chercheur.component';
import { FonctionEditChercheurComponent } from './fonction-chercheur/edit-chercheur/fonction-edit-chercheur.component';
import { FonctionViewChercheurComponent } from './fonction-chercheur/view-chercheur/fonction-view-chercheur.component';
import { FonctionListChercheurComponent } from './fonction-chercheur/list-chercheur/fonction-list-chercheur.component';
import { FonctionChercheurComponent } from './fonction-chercheur/fonction-chercheur.component';
import { EtatDemandeEstivageCreateChercheurComponent } from './etat-demande-estivage-chercheur/create-chercheur/etat-demande-estivage-create-chercheur.component';
import { EtatDemandeEstivageEditChercheurComponent } from './etat-demande-estivage-chercheur/edit-chercheur/etat-demande-estivage-edit-chercheur.component';
import { EtatDemandeEstivageViewChercheurComponent } from './etat-demande-estivage-chercheur/view-chercheur/etat-demande-estivage-view-chercheur.component';
import { EtatDemandeEstivageListChercheurComponent } from './etat-demande-estivage-chercheur/list-chercheur/etat-demande-estivage-list-chercheur.component';
import { EtatDemandeEstivageChercheurComponent } from './etat-demande-estivage-chercheur/etat-demande-estivage-chercheur.component';
import { GradeCreateChercheurComponent } from './grade-chercheur/create-chercheur/grade-create-chercheur.component';
import { GradeEditChercheurComponent } from './grade-chercheur/edit-chercheur/grade-edit-chercheur.component';
import { GradeViewChercheurComponent } from './grade-chercheur/view-chercheur/grade-view-chercheur.component';
import { GradeListChercheurComponent } from './grade-chercheur/list-chercheur/grade-list-chercheur.component';
import { GradeChercheurComponent } from './grade-chercheur/grade-chercheur.component';
import { EstivageCentreEstivageCreateChercheurComponent } from './estivage-centre-estivage-chercheur/create-chercheur/estivage-centre-estivage-create-chercheur.component';
import { EstivageCentreEstivageEditChercheurComponent } from './estivage-centre-estivage-chercheur/edit-chercheur/estivage-centre-estivage-edit-chercheur.component';
import { EstivageCentreEstivageViewChercheurComponent } from './estivage-centre-estivage-chercheur/view-chercheur/estivage-centre-estivage-view-chercheur.component';
import { EstivageCentreEstivageListChercheurComponent } from './estivage-centre-estivage-chercheur/list-chercheur/estivage-centre-estivage-list-chercheur.component';
import { EstivageCentreEstivageChercheurComponent } from './estivage-centre-estivage-chercheur/estivage-centre-estivage-chercheur.component';
import { EtatProjetCreateChercheurComponent } from './etat-projet-chercheur/create-chercheur/etat-projet-create-chercheur.component';
import { EtatProjetEditChercheurComponent } from './etat-projet-chercheur/edit-chercheur/etat-projet-edit-chercheur.component';
import { EtatProjetViewChercheurComponent } from './etat-projet-chercheur/view-chercheur/etat-projet-view-chercheur.component';
import { EtatProjetListChercheurComponent } from './etat-projet-chercheur/list-chercheur/etat-projet-list-chercheur.component';
import { EtatProjetChercheurComponent } from './etat-projet-chercheur/etat-projet-chercheur.component';
import { QualiteCreateChercheurComponent } from './qualite-chercheur/create-chercheur/qualite-create-chercheur.component';
import { QualiteEditChercheurComponent } from './qualite-chercheur/edit-chercheur/qualite-edit-chercheur.component';
import { QualiteViewChercheurComponent } from './qualite-chercheur/view-chercheur/qualite-view-chercheur.component';
import { QualiteListChercheurComponent } from './qualite-chercheur/list-chercheur/qualite-list-chercheur.component';
import { QualiteChercheurComponent } from './qualite-chercheur/qualite-chercheur.component';
import { RendezVousCreateChercheurComponent } from './rendez-vous-chercheur/create-chercheur/rendez-vous-create-chercheur.component';
import { RendezVousEditChercheurComponent } from './rendez-vous-chercheur/edit-chercheur/rendez-vous-edit-chercheur.component';
import { RendezVousViewChercheurComponent } from './rendez-vous-chercheur/view-chercheur/rendez-vous-view-chercheur.component';
import { RendezVousListChercheurComponent } from './rendez-vous-chercheur/list-chercheur/rendez-vous-list-chercheur.component';
import { RendezVousChercheurComponent } from './rendez-vous-chercheur/rendez-vous-chercheur.component';
import { ModerateurCreateChercheurComponent } from './moderateur-chercheur/create-chercheur/moderateur-create-chercheur.component';
import { ModerateurEditChercheurComponent } from './moderateur-chercheur/edit-chercheur/moderateur-edit-chercheur.component';
import { ModerateurViewChercheurComponent } from './moderateur-chercheur/view-chercheur/moderateur-view-chercheur.component';
import { ModerateurListChercheurComponent } from './moderateur-chercheur/list-chercheur/moderateur-list-chercheur.component';
import { ModerateurChercheurComponent } from './moderateur-chercheur/moderateur-chercheur.component';

import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageModule } from 'primeng/message';
import {MessagesModule} from 'primeng/messages';


@NgModule({
  declarations: [

    AdherentCreateChercheurComponent,
    AdherentListChercheurComponent,
    AdherentViewChercheurComponent,
    AdherentEditChercheurComponent,
    AdherentChercheurComponent,
    DemandeEstivageCreateChercheurComponent,
    DemandeEstivageListChercheurComponent,
    DemandeEstivageViewChercheurComponent,
    DemandeEstivageEditChercheurComponent,
    DemandeEstivageChercheurComponent,
    EtatReclamationCreateChercheurComponent,
    EtatReclamationListChercheurComponent,
    EtatReclamationViewChercheurComponent,
    EtatReclamationEditChercheurComponent,
    EtatReclamationChercheurComponent,
    EstivageCreateChercheurComponent,
    EstivageListChercheurComponent,
    EstivageViewChercheurComponent,
    EstivageEditChercheurComponent,
    EstivageChercheurComponent,
    VilleCreateChercheurComponent,
    VilleListChercheurComponent,
    VilleViewChercheurComponent,
    VilleEditChercheurComponent,
    VilleChercheurComponent,
    ProfilCreateChercheurComponent,
    ProfilListChercheurComponent,
    ProfilViewChercheurComponent,
    ProfilEditChercheurComponent,
    ProfilChercheurComponent,
    ConventionCreateChercheurComponent,
    ConventionListChercheurComponent,
    ConventionViewChercheurComponent,
    ConventionEditChercheurComponent,
    ConventionChercheurComponent,
    ImpressionCarteCreateChercheurComponent,
    ImpressionCarteListChercheurComponent,
    ImpressionCarteViewChercheurComponent,
    ImpressionCarteEditChercheurComponent,
    ImpressionCarteChercheurComponent,
    PieceJointeEstivageCreateChercheurComponent,
    PieceJointeEstivageListChercheurComponent,
    PieceJointeEstivageViewChercheurComponent,
    PieceJointeEstivageEditChercheurComponent,
    PieceJointeEstivageChercheurComponent,
    ProduitCreateChercheurComponent,
    ProduitListChercheurComponent,
    ProduitViewChercheurComponent,
    ProduitEditChercheurComponent,
    ProduitChercheurComponent,
    StatutCreateChercheurComponent,
    StatutListChercheurComponent,
    StatutViewChercheurComponent,
    StatutEditChercheurComponent,
    StatutChercheurComponent,
    EtatCarteCreateChercheurComponent,
    EtatCarteListChercheurComponent,
    EtatCarteViewChercheurComponent,
    EtatCarteEditChercheurComponent,
    EtatCarteChercheurComponent,
    RegionCreateChercheurComponent,
    RegionListChercheurComponent,
    RegionViewChercheurComponent,
    RegionEditChercheurComponent,
    RegionChercheurComponent,
    TacheCreateChercheurComponent,
    TacheListChercheurComponent,
    TacheViewChercheurComponent,
    TacheEditChercheurComponent,
    TacheChercheurComponent,
    ReclamationCreateChercheurComponent,
    ReclamationListChercheurComponent,
    ReclamationViewChercheurComponent,
    ReclamationEditChercheurComponent,
    ReclamationChercheurComponent,
    SituationModerateurCreateChercheurComponent,
    SituationModerateurListChercheurComponent,
    SituationModerateurViewChercheurComponent,
    SituationModerateurEditChercheurComponent,
    SituationModerateurChercheurComponent,
    EtatPrestationCreateChercheurComponent,
    EtatPrestationListChercheurComponent,
    EtatPrestationViewChercheurComponent,
    EtatPrestationEditChercheurComponent,
    EtatPrestationChercheurComponent,
    EnfantCreateChercheurComponent,
    EnfantListChercheurComponent,
    EnfantViewChercheurComponent,
    EnfantEditChercheurComponent,
    EnfantChercheurComponent,
    MissionCreateChercheurComponent,
    MissionListChercheurComponent,
    MissionViewChercheurComponent,
    MissionEditChercheurComponent,
    MissionChercheurComponent,
    PieceJointeMissionCreateChercheurComponent,
    PieceJointeMissionListChercheurComponent,
    PieceJointeMissionViewChercheurComponent,
    PieceJointeMissionEditChercheurComponent,
    PieceJointeMissionChercheurComponent,
    DemandeEstivageCentreCreateChercheurComponent,
    DemandeEstivageCentreListChercheurComponent,
    DemandeEstivageCentreViewChercheurComponent,
    DemandeEstivageCentreEditChercheurComponent,
    DemandeEstivageCentreChercheurComponent,
    NiveauImportanceCreateChercheurComponent,
    NiveauImportanceListChercheurComponent,
    NiveauImportanceViewChercheurComponent,
    NiveauImportanceEditChercheurComponent,
    NiveauImportanceChercheurComponent,
    ChercheurCreateChercheurComponent,
    ChercheurListChercheurComponent,
    ChercheurViewChercheurComponent,
    ChercheurEditChercheurComponent,
    ChercheurChercheurComponent,
    PieceJointeProduitCreateChercheurComponent,
    PieceJointeProduitListChercheurComponent,
    PieceJointeProduitViewChercheurComponent,
    PieceJointeProduitEditChercheurComponent,
    PieceJointeProduitChercheurComponent,
    ProjetCreateChercheurComponent,
    ProjetListChercheurComponent,
    ProjetViewChercheurComponent,
    ProjetEditChercheurComponent,
    ProjetChercheurComponent,
    PieceJointeConventionCreateChercheurComponent,
    PieceJointeConventionListChercheurComponent,
    PieceJointeConventionViewChercheurComponent,
    PieceJointeConventionEditChercheurComponent,
    PieceJointeConventionChercheurComponent,
    EchelonCreateChercheurComponent,
    EchelonListChercheurComponent,
    EchelonViewChercheurComponent,
    EchelonEditChercheurComponent,
    EchelonChercheurComponent,
    PrestationCreateChercheurComponent,
    PrestationListChercheurComponent,
    PrestationViewChercheurComponent,
    PrestationEditChercheurComponent,
    PrestationChercheurComponent,
    PieceJointeProjetCreateChercheurComponent,
    PieceJointeProjetListChercheurComponent,
    PieceJointeProjetViewChercheurComponent,
    PieceJointeProjetEditChercheurComponent,
    PieceJointeProjetChercheurComponent,
    PieceJointeReclamationCreateChercheurComponent,
    PieceJointeReclamationListChercheurComponent,
    PieceJointeReclamationViewChercheurComponent,
    PieceJointeReclamationEditChercheurComponent,
    PieceJointeReclamationChercheurComponent,
    EchelleCreateChercheurComponent,
    EchelleListChercheurComponent,
    EchelleViewChercheurComponent,
    EchelleEditChercheurComponent,
    EchelleChercheurComponent,
    TypePrestationCreateChercheurComponent,
    TypePrestationListChercheurComponent,
    TypePrestationViewChercheurComponent,
    TypePrestationEditChercheurComponent,
    TypePrestationChercheurComponent,
    OrganismeCreateChercheurComponent,
    OrganismeListChercheurComponent,
    OrganismeViewChercheurComponent,
    OrganismeEditChercheurComponent,
    OrganismeChercheurComponent,
    EtatTacheCreateChercheurComponent,
    EtatTacheListChercheurComponent,
    EtatTacheViewChercheurComponent,
    EtatTacheEditChercheurComponent,
    EtatTacheChercheurComponent,
    ConjointCreateChercheurComponent,
    ConjointListChercheurComponent,
    ConjointViewChercheurComponent,
    ConjointEditChercheurComponent,
    ConjointChercheurComponent,
    PieceJointeRendezVousCreateChercheurComponent,
    PieceJointeRendezVousListChercheurComponent,
    PieceJointeRendezVousViewChercheurComponent,
    PieceJointeRendezVousEditChercheurComponent,
    PieceJointeRendezVousChercheurComponent,
    PieceJointePrestationCreateChercheurComponent,
    PieceJointePrestationListChercheurComponent,
    PieceJointePrestationViewChercheurComponent,
    PieceJointePrestationEditChercheurComponent,
    PieceJointePrestationChercheurComponent,
    CentreEstivageCreateChercheurComponent,
    CentreEstivageListChercheurComponent,
    CentreEstivageViewChercheurComponent,
    CentreEstivageEditChercheurComponent,
    CentreEstivageChercheurComponent,
    PieceJointeAdherentCreateChercheurComponent,
    PieceJointeAdherentListChercheurComponent,
    PieceJointeAdherentViewChercheurComponent,
    PieceJointeAdherentEditChercheurComponent,
    PieceJointeAdherentChercheurComponent,
    GestionReclamationCreateChercheurComponent,
    GestionReclamationListChercheurComponent,
    GestionReclamationViewChercheurComponent,
    GestionReclamationEditChercheurComponent,
    GestionReclamationChercheurComponent,
    FonctionCreateChercheurComponent,
    FonctionListChercheurComponent,
    FonctionViewChercheurComponent,
    FonctionEditChercheurComponent,
    FonctionChercheurComponent,
    EtatDemandeEstivageCreateChercheurComponent,
    EtatDemandeEstivageListChercheurComponent,
    EtatDemandeEstivageViewChercheurComponent,
    EtatDemandeEstivageEditChercheurComponent,
    EtatDemandeEstivageChercheurComponent,
    GradeCreateChercheurComponent,
    GradeListChercheurComponent,
    GradeViewChercheurComponent,
    GradeEditChercheurComponent,
    GradeChercheurComponent,
    EstivageCentreEstivageCreateChercheurComponent,
    EstivageCentreEstivageListChercheurComponent,
    EstivageCentreEstivageViewChercheurComponent,
    EstivageCentreEstivageEditChercheurComponent,
    EstivageCentreEstivageChercheurComponent,
    EtatProjetCreateChercheurComponent,
    EtatProjetListChercheurComponent,
    EtatProjetViewChercheurComponent,
    EtatProjetEditChercheurComponent,
    EtatProjetChercheurComponent,
    QualiteCreateChercheurComponent,
    QualiteListChercheurComponent,
    QualiteViewChercheurComponent,
    QualiteEditChercheurComponent,
    QualiteChercheurComponent,
    RendezVousCreateChercheurComponent,
    RendezVousListChercheurComponent,
    RendezVousViewChercheurComponent,
    RendezVousEditChercheurComponent,
    RendezVousChercheurComponent,
    ModerateurCreateChercheurComponent,
    ModerateurListChercheurComponent,
    ModerateurViewChercheurComponent,
    ModerateurEditChercheurComponent,
    ModerateurChercheurComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SplitButtonModule,
    BrowserAnimationsModule,
    DropdownModule,
    TabViewModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    PanelModule,
    MessageModule,
    MessagesModule,
    InputNumberModule,
    BadgeModule,
    MultiSelectModule,
  ],
  exports: [
  AdherentCreateChercheurComponent,
  AdherentListChercheurComponent,
  AdherentViewChercheurComponent,
  AdherentEditChercheurComponent,
  AdherentChercheurComponent,
  DemandeEstivageCreateChercheurComponent,
  DemandeEstivageListChercheurComponent,
  DemandeEstivageViewChercheurComponent,
  DemandeEstivageEditChercheurComponent,
  DemandeEstivageChercheurComponent,
  EtatReclamationCreateChercheurComponent,
  EtatReclamationListChercheurComponent,
  EtatReclamationViewChercheurComponent,
  EtatReclamationEditChercheurComponent,
  EtatReclamationChercheurComponent,
  EstivageCreateChercheurComponent,
  EstivageListChercheurComponent,
  EstivageViewChercheurComponent,
  EstivageEditChercheurComponent,
  EstivageChercheurComponent,
  VilleCreateChercheurComponent,
  VilleListChercheurComponent,
  VilleViewChercheurComponent,
  VilleEditChercheurComponent,
  VilleChercheurComponent,
  ProfilCreateChercheurComponent,
  ProfilListChercheurComponent,
  ProfilViewChercheurComponent,
  ProfilEditChercheurComponent,
  ProfilChercheurComponent,
  ConventionCreateChercheurComponent,
  ConventionListChercheurComponent,
  ConventionViewChercheurComponent,
  ConventionEditChercheurComponent,
  ConventionChercheurComponent,
  ImpressionCarteCreateChercheurComponent,
  ImpressionCarteListChercheurComponent,
  ImpressionCarteViewChercheurComponent,
  ImpressionCarteEditChercheurComponent,
  ImpressionCarteChercheurComponent,
  PieceJointeEstivageCreateChercheurComponent,
  PieceJointeEstivageListChercheurComponent,
  PieceJointeEstivageViewChercheurComponent,
  PieceJointeEstivageEditChercheurComponent,
  PieceJointeEstivageChercheurComponent,
  ProduitCreateChercheurComponent,
  ProduitListChercheurComponent,
  ProduitViewChercheurComponent,
  ProduitEditChercheurComponent,
  ProduitChercheurComponent,
  StatutCreateChercheurComponent,
  StatutListChercheurComponent,
  StatutViewChercheurComponent,
  StatutEditChercheurComponent,
  StatutChercheurComponent,
  EtatCarteCreateChercheurComponent,
  EtatCarteListChercheurComponent,
  EtatCarteViewChercheurComponent,
  EtatCarteEditChercheurComponent,
  EtatCarteChercheurComponent,
  RegionCreateChercheurComponent,
  RegionListChercheurComponent,
  RegionViewChercheurComponent,
  RegionEditChercheurComponent,
  RegionChercheurComponent,
  TacheCreateChercheurComponent,
  TacheListChercheurComponent,
  TacheViewChercheurComponent,
  TacheEditChercheurComponent,
  TacheChercheurComponent,
  ReclamationCreateChercheurComponent,
  ReclamationListChercheurComponent,
  ReclamationViewChercheurComponent,
  ReclamationEditChercheurComponent,
  ReclamationChercheurComponent,
  SituationModerateurCreateChercheurComponent,
  SituationModerateurListChercheurComponent,
  SituationModerateurViewChercheurComponent,
  SituationModerateurEditChercheurComponent,
  SituationModerateurChercheurComponent,
  EtatPrestationCreateChercheurComponent,
  EtatPrestationListChercheurComponent,
  EtatPrestationViewChercheurComponent,
  EtatPrestationEditChercheurComponent,
  EtatPrestationChercheurComponent,
  EnfantCreateChercheurComponent,
  EnfantListChercheurComponent,
  EnfantViewChercheurComponent,
  EnfantEditChercheurComponent,
  EnfantChercheurComponent,
  MissionCreateChercheurComponent,
  MissionListChercheurComponent,
  MissionViewChercheurComponent,
  MissionEditChercheurComponent,
  MissionChercheurComponent,
  PieceJointeMissionCreateChercheurComponent,
  PieceJointeMissionListChercheurComponent,
  PieceJointeMissionViewChercheurComponent,
  PieceJointeMissionEditChercheurComponent,
  PieceJointeMissionChercheurComponent,
  DemandeEstivageCentreCreateChercheurComponent,
  DemandeEstivageCentreListChercheurComponent,
  DemandeEstivageCentreViewChercheurComponent,
  DemandeEstivageCentreEditChercheurComponent,
  DemandeEstivageCentreChercheurComponent,
  NiveauImportanceCreateChercheurComponent,
  NiveauImportanceListChercheurComponent,
  NiveauImportanceViewChercheurComponent,
  NiveauImportanceEditChercheurComponent,
  NiveauImportanceChercheurComponent,
  ChercheurCreateChercheurComponent,
  ChercheurListChercheurComponent,
  ChercheurViewChercheurComponent,
  ChercheurEditChercheurComponent,
  ChercheurChercheurComponent,
  PieceJointeProduitCreateChercheurComponent,
  PieceJointeProduitListChercheurComponent,
  PieceJointeProduitViewChercheurComponent,
  PieceJointeProduitEditChercheurComponent,
  PieceJointeProduitChercheurComponent,
  ProjetCreateChercheurComponent,
  ProjetListChercheurComponent,
  ProjetViewChercheurComponent,
  ProjetEditChercheurComponent,
  ProjetChercheurComponent,
  PieceJointeConventionCreateChercheurComponent,
  PieceJointeConventionListChercheurComponent,
  PieceJointeConventionViewChercheurComponent,
  PieceJointeConventionEditChercheurComponent,
  PieceJointeConventionChercheurComponent,
  EchelonCreateChercheurComponent,
  EchelonListChercheurComponent,
  EchelonViewChercheurComponent,
  EchelonEditChercheurComponent,
  EchelonChercheurComponent,
  PrestationCreateChercheurComponent,
  PrestationListChercheurComponent,
  PrestationViewChercheurComponent,
  PrestationEditChercheurComponent,
  PrestationChercheurComponent,
  PieceJointeProjetCreateChercheurComponent,
  PieceJointeProjetListChercheurComponent,
  PieceJointeProjetViewChercheurComponent,
  PieceJointeProjetEditChercheurComponent,
  PieceJointeProjetChercheurComponent,
  PieceJointeReclamationCreateChercheurComponent,
  PieceJointeReclamationListChercheurComponent,
  PieceJointeReclamationViewChercheurComponent,
  PieceJointeReclamationEditChercheurComponent,
  PieceJointeReclamationChercheurComponent,
  EchelleCreateChercheurComponent,
  EchelleListChercheurComponent,
  EchelleViewChercheurComponent,
  EchelleEditChercheurComponent,
  EchelleChercheurComponent,
  TypePrestationCreateChercheurComponent,
  TypePrestationListChercheurComponent,
  TypePrestationViewChercheurComponent,
  TypePrestationEditChercheurComponent,
  TypePrestationChercheurComponent,
  OrganismeCreateChercheurComponent,
  OrganismeListChercheurComponent,
  OrganismeViewChercheurComponent,
  OrganismeEditChercheurComponent,
  OrganismeChercheurComponent,
  EtatTacheCreateChercheurComponent,
  EtatTacheListChercheurComponent,
  EtatTacheViewChercheurComponent,
  EtatTacheEditChercheurComponent,
  EtatTacheChercheurComponent,
  ConjointCreateChercheurComponent,
  ConjointListChercheurComponent,
  ConjointViewChercheurComponent,
  ConjointEditChercheurComponent,
  ConjointChercheurComponent,
  PieceJointeRendezVousCreateChercheurComponent,
  PieceJointeRendezVousListChercheurComponent,
  PieceJointeRendezVousViewChercheurComponent,
  PieceJointeRendezVousEditChercheurComponent,
  PieceJointeRendezVousChercheurComponent,
  PieceJointePrestationCreateChercheurComponent,
  PieceJointePrestationListChercheurComponent,
  PieceJointePrestationViewChercheurComponent,
  PieceJointePrestationEditChercheurComponent,
  PieceJointePrestationChercheurComponent,
  CentreEstivageCreateChercheurComponent,
  CentreEstivageListChercheurComponent,
  CentreEstivageViewChercheurComponent,
  CentreEstivageEditChercheurComponent,
  CentreEstivageChercheurComponent,
  PieceJointeAdherentCreateChercheurComponent,
  PieceJointeAdherentListChercheurComponent,
  PieceJointeAdherentViewChercheurComponent,
  PieceJointeAdherentEditChercheurComponent,
  PieceJointeAdherentChercheurComponent,
  GestionReclamationCreateChercheurComponent,
  GestionReclamationListChercheurComponent,
  GestionReclamationViewChercheurComponent,
  GestionReclamationEditChercheurComponent,
  GestionReclamationChercheurComponent,
  FonctionCreateChercheurComponent,
  FonctionListChercheurComponent,
  FonctionViewChercheurComponent,
  FonctionEditChercheurComponent,
  FonctionChercheurComponent,
  EtatDemandeEstivageCreateChercheurComponent,
  EtatDemandeEstivageListChercheurComponent,
  EtatDemandeEstivageViewChercheurComponent,
  EtatDemandeEstivageEditChercheurComponent,
  EtatDemandeEstivageChercheurComponent,
  GradeCreateChercheurComponent,
  GradeListChercheurComponent,
  GradeViewChercheurComponent,
  GradeEditChercheurComponent,
  GradeChercheurComponent,
  EstivageCentreEstivageCreateChercheurComponent,
  EstivageCentreEstivageListChercheurComponent,
  EstivageCentreEstivageViewChercheurComponent,
  EstivageCentreEstivageEditChercheurComponent,
  EstivageCentreEstivageChercheurComponent,
  EtatProjetCreateChercheurComponent,
  EtatProjetListChercheurComponent,
  EtatProjetViewChercheurComponent,
  EtatProjetEditChercheurComponent,
  EtatProjetChercheurComponent,
  QualiteCreateChercheurComponent,
  QualiteListChercheurComponent,
  QualiteViewChercheurComponent,
  QualiteEditChercheurComponent,
  QualiteChercheurComponent,
  RendezVousCreateChercheurComponent,
  RendezVousListChercheurComponent,
  RendezVousViewChercheurComponent,
  RendezVousEditChercheurComponent,
  RendezVousChercheurComponent,
  ModerateurCreateChercheurComponent,
  ModerateurListChercheurComponent,
  ModerateurViewChercheurComponent,
  ModerateurEditChercheurComponent,
  ModerateurChercheurComponent,
  ],
  entryComponents: [],
})
export class FondationChercheurModule { }
