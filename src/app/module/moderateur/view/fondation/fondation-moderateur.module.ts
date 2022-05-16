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

import { AdherentCreateModerateurComponent } from './adherent-moderateur/create-moderateur/adherent-create-moderateur.component';
import { AdherentEditModerateurComponent } from './adherent-moderateur/edit-moderateur/adherent-edit-moderateur.component';
import { AdherentViewModerateurComponent } from './adherent-moderateur/view-moderateur/adherent-view-moderateur.component';
import { AdherentListModerateurComponent } from './adherent-moderateur/list-moderateur/adherent-list-moderateur.component';
import { AdherentModerateurComponent } from './adherent-moderateur/adherent-moderateur.component';
import { DemandeEstivageCreateModerateurComponent } from './demande-estivage-moderateur/create-moderateur/demande-estivage-create-moderateur.component';
import { DemandeEstivageEditModerateurComponent } from './demande-estivage-moderateur/edit-moderateur/demande-estivage-edit-moderateur.component';
import { DemandeEstivageViewModerateurComponent } from './demande-estivage-moderateur/view-moderateur/demande-estivage-view-moderateur.component';
import { DemandeEstivageListModerateurComponent } from './demande-estivage-moderateur/list-moderateur/demande-estivage-list-moderateur.component';
import { DemandeEstivageModerateurComponent } from './demande-estivage-moderateur/demande-estivage-moderateur.component';
import { EtatReclamationCreateModerateurComponent } from './etat-reclamation-moderateur/create-moderateur/etat-reclamation-create-moderateur.component';
import { EtatReclamationEditModerateurComponent } from './etat-reclamation-moderateur/edit-moderateur/etat-reclamation-edit-moderateur.component';
import { EtatReclamationViewModerateurComponent } from './etat-reclamation-moderateur/view-moderateur/etat-reclamation-view-moderateur.component';
import { EtatReclamationListModerateurComponent } from './etat-reclamation-moderateur/list-moderateur/etat-reclamation-list-moderateur.component';
import { EtatReclamationModerateurComponent } from './etat-reclamation-moderateur/etat-reclamation-moderateur.component';
import { EstivageCreateModerateurComponent } from './estivage-moderateur/create-moderateur/estivage-create-moderateur.component';
import { EstivageEditModerateurComponent } from './estivage-moderateur/edit-moderateur/estivage-edit-moderateur.component';
import { EstivageViewModerateurComponent } from './estivage-moderateur/view-moderateur/estivage-view-moderateur.component';
import { EstivageListModerateurComponent } from './estivage-moderateur/list-moderateur/estivage-list-moderateur.component';
import { EstivageModerateurComponent } from './estivage-moderateur/estivage-moderateur.component';
import { VilleCreateModerateurComponent } from './ville-moderateur/create-moderateur/ville-create-moderateur.component';
import { VilleEditModerateurComponent } from './ville-moderateur/edit-moderateur/ville-edit-moderateur.component';
import { VilleViewModerateurComponent } from './ville-moderateur/view-moderateur/ville-view-moderateur.component';
import { VilleListModerateurComponent } from './ville-moderateur/list-moderateur/ville-list-moderateur.component';
import { VilleModerateurComponent } from './ville-moderateur/ville-moderateur.component';
import { ProfilCreateModerateurComponent } from './profil-moderateur/create-moderateur/profil-create-moderateur.component';
import { ProfilEditModerateurComponent } from './profil-moderateur/edit-moderateur/profil-edit-moderateur.component';
import { ProfilViewModerateurComponent } from './profil-moderateur/view-moderateur/profil-view-moderateur.component';
import { ProfilListModerateurComponent } from './profil-moderateur/list-moderateur/profil-list-moderateur.component';
import { ProfilModerateurComponent } from './profil-moderateur/profil-moderateur.component';
import { ConventionCreateModerateurComponent } from './convention-moderateur/create-moderateur/convention-create-moderateur.component';
import { ConventionEditModerateurComponent } from './convention-moderateur/edit-moderateur/convention-edit-moderateur.component';
import { ConventionViewModerateurComponent } from './convention-moderateur/view-moderateur/convention-view-moderateur.component';
import { ConventionListModerateurComponent } from './convention-moderateur/list-moderateur/convention-list-moderateur.component';
import { ConventionModerateurComponent } from './convention-moderateur/convention-moderateur.component';
import { ImpressionCarteCreateModerateurComponent } from './impression-carte-moderateur/create-moderateur/impression-carte-create-moderateur.component';
import { ImpressionCarteEditModerateurComponent } from './impression-carte-moderateur/edit-moderateur/impression-carte-edit-moderateur.component';
import { ImpressionCarteViewModerateurComponent } from './impression-carte-moderateur/view-moderateur/impression-carte-view-moderateur.component';
import { ImpressionCarteListModerateurComponent } from './impression-carte-moderateur/list-moderateur/impression-carte-list-moderateur.component';
import { ImpressionCarteModerateurComponent } from './impression-carte-moderateur/impression-carte-moderateur.component';
import { PieceJointeEstivageCreateModerateurComponent } from './piece-jointe-estivage-moderateur/create-moderateur/piece-jointe-estivage-create-moderateur.component';
import { PieceJointeEstivageEditModerateurComponent } from './piece-jointe-estivage-moderateur/edit-moderateur/piece-jointe-estivage-edit-moderateur.component';
import { PieceJointeEstivageViewModerateurComponent } from './piece-jointe-estivage-moderateur/view-moderateur/piece-jointe-estivage-view-moderateur.component';
import { PieceJointeEstivageListModerateurComponent } from './piece-jointe-estivage-moderateur/list-moderateur/piece-jointe-estivage-list-moderateur.component';
import { PieceJointeEstivageModerateurComponent } from './piece-jointe-estivage-moderateur/piece-jointe-estivage-moderateur.component';
import { ProduitCreateModerateurComponent } from './produit-moderateur/create-moderateur/produit-create-moderateur.component';
import { ProduitEditModerateurComponent } from './produit-moderateur/edit-moderateur/produit-edit-moderateur.component';
import { ProduitViewModerateurComponent } from './produit-moderateur/view-moderateur/produit-view-moderateur.component';
import { ProduitListModerateurComponent } from './produit-moderateur/list-moderateur/produit-list-moderateur.component';
import { ProduitModerateurComponent } from './produit-moderateur/produit-moderateur.component';
import { StatutCreateModerateurComponent } from './statut-moderateur/create-moderateur/statut-create-moderateur.component';
import { StatutEditModerateurComponent } from './statut-moderateur/edit-moderateur/statut-edit-moderateur.component';
import { StatutViewModerateurComponent } from './statut-moderateur/view-moderateur/statut-view-moderateur.component';
import { StatutListModerateurComponent } from './statut-moderateur/list-moderateur/statut-list-moderateur.component';
import { StatutModerateurComponent } from './statut-moderateur/statut-moderateur.component';
import { EtatCarteCreateModerateurComponent } from './etat-carte-moderateur/create-moderateur/etat-carte-create-moderateur.component';
import { EtatCarteEditModerateurComponent } from './etat-carte-moderateur/edit-moderateur/etat-carte-edit-moderateur.component';
import { EtatCarteViewModerateurComponent } from './etat-carte-moderateur/view-moderateur/etat-carte-view-moderateur.component';
import { EtatCarteListModerateurComponent } from './etat-carte-moderateur/list-moderateur/etat-carte-list-moderateur.component';
import { EtatCarteModerateurComponent } from './etat-carte-moderateur/etat-carte-moderateur.component';
import { RegionCreateModerateurComponent } from './region-moderateur/create-moderateur/region-create-moderateur.component';
import { RegionEditModerateurComponent } from './region-moderateur/edit-moderateur/region-edit-moderateur.component';
import { RegionViewModerateurComponent } from './region-moderateur/view-moderateur/region-view-moderateur.component';
import { RegionListModerateurComponent } from './region-moderateur/list-moderateur/region-list-moderateur.component';
import { RegionModerateurComponent } from './region-moderateur/region-moderateur.component';
import { TacheCreateModerateurComponent } from './tache-moderateur/create-moderateur/tache-create-moderateur.component';
import { TacheEditModerateurComponent } from './tache-moderateur/edit-moderateur/tache-edit-moderateur.component';
import { TacheViewModerateurComponent } from './tache-moderateur/view-moderateur/tache-view-moderateur.component';
import { TacheListModerateurComponent } from './tache-moderateur/list-moderateur/tache-list-moderateur.component';
import { TacheModerateurComponent } from './tache-moderateur/tache-moderateur.component';
import { ReclamationCreateModerateurComponent } from './reclamation-moderateur/create-moderateur/reclamation-create-moderateur.component';
import { ReclamationEditModerateurComponent } from './reclamation-moderateur/edit-moderateur/reclamation-edit-moderateur.component';
import { ReclamationViewModerateurComponent } from './reclamation-moderateur/view-moderateur/reclamation-view-moderateur.component';
import { ReclamationListModerateurComponent } from './reclamation-moderateur/list-moderateur/reclamation-list-moderateur.component';
import { ReclamationModerateurComponent } from './reclamation-moderateur/reclamation-moderateur.component';
import { SituationModerateurCreateModerateurComponent } from './situation-moderateur-moderateur/create-moderateur/situation-moderateur-create-moderateur.component';
import { SituationModerateurEditModerateurComponent } from './situation-moderateur-moderateur/edit-moderateur/situation-moderateur-edit-moderateur.component';
import { SituationModerateurViewModerateurComponent } from './situation-moderateur-moderateur/view-moderateur/situation-moderateur-view-moderateur.component';
import { SituationModerateurListModerateurComponent } from './situation-moderateur-moderateur/list-moderateur/situation-moderateur-list-moderateur.component';
import { SituationModerateurModerateurComponent } from './situation-moderateur-moderateur/situation-moderateur-moderateur.component';
import { EtatPrestationCreateModerateurComponent } from './etat-prestation-moderateur/create-moderateur/etat-prestation-create-moderateur.component';
import { EtatPrestationEditModerateurComponent } from './etat-prestation-moderateur/edit-moderateur/etat-prestation-edit-moderateur.component';
import { EtatPrestationViewModerateurComponent } from './etat-prestation-moderateur/view-moderateur/etat-prestation-view-moderateur.component';
import { EtatPrestationListModerateurComponent } from './etat-prestation-moderateur/list-moderateur/etat-prestation-list-moderateur.component';
import { EtatPrestationModerateurComponent } from './etat-prestation-moderateur/etat-prestation-moderateur.component';
import { EnfantCreateModerateurComponent } from './enfant-moderateur/create-moderateur/enfant-create-moderateur.component';
import { EnfantEditModerateurComponent } from './enfant-moderateur/edit-moderateur/enfant-edit-moderateur.component';
import { EnfantViewModerateurComponent } from './enfant-moderateur/view-moderateur/enfant-view-moderateur.component';
import { EnfantListModerateurComponent } from './enfant-moderateur/list-moderateur/enfant-list-moderateur.component';
import { EnfantModerateurComponent } from './enfant-moderateur/enfant-moderateur.component';
import { MissionCreateModerateurComponent } from './mission-moderateur/create-moderateur/mission-create-moderateur.component';
import { MissionEditModerateurComponent } from './mission-moderateur/edit-moderateur/mission-edit-moderateur.component';
import { MissionViewModerateurComponent } from './mission-moderateur/view-moderateur/mission-view-moderateur.component';
import { MissionListModerateurComponent } from './mission-moderateur/list-moderateur/mission-list-moderateur.component';
import { MissionModerateurComponent } from './mission-moderateur/mission-moderateur.component';
import { PieceJointeMissionCreateModerateurComponent } from './piece-jointe-mission-moderateur/create-moderateur/piece-jointe-mission-create-moderateur.component';
import { PieceJointeMissionEditModerateurComponent } from './piece-jointe-mission-moderateur/edit-moderateur/piece-jointe-mission-edit-moderateur.component';
import { PieceJointeMissionViewModerateurComponent } from './piece-jointe-mission-moderateur/view-moderateur/piece-jointe-mission-view-moderateur.component';
import { PieceJointeMissionListModerateurComponent } from './piece-jointe-mission-moderateur/list-moderateur/piece-jointe-mission-list-moderateur.component';
import { PieceJointeMissionModerateurComponent } from './piece-jointe-mission-moderateur/piece-jointe-mission-moderateur.component';
import { DemandeEstivageCentreCreateModerateurComponent } from './demande-estivage-centre-moderateur/create-moderateur/demande-estivage-centre-create-moderateur.component';
import { DemandeEstivageCentreEditModerateurComponent } from './demande-estivage-centre-moderateur/edit-moderateur/demande-estivage-centre-edit-moderateur.component';
import { DemandeEstivageCentreViewModerateurComponent } from './demande-estivage-centre-moderateur/view-moderateur/demande-estivage-centre-view-moderateur.component';
import { DemandeEstivageCentreListModerateurComponent } from './demande-estivage-centre-moderateur/list-moderateur/demande-estivage-centre-list-moderateur.component';
import { DemandeEstivageCentreModerateurComponent } from './demande-estivage-centre-moderateur/demande-estivage-centre-moderateur.component';
import { NiveauImportanceCreateModerateurComponent } from './niveau-importance-moderateur/create-moderateur/niveau-importance-create-moderateur.component';
import { NiveauImportanceEditModerateurComponent } from './niveau-importance-moderateur/edit-moderateur/niveau-importance-edit-moderateur.component';
import { NiveauImportanceViewModerateurComponent } from './niveau-importance-moderateur/view-moderateur/niveau-importance-view-moderateur.component';
import { NiveauImportanceListModerateurComponent } from './niveau-importance-moderateur/list-moderateur/niveau-importance-list-moderateur.component';
import { NiveauImportanceModerateurComponent } from './niveau-importance-moderateur/niveau-importance-moderateur.component';
import { ChercheurCreateModerateurComponent } from './chercheur-moderateur/create-moderateur/chercheur-create-moderateur.component';
import { ChercheurEditModerateurComponent } from './chercheur-moderateur/edit-moderateur/chercheur-edit-moderateur.component';
import { ChercheurViewModerateurComponent } from './chercheur-moderateur/view-moderateur/chercheur-view-moderateur.component';
import { ChercheurListModerateurComponent } from './chercheur-moderateur/list-moderateur/chercheur-list-moderateur.component';
import { ChercheurModerateurComponent } from './chercheur-moderateur/chercheur-moderateur.component';
import { PieceJointeProduitCreateModerateurComponent } from './piece-jointe-produit-moderateur/create-moderateur/piece-jointe-produit-create-moderateur.component';
import { PieceJointeProduitEditModerateurComponent } from './piece-jointe-produit-moderateur/edit-moderateur/piece-jointe-produit-edit-moderateur.component';
import { PieceJointeProduitViewModerateurComponent } from './piece-jointe-produit-moderateur/view-moderateur/piece-jointe-produit-view-moderateur.component';
import { PieceJointeProduitListModerateurComponent } from './piece-jointe-produit-moderateur/list-moderateur/piece-jointe-produit-list-moderateur.component';
import { PieceJointeProduitModerateurComponent } from './piece-jointe-produit-moderateur/piece-jointe-produit-moderateur.component';
import { ProjetCreateModerateurComponent } from './projet-moderateur/create-moderateur/projet-create-moderateur.component';
import { ProjetEditModerateurComponent } from './projet-moderateur/edit-moderateur/projet-edit-moderateur.component';
import { ProjetViewModerateurComponent } from './projet-moderateur/view-moderateur/projet-view-moderateur.component';
import { ProjetListModerateurComponent } from './projet-moderateur/list-moderateur/projet-list-moderateur.component';
import { ProjetModerateurComponent } from './projet-moderateur/projet-moderateur.component';
import { PieceJointeConventionCreateModerateurComponent } from './piece-jointe-convention-moderateur/create-moderateur/piece-jointe-convention-create-moderateur.component';
import { PieceJointeConventionEditModerateurComponent } from './piece-jointe-convention-moderateur/edit-moderateur/piece-jointe-convention-edit-moderateur.component';
import { PieceJointeConventionViewModerateurComponent } from './piece-jointe-convention-moderateur/view-moderateur/piece-jointe-convention-view-moderateur.component';
import { PieceJointeConventionListModerateurComponent } from './piece-jointe-convention-moderateur/list-moderateur/piece-jointe-convention-list-moderateur.component';
import { PieceJointeConventionModerateurComponent } from './piece-jointe-convention-moderateur/piece-jointe-convention-moderateur.component';
import { EchelonCreateModerateurComponent } from './echelon-moderateur/create-moderateur/echelon-create-moderateur.component';
import { EchelonEditModerateurComponent } from './echelon-moderateur/edit-moderateur/echelon-edit-moderateur.component';
import { EchelonViewModerateurComponent } from './echelon-moderateur/view-moderateur/echelon-view-moderateur.component';
import { EchelonListModerateurComponent } from './echelon-moderateur/list-moderateur/echelon-list-moderateur.component';
import { EchelonModerateurComponent } from './echelon-moderateur/echelon-moderateur.component';
import { PrestationCreateModerateurComponent } from './prestation-moderateur/create-moderateur/prestation-create-moderateur.component';
import { PrestationEditModerateurComponent } from './prestation-moderateur/edit-moderateur/prestation-edit-moderateur.component';
import { PrestationViewModerateurComponent } from './prestation-moderateur/view-moderateur/prestation-view-moderateur.component';
import { PrestationListModerateurComponent } from './prestation-moderateur/list-moderateur/prestation-list-moderateur.component';
import { PrestationModerateurComponent } from './prestation-moderateur/prestation-moderateur.component';
import { PieceJointeProjetCreateModerateurComponent } from './piece-jointe-projet-moderateur/create-moderateur/piece-jointe-projet-create-moderateur.component';
import { PieceJointeProjetEditModerateurComponent } from './piece-jointe-projet-moderateur/edit-moderateur/piece-jointe-projet-edit-moderateur.component';
import { PieceJointeProjetViewModerateurComponent } from './piece-jointe-projet-moderateur/view-moderateur/piece-jointe-projet-view-moderateur.component';
import { PieceJointeProjetListModerateurComponent } from './piece-jointe-projet-moderateur/list-moderateur/piece-jointe-projet-list-moderateur.component';
import { PieceJointeProjetModerateurComponent } from './piece-jointe-projet-moderateur/piece-jointe-projet-moderateur.component';
import { PieceJointeReclamationCreateModerateurComponent } from './piece-jointe-reclamation-moderateur/create-moderateur/piece-jointe-reclamation-create-moderateur.component';
import { PieceJointeReclamationEditModerateurComponent } from './piece-jointe-reclamation-moderateur/edit-moderateur/piece-jointe-reclamation-edit-moderateur.component';
import { PieceJointeReclamationViewModerateurComponent } from './piece-jointe-reclamation-moderateur/view-moderateur/piece-jointe-reclamation-view-moderateur.component';
import { PieceJointeReclamationListModerateurComponent } from './piece-jointe-reclamation-moderateur/list-moderateur/piece-jointe-reclamation-list-moderateur.component';
import { PieceJointeReclamationModerateurComponent } from './piece-jointe-reclamation-moderateur/piece-jointe-reclamation-moderateur.component';
import { EchelleCreateModerateurComponent } from './echelle-moderateur/create-moderateur/echelle-create-moderateur.component';
import { EchelleEditModerateurComponent } from './echelle-moderateur/edit-moderateur/echelle-edit-moderateur.component';
import { EchelleViewModerateurComponent } from './echelle-moderateur/view-moderateur/echelle-view-moderateur.component';
import { EchelleListModerateurComponent } from './echelle-moderateur/list-moderateur/echelle-list-moderateur.component';
import { EchelleModerateurComponent } from './echelle-moderateur/echelle-moderateur.component';
import { TypePrestationCreateModerateurComponent } from './type-prestation-moderateur/create-moderateur/type-prestation-create-moderateur.component';
import { TypePrestationEditModerateurComponent } from './type-prestation-moderateur/edit-moderateur/type-prestation-edit-moderateur.component';
import { TypePrestationViewModerateurComponent } from './type-prestation-moderateur/view-moderateur/type-prestation-view-moderateur.component';
import { TypePrestationListModerateurComponent } from './type-prestation-moderateur/list-moderateur/type-prestation-list-moderateur.component';
import { TypePrestationModerateurComponent } from './type-prestation-moderateur/type-prestation-moderateur.component';
import { OrganismeCreateModerateurComponent } from './organisme-moderateur/create-moderateur/organisme-create-moderateur.component';
import { OrganismeEditModerateurComponent } from './organisme-moderateur/edit-moderateur/organisme-edit-moderateur.component';
import { OrganismeViewModerateurComponent } from './organisme-moderateur/view-moderateur/organisme-view-moderateur.component';
import { OrganismeListModerateurComponent } from './organisme-moderateur/list-moderateur/organisme-list-moderateur.component';
import { OrganismeModerateurComponent } from './organisme-moderateur/organisme-moderateur.component';
import { EtatTacheCreateModerateurComponent } from './etat-tache-moderateur/create-moderateur/etat-tache-create-moderateur.component';
import { EtatTacheEditModerateurComponent } from './etat-tache-moderateur/edit-moderateur/etat-tache-edit-moderateur.component';
import { EtatTacheViewModerateurComponent } from './etat-tache-moderateur/view-moderateur/etat-tache-view-moderateur.component';
import { EtatTacheListModerateurComponent } from './etat-tache-moderateur/list-moderateur/etat-tache-list-moderateur.component';
import { EtatTacheModerateurComponent } from './etat-tache-moderateur/etat-tache-moderateur.component';
import { ConjointCreateModerateurComponent } from './conjoint-moderateur/create-moderateur/conjoint-create-moderateur.component';
import { ConjointEditModerateurComponent } from './conjoint-moderateur/edit-moderateur/conjoint-edit-moderateur.component';
import { ConjointViewModerateurComponent } from './conjoint-moderateur/view-moderateur/conjoint-view-moderateur.component';
import { ConjointListModerateurComponent } from './conjoint-moderateur/list-moderateur/conjoint-list-moderateur.component';
import { ConjointModerateurComponent } from './conjoint-moderateur/conjoint-moderateur.component';
import { PieceJointeRendezVousCreateModerateurComponent } from './piece-jointe-rendez-vous-moderateur/create-moderateur/piece-jointe-rendez-vous-create-moderateur.component';
import { PieceJointeRendezVousEditModerateurComponent } from './piece-jointe-rendez-vous-moderateur/edit-moderateur/piece-jointe-rendez-vous-edit-moderateur.component';
import { PieceJointeRendezVousViewModerateurComponent } from './piece-jointe-rendez-vous-moderateur/view-moderateur/piece-jointe-rendez-vous-view-moderateur.component';
import { PieceJointeRendezVousListModerateurComponent } from './piece-jointe-rendez-vous-moderateur/list-moderateur/piece-jointe-rendez-vous-list-moderateur.component';
import { PieceJointeRendezVousModerateurComponent } from './piece-jointe-rendez-vous-moderateur/piece-jointe-rendez-vous-moderateur.component';
import { PieceJointePrestationCreateModerateurComponent } from './piece-jointe-prestation-moderateur/create-moderateur/piece-jointe-prestation-create-moderateur.component';
import { PieceJointePrestationEditModerateurComponent } from './piece-jointe-prestation-moderateur/edit-moderateur/piece-jointe-prestation-edit-moderateur.component';
import { PieceJointePrestationViewModerateurComponent } from './piece-jointe-prestation-moderateur/view-moderateur/piece-jointe-prestation-view-moderateur.component';
import { PieceJointePrestationListModerateurComponent } from './piece-jointe-prestation-moderateur/list-moderateur/piece-jointe-prestation-list-moderateur.component';
import { PieceJointePrestationModerateurComponent } from './piece-jointe-prestation-moderateur/piece-jointe-prestation-moderateur.component';
import { CentreEstivageCreateModerateurComponent } from './centre-estivage-moderateur/create-moderateur/centre-estivage-create-moderateur.component';
import { CentreEstivageEditModerateurComponent } from './centre-estivage-moderateur/edit-moderateur/centre-estivage-edit-moderateur.component';
import { CentreEstivageViewModerateurComponent } from './centre-estivage-moderateur/view-moderateur/centre-estivage-view-moderateur.component';
import { CentreEstivageListModerateurComponent } from './centre-estivage-moderateur/list-moderateur/centre-estivage-list-moderateur.component';
import { CentreEstivageModerateurComponent } from './centre-estivage-moderateur/centre-estivage-moderateur.component';
import { PieceJointeAdherentCreateModerateurComponent } from './piece-jointe-adherent-moderateur/create-moderateur/piece-jointe-adherent-create-moderateur.component';
import { PieceJointeAdherentEditModerateurComponent } from './piece-jointe-adherent-moderateur/edit-moderateur/piece-jointe-adherent-edit-moderateur.component';
import { PieceJointeAdherentViewModerateurComponent } from './piece-jointe-adherent-moderateur/view-moderateur/piece-jointe-adherent-view-moderateur.component';
import { PieceJointeAdherentListModerateurComponent } from './piece-jointe-adherent-moderateur/list-moderateur/piece-jointe-adherent-list-moderateur.component';
import { PieceJointeAdherentModerateurComponent } from './piece-jointe-adherent-moderateur/piece-jointe-adherent-moderateur.component';
import { GestionReclamationCreateModerateurComponent } from './gestion-reclamation-moderateur/create-moderateur/gestion-reclamation-create-moderateur.component';
import { GestionReclamationEditModerateurComponent } from './gestion-reclamation-moderateur/edit-moderateur/gestion-reclamation-edit-moderateur.component';
import { GestionReclamationViewModerateurComponent } from './gestion-reclamation-moderateur/view-moderateur/gestion-reclamation-view-moderateur.component';
import { GestionReclamationListModerateurComponent } from './gestion-reclamation-moderateur/list-moderateur/gestion-reclamation-list-moderateur.component';
import { GestionReclamationModerateurComponent } from './gestion-reclamation-moderateur/gestion-reclamation-moderateur.component';
import { FonctionCreateModerateurComponent } from './fonction-moderateur/create-moderateur/fonction-create-moderateur.component';
import { FonctionEditModerateurComponent } from './fonction-moderateur/edit-moderateur/fonction-edit-moderateur.component';
import { FonctionViewModerateurComponent } from './fonction-moderateur/view-moderateur/fonction-view-moderateur.component';
import { FonctionListModerateurComponent } from './fonction-moderateur/list-moderateur/fonction-list-moderateur.component';
import { FonctionModerateurComponent } from './fonction-moderateur/fonction-moderateur.component';
import { EtatDemandeEstivageCreateModerateurComponent } from './etat-demande-estivage-moderateur/create-moderateur/etat-demande-estivage-create-moderateur.component';
import { EtatDemandeEstivageEditModerateurComponent } from './etat-demande-estivage-moderateur/edit-moderateur/etat-demande-estivage-edit-moderateur.component';
import { EtatDemandeEstivageViewModerateurComponent } from './etat-demande-estivage-moderateur/view-moderateur/etat-demande-estivage-view-moderateur.component';
import { EtatDemandeEstivageListModerateurComponent } from './etat-demande-estivage-moderateur/list-moderateur/etat-demande-estivage-list-moderateur.component';
import { EtatDemandeEstivageModerateurComponent } from './etat-demande-estivage-moderateur/etat-demande-estivage-moderateur.component';
import { GradeCreateModerateurComponent } from './grade-moderateur/create-moderateur/grade-create-moderateur.component';
import { GradeEditModerateurComponent } from './grade-moderateur/edit-moderateur/grade-edit-moderateur.component';
import { GradeViewModerateurComponent } from './grade-moderateur/view-moderateur/grade-view-moderateur.component';
import { GradeListModerateurComponent } from './grade-moderateur/list-moderateur/grade-list-moderateur.component';
import { GradeModerateurComponent } from './grade-moderateur/grade-moderateur.component';
import { EstivageCentreEstivageCreateModerateurComponent } from './estivage-centre-estivage-moderateur/create-moderateur/estivage-centre-estivage-create-moderateur.component';
import { EstivageCentreEstivageEditModerateurComponent } from './estivage-centre-estivage-moderateur/edit-moderateur/estivage-centre-estivage-edit-moderateur.component';
import { EstivageCentreEstivageViewModerateurComponent } from './estivage-centre-estivage-moderateur/view-moderateur/estivage-centre-estivage-view-moderateur.component';
import { EstivageCentreEstivageListModerateurComponent } from './estivage-centre-estivage-moderateur/list-moderateur/estivage-centre-estivage-list-moderateur.component';
import { EstivageCentreEstivageModerateurComponent } from './estivage-centre-estivage-moderateur/estivage-centre-estivage-moderateur.component';
import { EtatProjetCreateModerateurComponent } from './etat-projet-moderateur/create-moderateur/etat-projet-create-moderateur.component';
import { EtatProjetEditModerateurComponent } from './etat-projet-moderateur/edit-moderateur/etat-projet-edit-moderateur.component';
import { EtatProjetViewModerateurComponent } from './etat-projet-moderateur/view-moderateur/etat-projet-view-moderateur.component';
import { EtatProjetListModerateurComponent } from './etat-projet-moderateur/list-moderateur/etat-projet-list-moderateur.component';
import { EtatProjetModerateurComponent } from './etat-projet-moderateur/etat-projet-moderateur.component';
import { QualiteCreateModerateurComponent } from './qualite-moderateur/create-moderateur/qualite-create-moderateur.component';
import { QualiteEditModerateurComponent } from './qualite-moderateur/edit-moderateur/qualite-edit-moderateur.component';
import { QualiteViewModerateurComponent } from './qualite-moderateur/view-moderateur/qualite-view-moderateur.component';
import { QualiteListModerateurComponent } from './qualite-moderateur/list-moderateur/qualite-list-moderateur.component';
import { QualiteModerateurComponent } from './qualite-moderateur/qualite-moderateur.component';
import { RendezVousCreateModerateurComponent } from './rendez-vous-moderateur/create-moderateur/rendez-vous-create-moderateur.component';
import { RendezVousEditModerateurComponent } from './rendez-vous-moderateur/edit-moderateur/rendez-vous-edit-moderateur.component';
import { RendezVousViewModerateurComponent } from './rendez-vous-moderateur/view-moderateur/rendez-vous-view-moderateur.component';
import { RendezVousListModerateurComponent } from './rendez-vous-moderateur/list-moderateur/rendez-vous-list-moderateur.component';
import { RendezVousModerateurComponent } from './rendez-vous-moderateur/rendez-vous-moderateur.component';
import { ModerateurCreateModerateurComponent } from './moderateur-moderateur/create-moderateur/moderateur-create-moderateur.component';
import { ModerateurEditModerateurComponent } from './moderateur-moderateur/edit-moderateur/moderateur-edit-moderateur.component';
import { ModerateurViewModerateurComponent } from './moderateur-moderateur/view-moderateur/moderateur-view-moderateur.component';
import { ModerateurListModerateurComponent } from './moderateur-moderateur/list-moderateur/moderateur-list-moderateur.component';
import { ModerateurModerateurComponent } from './moderateur-moderateur/moderateur-moderateur.component';

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

    AdherentCreateModerateurComponent,
    AdherentListModerateurComponent,
    AdherentViewModerateurComponent,
    AdherentEditModerateurComponent,
    AdherentModerateurComponent,
    DemandeEstivageCreateModerateurComponent,
    DemandeEstivageListModerateurComponent,
    DemandeEstivageViewModerateurComponent,
    DemandeEstivageEditModerateurComponent,
    DemandeEstivageModerateurComponent,
    EtatReclamationCreateModerateurComponent,
    EtatReclamationListModerateurComponent,
    EtatReclamationViewModerateurComponent,
    EtatReclamationEditModerateurComponent,
    EtatReclamationModerateurComponent,
    EstivageCreateModerateurComponent,
    EstivageListModerateurComponent,
    EstivageViewModerateurComponent,
    EstivageEditModerateurComponent,
    EstivageModerateurComponent,
    VilleCreateModerateurComponent,
    VilleListModerateurComponent,
    VilleViewModerateurComponent,
    VilleEditModerateurComponent,
    VilleModerateurComponent,
    ProfilCreateModerateurComponent,
    ProfilListModerateurComponent,
    ProfilViewModerateurComponent,
    ProfilEditModerateurComponent,
    ProfilModerateurComponent,
    ConventionCreateModerateurComponent,
    ConventionListModerateurComponent,
    ConventionViewModerateurComponent,
    ConventionEditModerateurComponent,
    ConventionModerateurComponent,
    ImpressionCarteCreateModerateurComponent,
    ImpressionCarteListModerateurComponent,
    ImpressionCarteViewModerateurComponent,
    ImpressionCarteEditModerateurComponent,
    ImpressionCarteModerateurComponent,
    PieceJointeEstivageCreateModerateurComponent,
    PieceJointeEstivageListModerateurComponent,
    PieceJointeEstivageViewModerateurComponent,
    PieceJointeEstivageEditModerateurComponent,
    PieceJointeEstivageModerateurComponent,
    ProduitCreateModerateurComponent,
    ProduitListModerateurComponent,
    ProduitViewModerateurComponent,
    ProduitEditModerateurComponent,
    ProduitModerateurComponent,
    StatutCreateModerateurComponent,
    StatutListModerateurComponent,
    StatutViewModerateurComponent,
    StatutEditModerateurComponent,
    StatutModerateurComponent,
    EtatCarteCreateModerateurComponent,
    EtatCarteListModerateurComponent,
    EtatCarteViewModerateurComponent,
    EtatCarteEditModerateurComponent,
    EtatCarteModerateurComponent,
    RegionCreateModerateurComponent,
    RegionListModerateurComponent,
    RegionViewModerateurComponent,
    RegionEditModerateurComponent,
    RegionModerateurComponent,
    TacheCreateModerateurComponent,
    TacheListModerateurComponent,
    TacheViewModerateurComponent,
    TacheEditModerateurComponent,
    TacheModerateurComponent,
    ReclamationCreateModerateurComponent,
    ReclamationListModerateurComponent,
    ReclamationViewModerateurComponent,
    ReclamationEditModerateurComponent,
    ReclamationModerateurComponent,
    SituationModerateurCreateModerateurComponent,
    SituationModerateurListModerateurComponent,
    SituationModerateurViewModerateurComponent,
    SituationModerateurEditModerateurComponent,
    SituationModerateurModerateurComponent,
    EtatPrestationCreateModerateurComponent,
    EtatPrestationListModerateurComponent,
    EtatPrestationViewModerateurComponent,
    EtatPrestationEditModerateurComponent,
    EtatPrestationModerateurComponent,
    EnfantCreateModerateurComponent,
    EnfantListModerateurComponent,
    EnfantViewModerateurComponent,
    EnfantEditModerateurComponent,
    EnfantModerateurComponent,
    MissionCreateModerateurComponent,
    MissionListModerateurComponent,
    MissionViewModerateurComponent,
    MissionEditModerateurComponent,
    MissionModerateurComponent,
    PieceJointeMissionCreateModerateurComponent,
    PieceJointeMissionListModerateurComponent,
    PieceJointeMissionViewModerateurComponent,
    PieceJointeMissionEditModerateurComponent,
    PieceJointeMissionModerateurComponent,
    DemandeEstivageCentreCreateModerateurComponent,
    DemandeEstivageCentreListModerateurComponent,
    DemandeEstivageCentreViewModerateurComponent,
    DemandeEstivageCentreEditModerateurComponent,
    DemandeEstivageCentreModerateurComponent,
    NiveauImportanceCreateModerateurComponent,
    NiveauImportanceListModerateurComponent,
    NiveauImportanceViewModerateurComponent,
    NiveauImportanceEditModerateurComponent,
    NiveauImportanceModerateurComponent,
    ChercheurCreateModerateurComponent,
    ChercheurListModerateurComponent,
    ChercheurViewModerateurComponent,
    ChercheurEditModerateurComponent,
    ChercheurModerateurComponent,
    PieceJointeProduitCreateModerateurComponent,
    PieceJointeProduitListModerateurComponent,
    PieceJointeProduitViewModerateurComponent,
    PieceJointeProduitEditModerateurComponent,
    PieceJointeProduitModerateurComponent,
    ProjetCreateModerateurComponent,
    ProjetListModerateurComponent,
    ProjetViewModerateurComponent,
    ProjetEditModerateurComponent,
    ProjetModerateurComponent,
    PieceJointeConventionCreateModerateurComponent,
    PieceJointeConventionListModerateurComponent,
    PieceJointeConventionViewModerateurComponent,
    PieceJointeConventionEditModerateurComponent,
    PieceJointeConventionModerateurComponent,
    EchelonCreateModerateurComponent,
    EchelonListModerateurComponent,
    EchelonViewModerateurComponent,
    EchelonEditModerateurComponent,
    EchelonModerateurComponent,
    PrestationCreateModerateurComponent,
    PrestationListModerateurComponent,
    PrestationViewModerateurComponent,
    PrestationEditModerateurComponent,
    PrestationModerateurComponent,
    PieceJointeProjetCreateModerateurComponent,
    PieceJointeProjetListModerateurComponent,
    PieceJointeProjetViewModerateurComponent,
    PieceJointeProjetEditModerateurComponent,
    PieceJointeProjetModerateurComponent,
    PieceJointeReclamationCreateModerateurComponent,
    PieceJointeReclamationListModerateurComponent,
    PieceJointeReclamationViewModerateurComponent,
    PieceJointeReclamationEditModerateurComponent,
    PieceJointeReclamationModerateurComponent,
    EchelleCreateModerateurComponent,
    EchelleListModerateurComponent,
    EchelleViewModerateurComponent,
    EchelleEditModerateurComponent,
    EchelleModerateurComponent,
    TypePrestationCreateModerateurComponent,
    TypePrestationListModerateurComponent,
    TypePrestationViewModerateurComponent,
    TypePrestationEditModerateurComponent,
    TypePrestationModerateurComponent,
    OrganismeCreateModerateurComponent,
    OrganismeListModerateurComponent,
    OrganismeViewModerateurComponent,
    OrganismeEditModerateurComponent,
    OrganismeModerateurComponent,
    EtatTacheCreateModerateurComponent,
    EtatTacheListModerateurComponent,
    EtatTacheViewModerateurComponent,
    EtatTacheEditModerateurComponent,
    EtatTacheModerateurComponent,
    ConjointCreateModerateurComponent,
    ConjointListModerateurComponent,
    ConjointViewModerateurComponent,
    ConjointEditModerateurComponent,
    ConjointModerateurComponent,
    PieceJointeRendezVousCreateModerateurComponent,
    PieceJointeRendezVousListModerateurComponent,
    PieceJointeRendezVousViewModerateurComponent,
    PieceJointeRendezVousEditModerateurComponent,
    PieceJointeRendezVousModerateurComponent,
    PieceJointePrestationCreateModerateurComponent,
    PieceJointePrestationListModerateurComponent,
    PieceJointePrestationViewModerateurComponent,
    PieceJointePrestationEditModerateurComponent,
    PieceJointePrestationModerateurComponent,
    CentreEstivageCreateModerateurComponent,
    CentreEstivageListModerateurComponent,
    CentreEstivageViewModerateurComponent,
    CentreEstivageEditModerateurComponent,
    CentreEstivageModerateurComponent,
    PieceJointeAdherentCreateModerateurComponent,
    PieceJointeAdherentListModerateurComponent,
    PieceJointeAdherentViewModerateurComponent,
    PieceJointeAdherentEditModerateurComponent,
    PieceJointeAdherentModerateurComponent,
    GestionReclamationCreateModerateurComponent,
    GestionReclamationListModerateurComponent,
    GestionReclamationViewModerateurComponent,
    GestionReclamationEditModerateurComponent,
    GestionReclamationModerateurComponent,
    FonctionCreateModerateurComponent,
    FonctionListModerateurComponent,
    FonctionViewModerateurComponent,
    FonctionEditModerateurComponent,
    FonctionModerateurComponent,
    EtatDemandeEstivageCreateModerateurComponent,
    EtatDemandeEstivageListModerateurComponent,
    EtatDemandeEstivageViewModerateurComponent,
    EtatDemandeEstivageEditModerateurComponent,
    EtatDemandeEstivageModerateurComponent,
    GradeCreateModerateurComponent,
    GradeListModerateurComponent,
    GradeViewModerateurComponent,
    GradeEditModerateurComponent,
    GradeModerateurComponent,
    EstivageCentreEstivageCreateModerateurComponent,
    EstivageCentreEstivageListModerateurComponent,
    EstivageCentreEstivageViewModerateurComponent,
    EstivageCentreEstivageEditModerateurComponent,
    EstivageCentreEstivageModerateurComponent,
    EtatProjetCreateModerateurComponent,
    EtatProjetListModerateurComponent,
    EtatProjetViewModerateurComponent,
    EtatProjetEditModerateurComponent,
    EtatProjetModerateurComponent,
    QualiteCreateModerateurComponent,
    QualiteListModerateurComponent,
    QualiteViewModerateurComponent,
    QualiteEditModerateurComponent,
    QualiteModerateurComponent,
    RendezVousCreateModerateurComponent,
    RendezVousListModerateurComponent,
    RendezVousViewModerateurComponent,
    RendezVousEditModerateurComponent,
    RendezVousModerateurComponent,
    ModerateurCreateModerateurComponent,
    ModerateurListModerateurComponent,
    ModerateurViewModerateurComponent,
    ModerateurEditModerateurComponent,
    ModerateurModerateurComponent,
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
  AdherentCreateModerateurComponent,
  AdherentListModerateurComponent,
  AdherentViewModerateurComponent,
  AdherentEditModerateurComponent,
  AdherentModerateurComponent,
  DemandeEstivageCreateModerateurComponent,
  DemandeEstivageListModerateurComponent,
  DemandeEstivageViewModerateurComponent,
  DemandeEstivageEditModerateurComponent,
  DemandeEstivageModerateurComponent,
  EtatReclamationCreateModerateurComponent,
  EtatReclamationListModerateurComponent,
  EtatReclamationViewModerateurComponent,
  EtatReclamationEditModerateurComponent,
  EtatReclamationModerateurComponent,
  EstivageCreateModerateurComponent,
  EstivageListModerateurComponent,
  EstivageViewModerateurComponent,
  EstivageEditModerateurComponent,
  EstivageModerateurComponent,
  VilleCreateModerateurComponent,
  VilleListModerateurComponent,
  VilleViewModerateurComponent,
  VilleEditModerateurComponent,
  VilleModerateurComponent,
  ProfilCreateModerateurComponent,
  ProfilListModerateurComponent,
  ProfilViewModerateurComponent,
  ProfilEditModerateurComponent,
  ProfilModerateurComponent,
  ConventionCreateModerateurComponent,
  ConventionListModerateurComponent,
  ConventionViewModerateurComponent,
  ConventionEditModerateurComponent,
  ConventionModerateurComponent,
  ImpressionCarteCreateModerateurComponent,
  ImpressionCarteListModerateurComponent,
  ImpressionCarteViewModerateurComponent,
  ImpressionCarteEditModerateurComponent,
  ImpressionCarteModerateurComponent,
  PieceJointeEstivageCreateModerateurComponent,
  PieceJointeEstivageListModerateurComponent,
  PieceJointeEstivageViewModerateurComponent,
  PieceJointeEstivageEditModerateurComponent,
  PieceJointeEstivageModerateurComponent,
  ProduitCreateModerateurComponent,
  ProduitListModerateurComponent,
  ProduitViewModerateurComponent,
  ProduitEditModerateurComponent,
  ProduitModerateurComponent,
  StatutCreateModerateurComponent,
  StatutListModerateurComponent,
  StatutViewModerateurComponent,
  StatutEditModerateurComponent,
  StatutModerateurComponent,
  EtatCarteCreateModerateurComponent,
  EtatCarteListModerateurComponent,
  EtatCarteViewModerateurComponent,
  EtatCarteEditModerateurComponent,
  EtatCarteModerateurComponent,
  RegionCreateModerateurComponent,
  RegionListModerateurComponent,
  RegionViewModerateurComponent,
  RegionEditModerateurComponent,
  RegionModerateurComponent,
  TacheCreateModerateurComponent,
  TacheListModerateurComponent,
  TacheViewModerateurComponent,
  TacheEditModerateurComponent,
  TacheModerateurComponent,
  ReclamationCreateModerateurComponent,
  ReclamationListModerateurComponent,
  ReclamationViewModerateurComponent,
  ReclamationEditModerateurComponent,
  ReclamationModerateurComponent,
  SituationModerateurCreateModerateurComponent,
  SituationModerateurListModerateurComponent,
  SituationModerateurViewModerateurComponent,
  SituationModerateurEditModerateurComponent,
  SituationModerateurModerateurComponent,
  EtatPrestationCreateModerateurComponent,
  EtatPrestationListModerateurComponent,
  EtatPrestationViewModerateurComponent,
  EtatPrestationEditModerateurComponent,
  EtatPrestationModerateurComponent,
  EnfantCreateModerateurComponent,
  EnfantListModerateurComponent,
  EnfantViewModerateurComponent,
  EnfantEditModerateurComponent,
  EnfantModerateurComponent,
  MissionCreateModerateurComponent,
  MissionListModerateurComponent,
  MissionViewModerateurComponent,
  MissionEditModerateurComponent,
  MissionModerateurComponent,
  PieceJointeMissionCreateModerateurComponent,
  PieceJointeMissionListModerateurComponent,
  PieceJointeMissionViewModerateurComponent,
  PieceJointeMissionEditModerateurComponent,
  PieceJointeMissionModerateurComponent,
  DemandeEstivageCentreCreateModerateurComponent,
  DemandeEstivageCentreListModerateurComponent,
  DemandeEstivageCentreViewModerateurComponent,
  DemandeEstivageCentreEditModerateurComponent,
  DemandeEstivageCentreModerateurComponent,
  NiveauImportanceCreateModerateurComponent,
  NiveauImportanceListModerateurComponent,
  NiveauImportanceViewModerateurComponent,
  NiveauImportanceEditModerateurComponent,
  NiveauImportanceModerateurComponent,
  ChercheurCreateModerateurComponent,
  ChercheurListModerateurComponent,
  ChercheurViewModerateurComponent,
  ChercheurEditModerateurComponent,
  ChercheurModerateurComponent,
  PieceJointeProduitCreateModerateurComponent,
  PieceJointeProduitListModerateurComponent,
  PieceJointeProduitViewModerateurComponent,
  PieceJointeProduitEditModerateurComponent,
  PieceJointeProduitModerateurComponent,
  ProjetCreateModerateurComponent,
  ProjetListModerateurComponent,
  ProjetViewModerateurComponent,
  ProjetEditModerateurComponent,
  ProjetModerateurComponent,
  PieceJointeConventionCreateModerateurComponent,
  PieceJointeConventionListModerateurComponent,
  PieceJointeConventionViewModerateurComponent,
  PieceJointeConventionEditModerateurComponent,
  PieceJointeConventionModerateurComponent,
  EchelonCreateModerateurComponent,
  EchelonListModerateurComponent,
  EchelonViewModerateurComponent,
  EchelonEditModerateurComponent,
  EchelonModerateurComponent,
  PrestationCreateModerateurComponent,
  PrestationListModerateurComponent,
  PrestationViewModerateurComponent,
  PrestationEditModerateurComponent,
  PrestationModerateurComponent,
  PieceJointeProjetCreateModerateurComponent,
  PieceJointeProjetListModerateurComponent,
  PieceJointeProjetViewModerateurComponent,
  PieceJointeProjetEditModerateurComponent,
  PieceJointeProjetModerateurComponent,
  PieceJointeReclamationCreateModerateurComponent,
  PieceJointeReclamationListModerateurComponent,
  PieceJointeReclamationViewModerateurComponent,
  PieceJointeReclamationEditModerateurComponent,
  PieceJointeReclamationModerateurComponent,
  EchelleCreateModerateurComponent,
  EchelleListModerateurComponent,
  EchelleViewModerateurComponent,
  EchelleEditModerateurComponent,
  EchelleModerateurComponent,
  TypePrestationCreateModerateurComponent,
  TypePrestationListModerateurComponent,
  TypePrestationViewModerateurComponent,
  TypePrestationEditModerateurComponent,
  TypePrestationModerateurComponent,
  OrganismeCreateModerateurComponent,
  OrganismeListModerateurComponent,
  OrganismeViewModerateurComponent,
  OrganismeEditModerateurComponent,
  OrganismeModerateurComponent,
  EtatTacheCreateModerateurComponent,
  EtatTacheListModerateurComponent,
  EtatTacheViewModerateurComponent,
  EtatTacheEditModerateurComponent,
  EtatTacheModerateurComponent,
  ConjointCreateModerateurComponent,
  ConjointListModerateurComponent,
  ConjointViewModerateurComponent,
  ConjointEditModerateurComponent,
  ConjointModerateurComponent,
  PieceJointeRendezVousCreateModerateurComponent,
  PieceJointeRendezVousListModerateurComponent,
  PieceJointeRendezVousViewModerateurComponent,
  PieceJointeRendezVousEditModerateurComponent,
  PieceJointeRendezVousModerateurComponent,
  PieceJointePrestationCreateModerateurComponent,
  PieceJointePrestationListModerateurComponent,
  PieceJointePrestationViewModerateurComponent,
  PieceJointePrestationEditModerateurComponent,
  PieceJointePrestationModerateurComponent,
  CentreEstivageCreateModerateurComponent,
  CentreEstivageListModerateurComponent,
  CentreEstivageViewModerateurComponent,
  CentreEstivageEditModerateurComponent,
  CentreEstivageModerateurComponent,
  PieceJointeAdherentCreateModerateurComponent,
  PieceJointeAdherentListModerateurComponent,
  PieceJointeAdherentViewModerateurComponent,
  PieceJointeAdherentEditModerateurComponent,
  PieceJointeAdherentModerateurComponent,
  GestionReclamationCreateModerateurComponent,
  GestionReclamationListModerateurComponent,
  GestionReclamationViewModerateurComponent,
  GestionReclamationEditModerateurComponent,
  GestionReclamationModerateurComponent,
  FonctionCreateModerateurComponent,
  FonctionListModerateurComponent,
  FonctionViewModerateurComponent,
  FonctionEditModerateurComponent,
  FonctionModerateurComponent,
  EtatDemandeEstivageCreateModerateurComponent,
  EtatDemandeEstivageListModerateurComponent,
  EtatDemandeEstivageViewModerateurComponent,
  EtatDemandeEstivageEditModerateurComponent,
  EtatDemandeEstivageModerateurComponent,
  GradeCreateModerateurComponent,
  GradeListModerateurComponent,
  GradeViewModerateurComponent,
  GradeEditModerateurComponent,
  GradeModerateurComponent,
  EstivageCentreEstivageCreateModerateurComponent,
  EstivageCentreEstivageListModerateurComponent,
  EstivageCentreEstivageViewModerateurComponent,
  EstivageCentreEstivageEditModerateurComponent,
  EstivageCentreEstivageModerateurComponent,
  EtatProjetCreateModerateurComponent,
  EtatProjetListModerateurComponent,
  EtatProjetViewModerateurComponent,
  EtatProjetEditModerateurComponent,
  EtatProjetModerateurComponent,
  QualiteCreateModerateurComponent,
  QualiteListModerateurComponent,
  QualiteViewModerateurComponent,
  QualiteEditModerateurComponent,
  QualiteModerateurComponent,
  RendezVousCreateModerateurComponent,
  RendezVousListModerateurComponent,
  RendezVousViewModerateurComponent,
  RendezVousEditModerateurComponent,
  RendezVousModerateurComponent,
  ModerateurCreateModerateurComponent,
  ModerateurListModerateurComponent,
  ModerateurViewModerateurComponent,
  ModerateurEditModerateurComponent,
  ModerateurModerateurComponent,
  ],
  entryComponents: [],
})
export class FondationModerateurModule { }
