import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeadviewComponent } from './leadview/leadview.component';
import { DatabaseViewComponent } from './database-view/database-view.component';
// import { MatInputModule } from '@angular/material/input';
import { DataserviceService } from './dataservice.service';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AddDatabaseComponent } from './add-database/add-database.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminslistComponent } from './adminslist/adminslist.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NewleadComponent } from './newlead/newlead.component';
import { AdminteamslistComponent } from './adminteamslist/adminteamslist.component';
import { AddsalespersonComponent } from './addsalesperson/addsalesperson.component';
import { AddsalesteamComponent } from './addsalesteam/addsalesteam.component';
import { GenerateleadsComponent } from './generateleads/generateleads.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { ManageleadsComponent } from './manageleads/manageleads.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AssignworkComponent } from './assignwork/assignwork.component';
import { AssignteamworkComponent } from './assignteamwork/assignteamwork.component';
import { AdminteamsviewComponent } from './adminteamsview/adminteamsview.component';
import { AdmindetailsPopupComponent } from './admindetails-popup/admindetails-popup.component';
import { TeammembersPopupComponent } from './teammembers-popup/teammembers-popup.component';
import { ImportfileComponent } from './importfile/importfile.component';
import { TeamleadsviewComponent } from './teamleadsview/teamleadsview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-regular-svg-icons';
import { TermsComponent } from './terms/terms.component';
import { CustomFilterPipe } from './custom-filter.pipe';

import { MatFormFieldModule } from '@angular/material/form-field'; 
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// import {NgModule} from '@angular/core';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ReportingComponent } from './reporting/reporting.component';

@NgModule({
  declarations: [
    AppComponent,
    LeadviewComponent,
    DatabaseViewComponent,
    
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    AddDatabaseComponent,
    AdminslistComponent,
    PopUpComponent,
    NewleadComponent,
    AdminteamslistComponent,
    AddsalespersonComponent,
    AddsalesteamComponent,
    GenerateleadsComponent,
    LeadDetailsComponent,
    ManageleadsComponent,
    UserprofileComponent,
    AssignworkComponent,
    AssignteamworkComponent,
    AdminteamsviewComponent,
    AdmindetailsPopupComponent,
    TeammembersPopupComponent,
    ImportfileComponent,
    TeamleadsviewComponent,
    TermsComponent,
    CustomFilterPipe,
    UpdatepasswordComponent,
    ReportingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  exports:[ A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,],
  providers: [DataserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { 

constructor(library: FaIconLibrary){
  library.addIcons(fasStar,farStar);
}
}
