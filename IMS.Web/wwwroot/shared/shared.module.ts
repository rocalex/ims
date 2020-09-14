import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatExpansionModule, MatTabsModule, MatSlideToggleModule, MatAutocompleteModule, MatSnackBarModule, MatCheckboxModule, MatDatepickerModule,
    MatNativeDateModule, MatSelectModule, MatStepperModule, MatCardModule, MatListModule,
    MatInputModule, MatButtonModule, MatChipsModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LoaderService } from './loader-service';
import { PageTitleService } from './page-title';
import { SnackbarService } from './snackbar-service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidenavService } from './sidenav/sidenav.service';
import { StudentManagementLookUpSharedComponent, StudentManagementLookUpSharedListComponent } from '../app/student-management/student-management-lookup/student-management-lookup-shared/student-management-lookup-shared.component';
import { DragulaModule } from 'ng2-dragula';
import { SharedService } from './shared.service';
import { ThemeComponent } from './theme/theme.component';
import { AcademicManagementSharedComponent } from '../app/academic-management/academic-management-shared/academic-management-shared.component';
import { NoWhitespaceDirective } from './whitespace.directive';
import { ChartsModule } from 'ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PrintService } from './print.service';
import { ExcelService } from './excel.service';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { NotificationManagementService } from '../shared/notification.service';
import { PermissionService } from './permission.service';
import { PermissionAuthGuard } from './permissions-route.guard';
import { MentionModule } from 'angular2-mentions/mention';
import { MinDirective, MaxDirective } from './max-min.directive';
import { CustomFileDirective } from './custom-file.directive';
import { SpecialCharacterDirective } from './special-character.directive';

@NgModule({
    declarations: [
        HeaderComponent,
        SidenavComponent,
        StudentManagementLookUpSharedComponent,
        StudentManagementLookUpSharedListComponent,
        ThemeComponent,
        AcademicManagementSharedComponent,
        CustomFileDirective,
        NoWhitespaceDirective,
        MinDirective,
        MaxDirective,
        SpecialCharacterDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        RouterModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatTreeModule,
        MatTooltipModule,
        MatStepperModule,
        MatCardModule,
        DragulaModule.forRoot(),
        MatListModule,
        ChartsModule,
        AgmCoreModule.forRoot({ apiKey: 'AIzaSyB_oQm9oRpoPDV2bPgjDsJii9hn8_9J4U8', libraries: ["places"] }),
        GooglePlaceModule,
        NgxMaterialTimepickerModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
        }),
        TreeViewModule,
        MentionModule,
        MatChipsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTreeModule,
        MatTooltipModule,
        RouterModule,
        HeaderComponent,
        SidenavComponent,
        TranslateModule,
        MatStepperModule,
        MatCardModule,
        StudentManagementLookUpSharedComponent,
        StudentManagementLookUpSharedListComponent,
        DragulaModule,
        MatListModule,
        ThemeComponent,
        AcademicManagementSharedComponent,
        NoWhitespaceDirective,
        CustomFileDirective,
        ChartsModule,
        AgmCoreModule,
        GooglePlaceModule,
        NgxMaterialTimepickerModule,
        CalendarModule,
        TreeViewModule,
        MentionModule,
        MinDirective,
        MaxDirective,
        SpecialCharacterDirective,
        MatChipsModule
    ],
    providers: [
        LoaderService,
        PageTitleService,
        SnackbarService,
        SidenavService,
        SharedService,
        PrintService,
        ExcelService,
        NotificationManagementService,
        PermissionService,
        PermissionAuthGuard
    ]
})
export class SharedModule { }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
