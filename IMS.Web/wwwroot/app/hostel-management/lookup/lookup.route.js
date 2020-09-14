"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const lookup_component_1 = require("./lookup.component");
const list_component_1 = require("./roomtype/list/list.component");
const add_component_1 = require("./roomtype/add/add.component");
const edit_component_1 = require("./roomtype/edit/edit.component");
const add_component_2 = require("./bedstatus/add/add.component");
const list_component_2 = require("./bedstatus/list/list.component");
const edit_component_2 = require("./bedstatus/edit/edit.component");
const lookupRoutes = [
    {
        path: 'hostel/lookup', component: lookup_component_1.LookupComponent,
        children: [
            {
                path: 'roomtype',
                children: [
                    { path: '', component: list_component_1.RoomTypeListComponent },
                    { path: 'add', component: add_component_1.RoomTypeAddComponent },
                    { path: ':id', component: edit_component_1.RoomTypeEditComponent }
                ]
            },
            {
                path: 'bedstatus',
                children: [
                    { path: '', component: list_component_2.BedStatusListComponent },
                    { path: 'add', component: add_component_2.BedStatusAddComponent },
                    { path: ':id', component: edit_component_2.BedStatusEditComponent }
                ]
            }
        ]
    },
];
exports.LookupRouting = router_1.RouterModule.forRoot(lookupRoutes);
//# sourceMappingURL=lookup.route.js.map