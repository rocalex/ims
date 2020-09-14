"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const auto_sequence_service_1 = require("./auto-sequence.service");
const loader_service_1 = require("../../../shared/loader-service");
const snackbar_service_1 = require("../../../shared/snackbar-service");
const auto_sequence_model_1 = require("./auto-sequence.model");
const ng2_dragula_1 = require("ng2-dragula");
const rxjs_1 = require("rxjs");
let AutoSequenceManagementComponent = class AutoSequenceManagementComponent {
    constructor(autoSequenceManagementService, loaderService, snackBar, dragulaService) {
        this.autoSequenceManagementService = autoSequenceManagementService;
        this.loaderService = loaderService;
        this.snackBar = snackBar;
        this.dragulaService = dragulaService;
        this.selectors = ['Roll Number', 'Employee Id', 'Refund Number', 'Receipt Number', 'Chart of Accounts Code'];
        this.autoSequence = new auto_sequence_model_1.UpdateAutoSequenceGeneratorManagementAc();
        this.seperators = ['@', '/', '_', '-'];
        this.available = [];
        this.selected = [];
        this.selectedToEdit = {};
        this.demoString = '';
        this.subs = new rxjs_1.Subscription();
        this.subs.add(this.dragulaService.drop("DRAGULA_FACTS")
            .subscribe((res) => {
            this.generateDemoString();
        }));
    }
    ngOnInit() {
    }
    getSequenceGenerators() {
        this.loaderService.toggleLoader(true);
        this.autoSequenceManagementService.getSequenceGenerators(this.selectedType).then(res => {
            var response = res.json();
            this.autoSequence.Id = response.id;
            this.autoSequence.CustomText = response.customText;
            this.autoSequence.SeperatorDescription = response.seperatorDescription;
            this.available = [];
            this.selected = [];
            this.assignDataToList(response.autoSequenceGeneratorDataTypes);
            this.generateDemoString();
            this.loaderService.toggleLoader(false);
        });
    }
    updateAutoSequenceGenerator() {
        this.loaderService.toggleLoader(true);
        this.autoSequence.AutoSequenceGeneratorDataTypes = [];
        for (var i = 0; i < this.available.length; i++) {
            this.available[i].isSelected = false;
            this.available[i].orderId = i;
            this.autoSequence.AutoSequenceGeneratorDataTypes.push(this.available[i]);
        }
        for (var i = 0; i < this.selected.length; i++) {
            this.selected[i].isSelected = true;
            this.selected[i].orderId = i;
            this.autoSequence.AutoSequenceGeneratorDataTypes.push(this.selected[i]);
        }
        this.autoSequenceManagementService.updateAutoSequenceGenerator(this.autoSequence).then(res => {
            var response = res.json();
            if (response.hasError) {
                this.getSequenceGenerators();
            }
            this.snackBar.showSnackbar(response.message);
            this.loaderService.toggleLoader(false);
        });
    }
    selectFromList(event) {
        var index = this.available.findIndex(x => x.id === event.id);
        this.selected.push(event);
        this.available.splice(index, 1);
        this.generateDemoString();
    }
    discardFromList(event) {
        var index = this.selected.findIndex(x => x.id === event.id);
        this.available.push(event);
        this.selected.splice(index, 1);
        this.generateDemoString();
    }
    assignDataToList(autoSequenceGeneratorDataTypes) {
        for (var i = 0; i < autoSequenceGeneratorDataTypes.length; i++) {
            var data = autoSequenceGeneratorDataTypes[i];
            if (data.isSelected) {
                this.selected.push(data);
            }
            else {
                this.available.push(data);
            }
        }
    }
    selectedToEditData(item) {
        this.selectedToEdit = item;
    }
    getDayName(input) {
        var weekday = new Array(7);
        weekday[0] = "Monday";
        weekday[1] = "Tuesday";
        weekday[2] = "Wednesday";
        weekday[3] = "Thursday";
        weekday[4] = "Friday";
        weekday[5] = "Saturday";
        weekday[6] = "Sunday";
        return weekday[input];
    }
    generateDemoString() {
        var list = this.selected.slice();
        var sequenceNumberIndex = list.findIndex(x => x.name === 'Sequence Number');
        var sequenceNumber = list.splice(sequenceNumberIndex, 1);
        list.push(sequenceNumber[0]);
        this.selected = [];
        setTimeout(() => {
            this.selected = list.slice();
            this.demoString = '';
            for (var i = 0; i < this.selected.length; i++) {
                var data = this.selected[i];
                if (data.name === 'Institute') {
                    this.demoString += ('Insitute').substring(0, data.length);
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                }
                else if (data.name === 'Day') {
                    this.demoString += this.getDayName((new Date()).getDay());
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                }
                else if (data.name === 'Month') {
                    this.demoString += (new Date()).getMonth();
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                }
                else if (data.name === 'Year') {
                    this.demoString += (new Date()).getFullYear();
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                }
                else if (data.name === 'Date') {
                    this.demoString += (new Date()).getDate();
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                }
                else if (data.name === 'Text') {
                    this.demoString += (this.autoSequence.CustomText).substring(0, data.length);
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                }
                else if (data.name === 'Sequence Number') {
                    this.demoString += ('00001').substring(0, data.length);
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                }
            }
        }, 0);
    }
};
AutoSequenceManagementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'auto-sequence.html'
    }),
    __metadata("design:paramtypes", [auto_sequence_service_1.AutoSequenceManagementService, loader_service_1.LoaderService,
        snackbar_service_1.SnackbarService, ng2_dragula_1.DragulaService])
], AutoSequenceManagementComponent);
exports.AutoSequenceManagementComponent = AutoSequenceManagementComponent;
//# sourceMappingURL=auto-sequence.component.js.map