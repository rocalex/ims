"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const homework_component_1 = require("./homework.component");
const homeworkRoutes = [
    { path: 'homework', component: homework_component_1.HomeworkComponent },
];
exports.HomeworkRoutes = router_1.RouterModule.forRoot(homeworkRoutes);
//# sourceMappingURL=homework.route.js.map