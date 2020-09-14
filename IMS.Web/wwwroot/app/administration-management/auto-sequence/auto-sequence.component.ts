import { Component, OnInit } from '@angular/core';
import { AutoSequenceManagementService } from './auto-sequence.service';
import { LoaderService } from '../../../shared/loader-service';
import { SnackbarService } from '../../../shared/snackbar-service';
import { UpdateAutoSequenceGeneratorManagementAc, AutoSequenceGeneratorDataType } from './auto-sequence.model';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
    moduleId: module.id,
    templateUrl: 'auto-sequence.html'
})
export class AutoSequenceManagementComponent implements OnInit {
    selectors: string[] = ['Roll Number', 'Employee Id', 'Refund Number', 'Receipt Number', 'Chart of Accounts Code'];
    autoSequence: UpdateAutoSequenceGeneratorManagementAc = new UpdateAutoSequenceGeneratorManagementAc();
    selectedType: string;
    seperators: string[] = ['@', '/', '_', '-'];
    available: any[] = [];
    selected: any[] = [];
    selectedToEdit: any = {};
    demoString: string = '';
    subs = new Subscription();
    constructor(private autoSequenceManagementService: AutoSequenceManagementService, private loaderService: LoaderService,
        private snackBar: SnackbarService, private dragulaService: DragulaService) {
        this.subs.add(this.dragulaService.drop("DRAGULA_FACTS")
            .subscribe((res) => {
                this.generateDemoString();
            })
        );
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
        })
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
        })
    }

    selectFromList(event: any) {
        var index = this.available.findIndex(x => x.id === event.id);
        this.selected.push(event);
        this.available.splice(index, 1);
        this.generateDemoString();
    }

    discardFromList(event: any) {
        var index = this.selected.findIndex(x => x.id === event.id);
        this.available.push(event);
        this.selected.splice(index, 1);
        this.generateDemoString();
    }

    assignDataToList(autoSequenceGeneratorDataTypes: any[]) {
        for (var i = 0; i < autoSequenceGeneratorDataTypes.length; i++) {
            var data = autoSequenceGeneratorDataTypes[i];
            if (data.isSelected) {
                this.selected.push(data);
            } else {
                this.available.push(data);
            }
        }
    }

    selectedToEditData(item) {
        this.selectedToEdit = item;
    }

    getDayName(input: number) {
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
                } else if (data.name === 'Day') {
                    this.demoString += this.getDayName((new Date()).getDay());
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                } else if (data.name === 'Month') {
                    this.demoString += (new Date()).getMonth();
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                } else if (data.name === 'Year') {
                    this.demoString += (new Date()).getFullYear();
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                } else if (data.name === 'Date') {
                    this.demoString += (new Date()).getDate();
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                } else if (data.name === 'Text') {
                    this.demoString += (this.autoSequence.CustomText).substring(0, data.length);
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                } else if (data.name === 'Sequence Number') {
                    this.demoString += ('00001').substring(0, data.length);
                    if ((this.selected.length - 1) !== i) {
                        this.demoString += this.autoSequence.SeperatorDescription;
                    }
                }
            }
        }, 0);
    }
}
