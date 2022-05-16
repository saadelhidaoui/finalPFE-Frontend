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

import { AdherentCreateAdminComponent } from './adherent-admin/create-admin/adherent-create-admin.component';
import { AdherentEditAdminComponent } from './adherent-admin/edit-admin/adherent-edit-admin.component';
import { AdherentViewAdminComponent } from './adherent-admin/view-admin/adherent-view-admin.component';
import { AdherentListAdminComponent } from './adherent-admin/list-admin/adherent-list-admin.component';
import { AdherentAdminComponent } from './adherent-admin/adherent-admin.component';
import { DemandeEstivageCreateAdminComponent } from './demande-estivage-admin/create-admin/demande-estivage-create-admin.component';
import { DemandeEstivageEditAdminComponent } from './demande-estivage-admin/edit-admin/demande-estivage-edit-admin.component';
import { DemandeEstivageViewAdminComponent } from './demande-estivage-admin/view-admin/demande-estivage-view-admin.component';
import { DemandeEstivageListAdminComponent } from './demande-estivage-admin/list-admin/demande-estivage-list-admin.component';
import { DemandeEstivageAdminComponent } from './demande-estivage-admin/demande-estivage-admin.component';
import { EtatReclamationCreateAdminComponent } from './etat-reclamation-admin/create-admin/etat-reclamation-create-admin.component';
import { EtatReclamationEditAdminComponent } from './etat-reclamation-admin/edit-admin/etat-reclamation-edit-admin.component';
import { EtatReclamationViewAdminComponent } from './etat-reclamation-admin/view-admin/etat-reclamation-view-admin.component';
import { EtatReclamationListAdminComponent } from './etat-reclamation-admin/list-admin/etat-reclamation-list-admin.component';
import { EtatReclamationAdminComponent } from './etat-reclamation-admin/etat-reclamation-admin.component';
import { EstivageCreateAdminComponent } from './estivage-admin/create-admin/estivage-create-admin.component';
import { EstivageEditAdminComponent } from './estivage-admin/edit-admin/estivage-edit-admin.component';
import { EstivageViewAdminComponent } from './estivage-admin/view-admin/estivage-view-admin.component';
import { EstivageListAdminComponent } from './estivage-admin/list-admin/estivage-list-admin.component';
import { EstivageAdminComponent } from './estivage-admin/estivage-admin.component';
import { VilleCreateAdminComponent } from './ville-admin/create-admin/ville-create-admin.component';
import { VilleEditAdminComponent } from './ville-admin/edit-admin/ville-edit-admin.component';
import { VilleViewAdminComponent } from './ville-admin/view-admin/ville-view-admin.component';
import { VilleListAdminComponent } from './ville-admin/list-admin/ville-list-admin.component';
import { VilleAdminComponent } from './ville-admin/ville-admin.component';
import { ProfilCreateAdminComponent } from './profil-admin/create-admin/profil-create-admin.component';
import { ProfilEditAdminComponent } from './profil-admin/edit-admin/profil-edit-admin.component';
import { ProfilViewAdminComponent } from './profil-admin/view-admin/profil-view-admin.component';
import { ProfilListAdminComponent } from './profil-admin/list-admin/profil-list-admin.component';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { ConventionCreateAdminComponent } from './convention-admin/create-admin/convention-create-admin.component';
import { ConventionEditAdminComponent } from './convention-admin/edit-admin/convention-edit-admin.component';
import { ConventionViewAdminComponent } from './convention-admin/view-admin/convention-view-admin.component';
import { ConventionListAdminComponent } from './convention-admin/list-admin/convention-list-admin.component';
import { ConventionAdminComponent } from './convention-admin/convention-admin.component';
import { ImpressionCarteCreateAdminComponent } from './impression-carte-admin/create-admin/impression-carte-create-admin.component';
import { ImpressionCarteEditAdminComponent } from './impression-carte-admin/edit-admin/impression-carte-edit-admin.component';
import { ImpressionCarteViewAdminComponent } from './impression-carte-admin/view-admin/impression-carte-view-admin.component';
import { ImpressionCarteListAdminComponent } from './impression-carte-admin/list-admin/impression-carte-list-admin.component';
import { ImpressionCarteAdminComponent } from './impression-carte-admin/impression-carte-admin.component';
import { PieceJointeEstivageCreateAdminComponent } from './piece-jointe-estivage-admin/create-admin/piece-jointe-estivage-create-admin.component';
import { PieceJointeEstivageEditAdminComponent } from './piece-jointe-estivage-admin/edit-admin/piece-jointe-estivage-edit-admin.component';
import { PieceJointeEstivageViewAdminComponent } from './piece-jointe-estivage-admin/view-admin/piece-jointe-estivage-view-admin.component';
import { PieceJointeEstivageListAdminComponent } from './piece-jointe-estivage-admin/list-admin/piece-jointe-estivage-list-admin.component';
import { PieceJointeEstivageAdminComponent } from './piece-jointe-estivage-admin/piece-jointe-estivage-admin.component';
import { ProduitCreateAdminComponent } from './produit-admin/create-admin/produit-create-admin.component';
import { ProduitEditAdminComponent } from './produit-admin/edit-admin/produit-edit-admin.component';
import { ProduitViewAdminComponent } from './produit-admin/view-admin/produit-view-admin.component';
import { ProduitListAdminComponent } from './produit-admin/list-admin/produit-list-admin.component';
import { ProduitAdminComponent } from './produit-admin/produit-admin.component';
import { StatutCreateAdminComponent } from './statut-admin/create-admin/statut-create-admin.component';
import { StatutEditAdminComponent } from './statut-admin/edit-admin/statut-edit-admin.component';
import { StatutViewAdminComponent } from './statut-admin/view-admin/statut-view-admin.component';
import { StatutListAdminComponent } from './statut-admin/list-admin/statut-list-admin.component';
import { StatutAdminComponent } from './statut-admin/statut-admin.component';
import { EtatCarteCreateAdminComponent } from './etat-carte-admin/create-admin/etat-carte-create-admin.component';
import { EtatCarteEditAdminComponent } from './etat-carte-admin/edit-admin/etat-carte-edit-admin.component';
import { EtatCarteViewAdminComponent } from './etat-carte-admin/view-admin/etat-carte-view-admin.component';
import { EtatCarteListAdminComponent } from './etat-carte-admin/list-admin/etat-carte-list-admin.component';
import { EtatCarteAdminComponent } from './etat-carte-admin/etat-carte-admin.component';
import { RegionCreateAdminComponent } from './region-admin/create-admin/region-create-admin.component';
import { RegionEditAdminComponent } from './region-admin/edit-admin/region-edit-admin.component';
import { RegionViewAdminComponent } from './region-admin/view-admin/region-view-admin.component';
import { RegionListAdminComponent } from './region-admin/list-admin/region-list-admin.component';
import { RegionAdminComponent } from './region-admin/region-admin.component';
import { TacheCreateAdminComponent } from './tache-admin/create-admin/tache-create-admin.component';
import { TacheEditAdminComponent } from './tache-admin/edit-admin/tache-edit-admin.component';
import { TacheViewAdminComponent } from './tache-admin/view-admin/tache-view-admin.component';
import { TacheListAdminComponent } from './tache-admin/list-admin/tache-list-admin.component';
import { TacheAdminComponent } from './tache-admin/tache-admin.component';
import { ReclamationCreateAdminComponent } from './reclamation-admin/create-admin/reclamation-create-admin.component';
import { ReclamationEditAdminComponent } from './reclamation-admin/edit-admin/reclamation-edit-admin.component';
import { ReclamationViewAdminComponent } from './reclamation-admin/view-admin/reclamation-view-admin.component';
import { ReclamationListAdminComponent } from './reclamation-admin/list-admin/reclamation-list-admin.component';
import { ReclamationAdminComponent } from './reclamation-admin/reclamation-admin.component';
import { SituationModerateurCreateAdminComponent } from './situation-moderateur-admin/create-admin/situation-moderateur-create-admin.component';
import { SituationModerateurEditAdminComponent } from './situation-moderateur-admin/edit-admin/situation-moderateur-edit-admin.component';
import { SituationModerateurViewAdminComponent } from './situation-moderateur-admin/view-admin/situation-moderateur-view-admin.component';
import { SituationModerateurListAdminComponent } from './situation-moderateur-admin/list-admin/situation-moderateur-list-admin.component';
import { SituationModerateurAdminComponent } from './situation-moderateur-admin/situation-moderateur-admin.component';
import { EtatPrestationCreateAdminComponent } from './etat-prestation-admin/create-admin/etat-prestation-create-admin.component';
import { EtatPrestationEditAdminComponent } from './etat-prestation-admin/edit-admin/etat-prestation-edit-admin.component';
import { EtatPrestationViewAdminComponent } from './etat-prestation-admin/view-admin/etat-prestation-view-admin.component';
import { EtatPrestationListAdminComponent } from './etat-prestation-admin/list-admin/etat-prestation-list-admin.component';
import { EtatPrestationAdminComponent } from './etat-prestation-admin/etat-prestation-admin.component';
import { EnfantCreateAdminComponent } from './enfant-admin/create-admin/enfant-create-admin.component';
import { EnfantEditAdminComponent } from './enfant-admin/edit-admin/enfant-edit-admin.component';
import { EnfantViewAdminComponent } from './enfant-admin/view-admin/enfant-view-admin.component';
import { EnfantListAdminComponent } from './enfant-admin/list-admin/enfant-list-admin.component';
import { EnfantAdminComponent } from './enfant-admin/enfant-admin.component';
import { MissionCreateAdminComponent } from './mission-admin/create-admin/mission-create-admin.component';
import { MissionEditAdminComponent } from './mission-admin/edit-admin/mission-edit-admin.component';
import { MissionViewAdminComponent } from './mission-admin/view-admin/mission-view-admin.component';
import { MissionListAdminComponent } from './mission-admin/list-admin/mission-list-admin.component';
import { MissionAdminComponent } from './mission-admin/mission-admin.component';
import { PieceJointeMissionCreateAdminComponent } from './piece-jointe-mission-admin/create-admin/piece-jointe-mission-create-admin.component';
import { PieceJointeMissionEditAdminComponent } from './piece-jointe-mission-admin/edit-admin/piece-jointe-mission-edit-admin.component';
import { PieceJointeMissionViewAdminComponent } from './piece-jointe-mission-admin/view-admin/piece-jointe-mission-view-admin.component';
import { PieceJointeMissionListAdminComponent } from './piece-jointe-mission-admin/list-admin/piece-jointe-mission-list-admin.component';
import { PieceJointeMissionAdminComponent } from './piece-jointe-mission-admin/piece-jointe-mission-admin.component';
import { DemandeEstivageCentreCreateAdminComponent } from './demande-estivage-centre-admin/create-admin/demande-estivage-centre-create-admin.component';
import { DemandeEstivageCentreEditAdminComponent } from './demande-estivage-centre-admin/edit-admin/demande-estivage-centre-edit-admin.component';
import { DemandeEstivageCentreViewAdminComponent } from './demande-estivage-centre-admin/view-admin/demande-estivage-centre-view-admin.component';
import { DemandeEstivageCentreListAdminComponent } from './demande-estivage-centre-admin/list-admin/demande-estivage-centre-list-admin.component';
import { DemandeEstivageCentreAdminComponent } from './demande-estivage-centre-admin/demande-estivage-centre-admin.component';
import { NiveauImportanceCreateAdminComponent } from './niveau-importance-admin/create-admin/niveau-importance-create-admin.component';
import { NiveauImportanceEditAdminComponent } from './niveau-importance-admin/edit-admin/niveau-importance-edit-admin.component';
import { NiveauImportanceViewAdminComponent } from './niveau-importance-admin/view-admin/niveau-importance-view-admin.component';
import { NiveauImportanceListAdminComponent } from './niveau-importance-admin/list-admin/niveau-importance-list-admin.component';
import { NiveauImportanceAdminComponent } from './niveau-importance-admin/niveau-importance-admin.component';
import { ChercheurCreateAdminComponent } from './chercheur-admin/create-admin/chercheur-create-admin.component';
import { ChercheurEditAdminComponent } from './chercheur-admin/edit-admin/chercheur-edit-admin.component';
import { ChercheurViewAdminComponent } from './chercheur-admin/view-admin/chercheur-view-admin.component';
import { ChercheurListAdminComponent } from './chercheur-admin/list-admin/chercheur-list-admin.component';
import { ChercheurAdminComponent } from './chercheur-admin/chercheur-admin.component';
import { PieceJointeProduitCreateAdminComponent } from './piece-jointe-produit-admin/create-admin/piece-jointe-produit-create-admin.component';
import { PieceJointeProduitEditAdminComponent } from './piece-jointe-produit-admin/edit-admin/piece-jointe-produit-edit-admin.component';
import { PieceJointeProduitViewAdminComponent } from './piece-jointe-produit-admin/view-admin/piece-jointe-produit-view-admin.component';
import { PieceJointeProduitListAdminComponent } from './piece-jointe-produit-admin/list-admin/piece-jointe-produit-list-admin.component';
import { PieceJointeProduitAdminComponent } from './piece-jointe-produit-admin/piece-jointe-produit-admin.component';
import { ProjetCreateAdminComponent } from './projet-admin/create-admin/projet-create-admin.component';
import { ProjetEditAdminComponent } from './projet-admin/edit-admin/projet-edit-admin.component';
import { ProjetViewAdminComponent } from './projet-admin/view-admin/projet-view-admin.component';
import { ProjetListAdminComponent } from './projet-admin/list-admin/projet-list-admin.component';
import { ProjetAdminComponent } from './projet-admin/projet-admin.component';
import { PieceJointeConventionCreateAdminComponent } from './piece-jointe-convention-admin/create-admin/piece-jointe-convention-create-admin.component';
import { PieceJointeConventionEditAdminComponent } from './piece-jointe-convention-admin/edit-admin/piece-jointe-convention-edit-admin.component';
import { PieceJointeConventionViewAdminComponent } from './piece-jointe-convention-admin/view-admin/piece-jointe-convention-view-admin.component';
import { PieceJointeConventionListAdminComponent } from './piece-jointe-convention-admin/list-admin/piece-jointe-convention-list-admin.component';
import { PieceJointeConventionAdminComponent } from './piece-jointe-convention-admin/piece-jointe-convention-admin.component';
import { EchelonCreateAdminComponent } from './echelon-admin/create-admin/echelon-create-admin.component';
import { EchelonEditAdminComponent } from './echelon-admin/edit-admin/echelon-edit-admin.component';
import { EchelonViewAdminComponent } from './echelon-admin/view-admin/echelon-view-admin.component';
import { EchelonListAdminComponent } from './echelon-admin/list-admin/echelon-list-admin.component';
import { EchelonAdminComponent } from './echelon-admin/echelon-admin.component';
import { PrestationCreateAdminComponent } from './prestation-admin/create-admin/prestation-create-admin.component';
import { PrestationEditAdminComponent } from './prestation-admin/edit-admin/prestation-edit-admin.component';
import { PrestationViewAdminComponent } from './prestation-admin/view-admin/prestation-view-admin.component';
import { PrestationListAdminComponent } from './prestation-admin/list-admin/prestation-list-admin.component';
import { PrestationAdminComponent } from './prestation-admin/prestation-admin.component';
import { PieceJointeProjetCreateAdminComponent } from './piece-jointe-projet-admin/create-admin/piece-jointe-projet-create-admin.component';
import { PieceJointeProjetEditAdminComponent } from './piece-jointe-projet-admin/edit-admin/piece-jointe-projet-edit-admin.component';
import { PieceJointeProjetViewAdminComponent } from './piece-jointe-projet-admin/view-admin/piece-jointe-projet-view-admin.component';
import { PieceJointeProjetListAdminComponent } from './piece-jointe-projet-admin/list-admin/piece-jointe-projet-list-admin.component';
import { PieceJointeProjetAdminComponent } from './piece-jointe-projet-admin/piece-jointe-projet-admin.component';
import { PieceJointeReclamationCreateAdminComponent } from './piece-jointe-reclamation-admin/create-admin/piece-jointe-reclamation-create-admin.component';
import { PieceJointeReclamationEditAdminComponent } from './piece-jointe-reclamation-admin/edit-admin/piece-jointe-reclamation-edit-admin.component';
import { PieceJointeReclamationViewAdminComponent } from './piece-jointe-reclamation-admin/view-admin/piece-jointe-reclamation-view-admin.component';
import { PieceJointeReclamationListAdminComponent } from './piece-jointe-reclamation-admin/list-admin/piece-jointe-reclamation-list-admin.component';
import { PieceJointeReclamationAdminComponent } from './piece-jointe-reclamation-admin/piece-jointe-reclamation-admin.component';
import { EchelleCreateAdminComponent } from './echelle-admin/create-admin/echelle-create-admin.component';
import { EchelleEditAdminComponent } from './echelle-admin/edit-admin/echelle-edit-admin.component';
import { EchelleViewAdminComponent } from './echelle-admin/view-admin/echelle-view-admin.component';
import { EchelleListAdminComponent } from './echelle-admin/list-admin/echelle-list-admin.component';
import { EchelleAdminComponent } from './echelle-admin/echelle-admin.component';
import { TypePrestationCreateAdminComponent } from './type-prestation-admin/create-admin/type-prestation-create-admin.component';
import { TypePrestationEditAdminComponent } from './type-prestation-admin/edit-admin/type-prestation-edit-admin.component';
import { TypePrestationViewAdminComponent } from './type-prestation-admin/view-admin/type-prestation-view-admin.component';
import { TypePrestationListAdminComponent } from './type-prestation-admin/list-admin/type-prestation-list-admin.component';
import { TypePrestationAdminComponent } from './type-prestation-admin/type-prestation-admin.component';
import { OrganismeCreateAdminComponent } from './organisme-admin/create-admin/organisme-create-admin.component';
import { OrganismeEditAdminComponent } from './organisme-admin/edit-admin/organisme-edit-admin.component';
import { OrganismeViewAdminComponent } from './organisme-admin/view-admin/organisme-view-admin.component';
import { OrganismeListAdminComponent } from './organisme-admin/list-admin/organisme-list-admin.component';
import { OrganismeAdminComponent } from './organisme-admin/organisme-admin.component';
import { EtatTacheCreateAdminComponent } from './etat-tache-admin/create-admin/etat-tache-create-admin.component';
import { EtatTacheEditAdminComponent } from './etat-tache-admin/edit-admin/etat-tache-edit-admin.component';
import { EtatTacheViewAdminComponent } from './etat-tache-admin/view-admin/etat-tache-view-admin.component';
import { EtatTacheListAdminComponent } from './etat-tache-admin/list-admin/etat-tache-list-admin.component';
import { EtatTacheAdminComponent } from './etat-tache-admin/etat-tache-admin.component';
import { ConjointCreateAdminComponent } from './conjoint-admin/create-admin/conjoint-create-admin.component';
import { ConjointEditAdminComponent } from './conjoint-admin/edit-admin/conjoint-edit-admin.component';
import { ConjointViewAdminComponent } from './conjoint-admin/view-admin/conjoint-view-admin.component';
import { ConjointListAdminComponent } from './conjoint-admin/list-admin/conjoint-list-admin.component';
import { ConjointAdminComponent } from './conjoint-admin/conjoint-admin.component';
import { PieceJointeRendezVousCreateAdminComponent } from './piece-jointe-rendez-vous-admin/create-admin/piece-jointe-rendez-vous-create-admin.component';
import { PieceJointeRendezVousEditAdminComponent } from './piece-jointe-rendez-vous-admin/edit-admin/piece-jointe-rendez-vous-edit-admin.component';
import { PieceJointeRendezVousViewAdminComponent } from './piece-jointe-rendez-vous-admin/view-admin/piece-jointe-rendez-vous-view-admin.component';
import { PieceJointeRendezVousListAdminComponent } from './piece-jointe-rendez-vous-admin/list-admin/piece-jointe-rendez-vous-list-admin.component';
import { PieceJointeRendezVousAdminComponent } from './piece-jointe-rendez-vous-admin/piece-jointe-rendez-vous-admin.component';
import { PieceJointePrestationCreateAdminComponent } from './piece-jointe-prestation-admin/create-admin/piece-jointe-prestation-create-admin.component';
import { PieceJointePrestationEditAdminComponent } from './piece-jointe-prestation-admin/edit-admin/piece-jointe-prestation-edit-admin.component';
import { PieceJointePrestationViewAdminComponent } from './piece-jointe-prestation-admin/view-admin/piece-jointe-prestation-view-admin.component';
import { PieceJointePrestationListAdminComponent } from './piece-jointe-prestation-admin/list-admin/piece-jointe-prestation-list-admin.component';
import { PieceJointePrestationAdminComponent } from './piece-jointe-prestation-admin/piece-jointe-prestation-admin.component';
import { CentreEstivageCreateAdminComponent } from './centre-estivage-admin/create-admin/centre-estivage-create-admin.component';
import { CentreEstivageEditAdminComponent } from './centre-estivage-admin/edit-admin/centre-estivage-edit-admin.component';
import { CentreEstivageViewAdminComponent } from './centre-estivage-admin/view-admin/centre-estivage-view-admin.component';
import { CentreEstivageListAdminComponent } from './centre-estivage-admin/list-admin/centre-estivage-list-admin.component';
import { CentreEstivageAdminComponent } from './centre-estivage-admin/centre-estivage-admin.component';
import { PieceJointeAdherentCreateAdminComponent } from './piece-jointe-adherent-admin/create-admin/piece-jointe-adherent-create-admin.component';
import { PieceJointeAdherentEditAdminComponent } from './piece-jointe-adherent-admin/edit-admin/piece-jointe-adherent-edit-admin.component';
import { PieceJointeAdherentViewAdminComponent } from './piece-jointe-adherent-admin/view-admin/piece-jointe-adherent-view-admin.component';
import { PieceJointeAdherentListAdminComponent } from './piece-jointe-adherent-admin/list-admin/piece-jointe-adherent-list-admin.component';
import { PieceJointeAdherentAdminComponent } from './piece-jointe-adherent-admin/piece-jointe-adherent-admin.component';
import { GestionReclamationCreateAdminComponent } from './gestion-reclamation-admin/create-admin/gestion-reclamation-create-admin.component';
import { GestionReclamationEditAdminComponent } from './gestion-reclamation-admin/edit-admin/gestion-reclamation-edit-admin.component';
import { GestionReclamationViewAdminComponent } from './gestion-reclamation-admin/view-admin/gestion-reclamation-view-admin.component';
import { GestionReclamationListAdminComponent } from './gestion-reclamation-admin/list-admin/gestion-reclamation-list-admin.component';
import { GestionReclamationAdminComponent } from './gestion-reclamation-admin/gestion-reclamation-admin.component';
import { FonctionCreateAdminComponent } from './fonction-admin/create-admin/fonction-create-admin.component';
import { FonctionEditAdminComponent } from './fonction-admin/edit-admin/fonction-edit-admin.component';
import { FonctionViewAdminComponent } from './fonction-admin/view-admin/fonction-view-admin.component';
import { FonctionListAdminComponent } from './fonction-admin/list-admin/fonction-list-admin.component';
import { FonctionAdminComponent } from './fonction-admin/fonction-admin.component';
import { EtatDemandeEstivageCreateAdminComponent } from './etat-demande-estivage-admin/create-admin/etat-demande-estivage-create-admin.component';
import { EtatDemandeEstivageEditAdminComponent } from './etat-demande-estivage-admin/edit-admin/etat-demande-estivage-edit-admin.component';
import { EtatDemandeEstivageViewAdminComponent } from './etat-demande-estivage-admin/view-admin/etat-demande-estivage-view-admin.component';
import { EtatDemandeEstivageListAdminComponent } from './etat-demande-estivage-admin/list-admin/etat-demande-estivage-list-admin.component';
import { EtatDemandeEstivageAdminComponent } from './etat-demande-estivage-admin/etat-demande-estivage-admin.component';
import { GradeCreateAdminComponent } from './grade-admin/create-admin/grade-create-admin.component';
import { GradeEditAdminComponent } from './grade-admin/edit-admin/grade-edit-admin.component';
import { GradeViewAdminComponent } from './grade-admin/view-admin/grade-view-admin.component';
import { GradeListAdminComponent } from './grade-admin/list-admin/grade-list-admin.component';
import { GradeAdminComponent } from './grade-admin/grade-admin.component';
import { EstivageCentreEstivageCreateAdminComponent } from './estivage-centre-estivage-admin/create-admin/estivage-centre-estivage-create-admin.component';
import { EstivageCentreEstivageEditAdminComponent } from './estivage-centre-estivage-admin/edit-admin/estivage-centre-estivage-edit-admin.component';
import { EstivageCentreEstivageViewAdminComponent } from './estivage-centre-estivage-admin/view-admin/estivage-centre-estivage-view-admin.component';
import { EstivageCentreEstivageListAdminComponent } from './estivage-centre-estivage-admin/list-admin/estivage-centre-estivage-list-admin.component';
import { EstivageCentreEstivageAdminComponent } from './estivage-centre-estivage-admin/estivage-centre-estivage-admin.component';
import { EtatProjetCreateAdminComponent } from './etat-projet-admin/create-admin/etat-projet-create-admin.component';
import { EtatProjetEditAdminComponent } from './etat-projet-admin/edit-admin/etat-projet-edit-admin.component';
import { EtatProjetViewAdminComponent } from './etat-projet-admin/view-admin/etat-projet-view-admin.component';
import { EtatProjetListAdminComponent } from './etat-projet-admin/list-admin/etat-projet-list-admin.component';
import { EtatProjetAdminComponent } from './etat-projet-admin/etat-projet-admin.component';
import { QualiteCreateAdminComponent } from './qualite-admin/create-admin/qualite-create-admin.component';
import { QualiteEditAdminComponent } from './qualite-admin/edit-admin/qualite-edit-admin.component';
import { QualiteViewAdminComponent } from './qualite-admin/view-admin/qualite-view-admin.component';
import { QualiteListAdminComponent } from './qualite-admin/list-admin/qualite-list-admin.component';
import { QualiteAdminComponent } from './qualite-admin/qualite-admin.component';
import { RendezVousCreateAdminComponent } from './rendez-vous-admin/create-admin/rendez-vous-create-admin.component';
import { RendezVousEditAdminComponent } from './rendez-vous-admin/edit-admin/rendez-vous-edit-admin.component';
import { RendezVousViewAdminComponent } from './rendez-vous-admin/view-admin/rendez-vous-view-admin.component';
import { RendezVousListAdminComponent } from './rendez-vous-admin/list-admin/rendez-vous-list-admin.component';
import { RendezVousAdminComponent } from './rendez-vous-admin/rendez-vous-admin.component';
import { ModerateurCreateAdminComponent } from './moderateur-admin/create-admin/moderateur-create-admin.component';
import { ModerateurEditAdminComponent } from './moderateur-admin/edit-admin/moderateur-edit-admin.component';
import { ModerateurViewAdminComponent } from './moderateur-admin/view-admin/moderateur-view-admin.component';
import { ModerateurListAdminComponent } from './moderateur-admin/list-admin/moderateur-list-admin.component';
import { ModerateurAdminComponent } from './moderateur-admin/moderateur-admin.component';

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

    AdherentCreateAdminComponent,
    AdherentListAdminComponent,
    AdherentViewAdminComponent,
    AdherentEditAdminComponent,
    AdherentAdminComponent,
    DemandeEstivageCreateAdminComponent,
    DemandeEstivageListAdminComponent,
    DemandeEstivageViewAdminComponent,
    DemandeEstivageEditAdminComponent,
    DemandeEstivageAdminComponent,
    EtatReclamationCreateAdminComponent,
    EtatReclamationListAdminComponent,
    EtatReclamationViewAdminComponent,
    EtatReclamationEditAdminComponent,
    EtatReclamationAdminComponent,
    EstivageCreateAdminComponent,
    EstivageListAdminComponent,
    EstivageViewAdminComponent,
    EstivageEditAdminComponent,
    EstivageAdminComponent,
    VilleCreateAdminComponent,
    VilleListAdminComponent,
    VilleViewAdminComponent,
    VilleEditAdminComponent,
    VilleAdminComponent,
    ProfilCreateAdminComponent,
    ProfilListAdminComponent,
    ProfilViewAdminComponent,
    ProfilEditAdminComponent,
    ProfilAdminComponent,
    ConventionCreateAdminComponent,
    ConventionListAdminComponent,
    ConventionViewAdminComponent,
    ConventionEditAdminComponent,
    ConventionAdminComponent,
    ImpressionCarteCreateAdminComponent,
    ImpressionCarteListAdminComponent,
    ImpressionCarteViewAdminComponent,
    ImpressionCarteEditAdminComponent,
    ImpressionCarteAdminComponent,
    PieceJointeEstivageCreateAdminComponent,
    PieceJointeEstivageListAdminComponent,
    PieceJointeEstivageViewAdminComponent,
    PieceJointeEstivageEditAdminComponent,
    PieceJointeEstivageAdminComponent,
    ProduitCreateAdminComponent,
    ProduitListAdminComponent,
    ProduitViewAdminComponent,
    ProduitEditAdminComponent,
    ProduitAdminComponent,
    StatutCreateAdminComponent,
    StatutListAdminComponent,
    StatutViewAdminComponent,
    StatutEditAdminComponent,
    StatutAdminComponent,
    EtatCarteCreateAdminComponent,
    EtatCarteListAdminComponent,
    EtatCarteViewAdminComponent,
    EtatCarteEditAdminComponent,
    EtatCarteAdminComponent,
    RegionCreateAdminComponent,
    RegionListAdminComponent,
    RegionViewAdminComponent,
    RegionEditAdminComponent,
    RegionAdminComponent,
    TacheCreateAdminComponent,
    TacheListAdminComponent,
    TacheViewAdminComponent,
    TacheEditAdminComponent,
    TacheAdminComponent,
    ReclamationCreateAdminComponent,
    ReclamationListAdminComponent,
    ReclamationViewAdminComponent,
    ReclamationEditAdminComponent,
    ReclamationAdminComponent,
    SituationModerateurCreateAdminComponent,
    SituationModerateurListAdminComponent,
    SituationModerateurViewAdminComponent,
    SituationModerateurEditAdminComponent,
    SituationModerateurAdminComponent,
    EtatPrestationCreateAdminComponent,
    EtatPrestationListAdminComponent,
    EtatPrestationViewAdminComponent,
    EtatPrestationEditAdminComponent,
    EtatPrestationAdminComponent,
    EnfantCreateAdminComponent,
    EnfantListAdminComponent,
    EnfantViewAdminComponent,
    EnfantEditAdminComponent,
    EnfantAdminComponent,
    MissionCreateAdminComponent,
    MissionListAdminComponent,
    MissionViewAdminComponent,
    MissionEditAdminComponent,
    MissionAdminComponent,
    PieceJointeMissionCreateAdminComponent,
    PieceJointeMissionListAdminComponent,
    PieceJointeMissionViewAdminComponent,
    PieceJointeMissionEditAdminComponent,
    PieceJointeMissionAdminComponent,
    DemandeEstivageCentreCreateAdminComponent,
    DemandeEstivageCentreListAdminComponent,
    DemandeEstivageCentreViewAdminComponent,
    DemandeEstivageCentreEditAdminComponent,
    DemandeEstivageCentreAdminComponent,
    NiveauImportanceCreateAdminComponent,
    NiveauImportanceListAdminComponent,
    NiveauImportanceViewAdminComponent,
    NiveauImportanceEditAdminComponent,
    NiveauImportanceAdminComponent,
    ChercheurCreateAdminComponent,
    ChercheurListAdminComponent,
    ChercheurViewAdminComponent,
    ChercheurEditAdminComponent,
    ChercheurAdminComponent,
    PieceJointeProduitCreateAdminComponent,
    PieceJointeProduitListAdminComponent,
    PieceJointeProduitViewAdminComponent,
    PieceJointeProduitEditAdminComponent,
    PieceJointeProduitAdminComponent,
    ProjetCreateAdminComponent,
    ProjetListAdminComponent,
    ProjetViewAdminComponent,
    ProjetEditAdminComponent,
    ProjetAdminComponent,
    PieceJointeConventionCreateAdminComponent,
    PieceJointeConventionListAdminComponent,
    PieceJointeConventionViewAdminComponent,
    PieceJointeConventionEditAdminComponent,
    PieceJointeConventionAdminComponent,
    EchelonCreateAdminComponent,
    EchelonListAdminComponent,
    EchelonViewAdminComponent,
    EchelonEditAdminComponent,
    EchelonAdminComponent,
    PrestationCreateAdminComponent,
    PrestationListAdminComponent,
    PrestationViewAdminComponent,
    PrestationEditAdminComponent,
    PrestationAdminComponent,
    PieceJointeProjetCreateAdminComponent,
    PieceJointeProjetListAdminComponent,
    PieceJointeProjetViewAdminComponent,
    PieceJointeProjetEditAdminComponent,
    PieceJointeProjetAdminComponent,
    PieceJointeReclamationCreateAdminComponent,
    PieceJointeReclamationListAdminComponent,
    PieceJointeReclamationViewAdminComponent,
    PieceJointeReclamationEditAdminComponent,
    PieceJointeReclamationAdminComponent,
    EchelleCreateAdminComponent,
    EchelleListAdminComponent,
    EchelleViewAdminComponent,
    EchelleEditAdminComponent,
    EchelleAdminComponent,
    TypePrestationCreateAdminComponent,
    TypePrestationListAdminComponent,
    TypePrestationViewAdminComponent,
    TypePrestationEditAdminComponent,
    TypePrestationAdminComponent,
    OrganismeCreateAdminComponent,
    OrganismeListAdminComponent,
    OrganismeViewAdminComponent,
    OrganismeEditAdminComponent,
    OrganismeAdminComponent,
    EtatTacheCreateAdminComponent,
    EtatTacheListAdminComponent,
    EtatTacheViewAdminComponent,
    EtatTacheEditAdminComponent,
    EtatTacheAdminComponent,
    ConjointCreateAdminComponent,
    ConjointListAdminComponent,
    ConjointViewAdminComponent,
    ConjointEditAdminComponent,
    ConjointAdminComponent,
    PieceJointeRendezVousCreateAdminComponent,
    PieceJointeRendezVousListAdminComponent,
    PieceJointeRendezVousViewAdminComponent,
    PieceJointeRendezVousEditAdminComponent,
    PieceJointeRendezVousAdminComponent,
    PieceJointePrestationCreateAdminComponent,
    PieceJointePrestationListAdminComponent,
    PieceJointePrestationViewAdminComponent,
    PieceJointePrestationEditAdminComponent,
    PieceJointePrestationAdminComponent,
    CentreEstivageCreateAdminComponent,
    CentreEstivageListAdminComponent,
    CentreEstivageViewAdminComponent,
    CentreEstivageEditAdminComponent,
    CentreEstivageAdminComponent,
    PieceJointeAdherentCreateAdminComponent,
    PieceJointeAdherentListAdminComponent,
    PieceJointeAdherentViewAdminComponent,
    PieceJointeAdherentEditAdminComponent,
    PieceJointeAdherentAdminComponent,
    GestionReclamationCreateAdminComponent,
    GestionReclamationListAdminComponent,
    GestionReclamationViewAdminComponent,
    GestionReclamationEditAdminComponent,
    GestionReclamationAdminComponent,
    FonctionCreateAdminComponent,
    FonctionListAdminComponent,
    FonctionViewAdminComponent,
    FonctionEditAdminComponent,
    FonctionAdminComponent,
    EtatDemandeEstivageCreateAdminComponent,
    EtatDemandeEstivageListAdminComponent,
    EtatDemandeEstivageViewAdminComponent,
    EtatDemandeEstivageEditAdminComponent,
    EtatDemandeEstivageAdminComponent,
    GradeCreateAdminComponent,
    GradeListAdminComponent,
    GradeViewAdminComponent,
    GradeEditAdminComponent,
    GradeAdminComponent,
    EstivageCentreEstivageCreateAdminComponent,
    EstivageCentreEstivageListAdminComponent,
    EstivageCentreEstivageViewAdminComponent,
    EstivageCentreEstivageEditAdminComponent,
    EstivageCentreEstivageAdminComponent,
    EtatProjetCreateAdminComponent,
    EtatProjetListAdminComponent,
    EtatProjetViewAdminComponent,
    EtatProjetEditAdminComponent,
    EtatProjetAdminComponent,
    QualiteCreateAdminComponent,
    QualiteListAdminComponent,
    QualiteViewAdminComponent,
    QualiteEditAdminComponent,
    QualiteAdminComponent,
    RendezVousCreateAdminComponent,
    RendezVousListAdminComponent,
    RendezVousViewAdminComponent,
    RendezVousEditAdminComponent,
    RendezVousAdminComponent,
    ModerateurCreateAdminComponent,
    ModerateurListAdminComponent,
    ModerateurViewAdminComponent,
    ModerateurEditAdminComponent,
    ModerateurAdminComponent,
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
  AdherentCreateAdminComponent,
  AdherentListAdminComponent,
  AdherentViewAdminComponent,
  AdherentEditAdminComponent,
  AdherentAdminComponent,
  DemandeEstivageCreateAdminComponent,
  DemandeEstivageListAdminComponent,
  DemandeEstivageViewAdminComponent,
  DemandeEstivageEditAdminComponent,
  DemandeEstivageAdminComponent,
  EtatReclamationCreateAdminComponent,
  EtatReclamationListAdminComponent,
  EtatReclamationViewAdminComponent,
  EtatReclamationEditAdminComponent,
  EtatReclamationAdminComponent,
  EstivageCreateAdminComponent,
  EstivageListAdminComponent,
  EstivageViewAdminComponent,
  EstivageEditAdminComponent,
  EstivageAdminComponent,
  VilleCreateAdminComponent,
  VilleListAdminComponent,
  VilleViewAdminComponent,
  VilleEditAdminComponent,
  VilleAdminComponent,
  ProfilCreateAdminComponent,
  ProfilListAdminComponent,
  ProfilViewAdminComponent,
  ProfilEditAdminComponent,
  ProfilAdminComponent,
  ConventionCreateAdminComponent,
  ConventionListAdminComponent,
  ConventionViewAdminComponent,
  ConventionEditAdminComponent,
  ConventionAdminComponent,
  ImpressionCarteCreateAdminComponent,
  ImpressionCarteListAdminComponent,
  ImpressionCarteViewAdminComponent,
  ImpressionCarteEditAdminComponent,
  ImpressionCarteAdminComponent,
  PieceJointeEstivageCreateAdminComponent,
  PieceJointeEstivageListAdminComponent,
  PieceJointeEstivageViewAdminComponent,
  PieceJointeEstivageEditAdminComponent,
  PieceJointeEstivageAdminComponent,
  ProduitCreateAdminComponent,
  ProduitListAdminComponent,
  ProduitViewAdminComponent,
  ProduitEditAdminComponent,
  ProduitAdminComponent,
  StatutCreateAdminComponent,
  StatutListAdminComponent,
  StatutViewAdminComponent,
  StatutEditAdminComponent,
  StatutAdminComponent,
  EtatCarteCreateAdminComponent,
  EtatCarteListAdminComponent,
  EtatCarteViewAdminComponent,
  EtatCarteEditAdminComponent,
  EtatCarteAdminComponent,
  RegionCreateAdminComponent,
  RegionListAdminComponent,
  RegionViewAdminComponent,
  RegionEditAdminComponent,
  RegionAdminComponent,
  TacheCreateAdminComponent,
  TacheListAdminComponent,
  TacheViewAdminComponent,
  TacheEditAdminComponent,
  TacheAdminComponent,
  ReclamationCreateAdminComponent,
  ReclamationListAdminComponent,
  ReclamationViewAdminComponent,
  ReclamationEditAdminComponent,
  ReclamationAdminComponent,
  SituationModerateurCreateAdminComponent,
  SituationModerateurListAdminComponent,
  SituationModerateurViewAdminComponent,
  SituationModerateurEditAdminComponent,
  SituationModerateurAdminComponent,
  EtatPrestationCreateAdminComponent,
  EtatPrestationListAdminComponent,
  EtatPrestationViewAdminComponent,
  EtatPrestationEditAdminComponent,
  EtatPrestationAdminComponent,
  EnfantCreateAdminComponent,
  EnfantListAdminComponent,
  EnfantViewAdminComponent,
  EnfantEditAdminComponent,
  EnfantAdminComponent,
  MissionCreateAdminComponent,
  MissionListAdminComponent,
  MissionViewAdminComponent,
  MissionEditAdminComponent,
  MissionAdminComponent,
  PieceJointeMissionCreateAdminComponent,
  PieceJointeMissionListAdminComponent,
  PieceJointeMissionViewAdminComponent,
  PieceJointeMissionEditAdminComponent,
  PieceJointeMissionAdminComponent,
  DemandeEstivageCentreCreateAdminComponent,
  DemandeEstivageCentreListAdminComponent,
  DemandeEstivageCentreViewAdminComponent,
  DemandeEstivageCentreEditAdminComponent,
  DemandeEstivageCentreAdminComponent,
  NiveauImportanceCreateAdminComponent,
  NiveauImportanceListAdminComponent,
  NiveauImportanceViewAdminComponent,
  NiveauImportanceEditAdminComponent,
  NiveauImportanceAdminComponent,
  ChercheurCreateAdminComponent,
  ChercheurListAdminComponent,
  ChercheurViewAdminComponent,
  ChercheurEditAdminComponent,
  ChercheurAdminComponent,
  PieceJointeProduitCreateAdminComponent,
  PieceJointeProduitListAdminComponent,
  PieceJointeProduitViewAdminComponent,
  PieceJointeProduitEditAdminComponent,
  PieceJointeProduitAdminComponent,
  ProjetCreateAdminComponent,
  ProjetListAdminComponent,
  ProjetViewAdminComponent,
  ProjetEditAdminComponent,
  ProjetAdminComponent,
  PieceJointeConventionCreateAdminComponent,
  PieceJointeConventionListAdminComponent,
  PieceJointeConventionViewAdminComponent,
  PieceJointeConventionEditAdminComponent,
  PieceJointeConventionAdminComponent,
  EchelonCreateAdminComponent,
  EchelonListAdminComponent,
  EchelonViewAdminComponent,
  EchelonEditAdminComponent,
  EchelonAdminComponent,
  PrestationCreateAdminComponent,
  PrestationListAdminComponent,
  PrestationViewAdminComponent,
  PrestationEditAdminComponent,
  PrestationAdminComponent,
  PieceJointeProjetCreateAdminComponent,
  PieceJointeProjetListAdminComponent,
  PieceJointeProjetViewAdminComponent,
  PieceJointeProjetEditAdminComponent,
  PieceJointeProjetAdminComponent,
  PieceJointeReclamationCreateAdminComponent,
  PieceJointeReclamationListAdminComponent,
  PieceJointeReclamationViewAdminComponent,
  PieceJointeReclamationEditAdminComponent,
  PieceJointeReclamationAdminComponent,
  EchelleCreateAdminComponent,
  EchelleListAdminComponent,
  EchelleViewAdminComponent,
  EchelleEditAdminComponent,
  EchelleAdminComponent,
  TypePrestationCreateAdminComponent,
  TypePrestationListAdminComponent,
  TypePrestationViewAdminComponent,
  TypePrestationEditAdminComponent,
  TypePrestationAdminComponent,
  OrganismeCreateAdminComponent,
  OrganismeListAdminComponent,
  OrganismeViewAdminComponent,
  OrganismeEditAdminComponent,
  OrganismeAdminComponent,
  EtatTacheCreateAdminComponent,
  EtatTacheListAdminComponent,
  EtatTacheViewAdminComponent,
  EtatTacheEditAdminComponent,
  EtatTacheAdminComponent,
  ConjointCreateAdminComponent,
  ConjointListAdminComponent,
  ConjointViewAdminComponent,
  ConjointEditAdminComponent,
  ConjointAdminComponent,
  PieceJointeRendezVousCreateAdminComponent,
  PieceJointeRendezVousListAdminComponent,
  PieceJointeRendezVousViewAdminComponent,
  PieceJointeRendezVousEditAdminComponent,
  PieceJointeRendezVousAdminComponent,
  PieceJointePrestationCreateAdminComponent,
  PieceJointePrestationListAdminComponent,
  PieceJointePrestationViewAdminComponent,
  PieceJointePrestationEditAdminComponent,
  PieceJointePrestationAdminComponent,
  CentreEstivageCreateAdminComponent,
  CentreEstivageListAdminComponent,
  CentreEstivageViewAdminComponent,
  CentreEstivageEditAdminComponent,
  CentreEstivageAdminComponent,
  PieceJointeAdherentCreateAdminComponent,
  PieceJointeAdherentListAdminComponent,
  PieceJointeAdherentViewAdminComponent,
  PieceJointeAdherentEditAdminComponent,
  PieceJointeAdherentAdminComponent,
  GestionReclamationCreateAdminComponent,
  GestionReclamationListAdminComponent,
  GestionReclamationViewAdminComponent,
  GestionReclamationEditAdminComponent,
  GestionReclamationAdminComponent,
  FonctionCreateAdminComponent,
  FonctionListAdminComponent,
  FonctionViewAdminComponent,
  FonctionEditAdminComponent,
  FonctionAdminComponent,
  EtatDemandeEstivageCreateAdminComponent,
  EtatDemandeEstivageListAdminComponent,
  EtatDemandeEstivageViewAdminComponent,
  EtatDemandeEstivageEditAdminComponent,
  EtatDemandeEstivageAdminComponent,
  GradeCreateAdminComponent,
  GradeListAdminComponent,
  GradeViewAdminComponent,
  GradeEditAdminComponent,
  GradeAdminComponent,
  EstivageCentreEstivageCreateAdminComponent,
  EstivageCentreEstivageListAdminComponent,
  EstivageCentreEstivageViewAdminComponent,
  EstivageCentreEstivageEditAdminComponent,
  EstivageCentreEstivageAdminComponent,
  EtatProjetCreateAdminComponent,
  EtatProjetListAdminComponent,
  EtatProjetViewAdminComponent,
  EtatProjetEditAdminComponent,
  EtatProjetAdminComponent,
  QualiteCreateAdminComponent,
  QualiteListAdminComponent,
  QualiteViewAdminComponent,
  QualiteEditAdminComponent,
  QualiteAdminComponent,
  RendezVousCreateAdminComponent,
  RendezVousListAdminComponent,
  RendezVousViewAdminComponent,
  RendezVousEditAdminComponent,
  RendezVousAdminComponent,
  ModerateurCreateAdminComponent,
  ModerateurListAdminComponent,
  ModerateurViewAdminComponent,
  ModerateurEditAdminComponent,
  ModerateurAdminComponent,
  ],
  entryComponents: [],
})
export class FondationAdminModule { }
