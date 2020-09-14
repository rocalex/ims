"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const animations_1 = require("@angular/platform-browser/animations");
const material_1 = require("@angular/material");
const router_1 = require("@angular/router");
const header_component_1 = require("./header/header.component");
const sidenav_component_1 = require("./sidenav/sidenav.component");
const loader_service_1 = require("./loader-service");
const page_title_1 = require("./page-title");
const snackbar_service_1 = require("./snackbar-service");
const http_1 = require("@angular/common/http");
const core_2 = require("@ngx-translate/core");
const http_loader_1 = require("@ngx-translate/http-loader");
const paginator_1 = require("@angular/material/paginator");
const table_1 = require("@angular/material/table");
const icon_1 = require("@angular/material/icon");
const tree_1 = require("@angular/material/tree");
const tooltip_1 = require("@angular/material/tooltip");
const sidenav_service_1 = require("./sidenav/sidenav.service");
const student_management_lookup_shared_component_1 = require("../app/student-management/student-management-lookup/student-management-lookup-shared/student-management-lookup-shared.component");
const ng2_dragula_1 = require("ng2-dragula");
const shared_service_1 = require("./shared.service");
const theme_component_1 = require("./theme/theme.component");
const academic_management_shared_component_1 = require("../app/academic-management/academic-management-shared/academic-management-shared.component");
const whitespace_directive_1 = require("./whitespace.directive");
const ng2_charts_1 = require("ng2-charts");
const core_3 = require("@agm/core");
const ngx_google_places_autocomplete_1 = require("ngx-google-places-autocomplete");
const ngx_material_timepicker_1 = require("ngx-material-timepicker");
const angular_calendar_1 = require("angular-calendar");
const date_fns_1 = require("angular-calendar/date-adapters/date-fns");
const print_service_1 = require("./print.service");
const excel_service_1 = require("./excel.service");
const kendo_angular_treeview_1 = require("@progress/kendo-angular-treeview");
const notification_service_1 = require("../shared/notification.service");
const permission_service_1 = require("./permission.service");
const permissions_route_guard_1 = require("./permissions-route.guard");
const mention_1 = require("angular2-mentions/mention");
const max_min_directive_1 = require("./max-min.directive");
const custom_file_directive_1 = require("./custom-file.directive");
const special_character_directive_1 = require("./special-character.directive");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    core_1.NgModule({
        declarations: [
            header_component_1.HeaderComponent,
            sidenav_component_1.SidenavComponent,
            student_management_lookup_shared_component_1.StudentManagementLookUpSharedComponent,
            student_management_lookup_shared_component_1.StudentManagementLookUpSharedListComponent,
            theme_component_1.ThemeComponent,
            academic_management_shared_component_1.AcademicManagementSharedComponent,
            custom_file_directive_1.CustomFileDirective,
            whitespace_directive_1.NoWhitespaceDirective,
            max_min_directive_1.MinDirective,
            max_min_directive_1.MaxDirective,
            special_character_directive_1.SpecialCharacterDirective
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            animations_1.BrowserAnimationsModule,
            material_1.MatExpansionModule,
            material_1.MatTabsModule,
            material_1.MatSlideToggleModule,
            material_1.MatAutocompleteModule,
            material_1.MatSnackBarModule,
            material_1.MatCheckboxModule,
            material_1.MatDatepickerModule,
            material_1.MatNativeDateModule,
            material_1.MatSelectModule,
            material_1.MatInputModule,
            material_1.MatButtonModule,
            router_1.RouterModule,
            http_1.HttpClientModule,
            core_2.TranslateModule.forRoot({
                loader: {
                    provide: core_2.TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [http_1.HttpClient]
                }
            }),
            paginator_1.MatPaginatorModule,
            table_1.MatTableModule,
            icon_1.MatIconModule,
            tree_1.MatTreeModule,
            tooltip_1.MatTooltipModule,
            material_1.MatStepperModule,
            material_1.MatCardModule,
            ng2_dragula_1.DragulaModule.forRoot(),
            material_1.MatListModule,
            ng2_charts_1.ChartsModule,
            core_3.AgmCoreModule.forRoot({ apiKey: 'AIzaSyB_oQm9oRpoPDV2bPgjDsJii9hn8_9J4U8', libraries: ["places"] }),
            ngx_google_places_autocomplete_1.GooglePlaceModule,
            ngx_material_timepicker_1.NgxMaterialTimepickerModule,
            angular_calendar_1.CalendarModule.forRoot({
                provide: angular_calendar_1.DateAdapter,
                useFactory: date_fns_1.adapterFactory
            }),
            kendo_angular_treeview_1.TreeViewModule,
            mention_1.MentionModule,
            material_1.MatChipsModule
        ],
        exports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            material_1.MatExpansionModule,
            material_1.MatTabsModule,
            material_1.MatSlideToggleModule,
            material_1.MatAutocompleteModule,
            material_1.MatSnackBarModule,
            material_1.MatCheckboxModule,
            material_1.MatDatepickerModule,
            material_1.MatNativeDateModule,
            material_1.MatSelectModule,
            material_1.MatInputModule,
            material_1.MatButtonModule,
            icon_1.MatIconModule,
            tree_1.MatTreeModule,
            tooltip_1.MatTooltipModule,
            router_1.RouterModule,
            header_component_1.HeaderComponent,
            sidenav_component_1.SidenavComponent,
            core_2.TranslateModule,
            material_1.MatStepperModule,
            material_1.MatCardModule,
            student_management_lookup_shared_component_1.StudentManagementLookUpSharedComponent,
            student_management_lookup_shared_component_1.StudentManagementLookUpSharedListComponent,
            ng2_dragula_1.DragulaModule,
            material_1.MatListModule,
            theme_component_1.ThemeComponent,
            academic_management_shared_component_1.AcademicManagementSharedComponent,
            whitespace_directive_1.NoWhitespaceDirective,
            custom_file_directive_1.CustomFileDirective,
            ng2_charts_1.ChartsModule,
            core_3.AgmCoreModule,
            ngx_google_places_autocomplete_1.GooglePlaceModule,
            ngx_material_timepicker_1.NgxMaterialTimepickerModule,
            angular_calendar_1.CalendarModule,
            kendo_angular_treeview_1.TreeViewModule,
            mention_1.MentionModule,
            max_min_directive_1.MinDirective,
            max_min_directive_1.MaxDirective,
            special_character_directive_1.SpecialCharacterDirective,
            material_1.MatChipsModule
        ],
        providers: [
            loader_service_1.LoaderService,
            page_title_1.PageTitleService,
            snackbar_service_1.SnackbarService,
            sidenav_service_1.SidenavService,
            shared_service_1.SharedService,
            print_service_1.PrintService,
            excel_service_1.ExcelService,
            notification_service_1.NotificationManagementService,
            permission_service_1.PermissionService,
            permissions_route_guard_1.PermissionAuthGuard
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;
// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
function createTranslateLoader(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.createTranslateLoader = createTranslateLoader;
//# sourceMappingURL=shared.module.js.map