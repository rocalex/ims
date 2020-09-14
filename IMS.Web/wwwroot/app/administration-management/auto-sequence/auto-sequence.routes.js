"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const auto_sequence_component_1 = require("./auto-sequence.component");
const autoSequenceManagementRoutes = [
    {
        path: 'administration/autosequence',
        children: [
            { path: '', component: auto_sequence_component_1.AutoSequenceManagementComponent }
        ]
    },
];
exports.AutoSequenceManagementRouting = router_1.RouterModule.forRoot(autoSequenceManagementRoutes);
//# sourceMappingURL=auto-sequence.routes.js.map