"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const app_superadmin_module_1 = require("./app-superadmin.module");
const environment_1 = require("../environments/environment");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_superadmin_module_1.SuperAdminAppModule)
    .catch(err => console.log(err));
//# sourceMappingURL=superadmin.main.js.map