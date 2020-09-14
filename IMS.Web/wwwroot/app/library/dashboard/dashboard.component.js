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
let DashboardComponent = class DashboardComponent {
    constructor() {
        this.totalBooks = 0;
        this.issuedBooks = 0;
        this.latefee = 0;
        this.examPaper = 0;
        this.listUrl = 'list';
        // Bar chart
        // Common settings
        this.barChartType = 'bar';
        this.barChartLegend = false;
        this.barChartOptions = {
            responsive: true,
            scales: {
                xAxes: [{}], yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                }
            }
        };
        this.InstituteWiseChartData = [{
                data: [], label: ''
            }];
        this.InstituteWiseChartLabels = [];
        this.InstituteWiseChartColor = [{
                backgroundColor: []
            }];
        this.ActiveChartData = [{
                data: [], label: ''
            }];
        this.ActiveChartLabels = [];
        this.ActiveChartColor = [{
                backgroundColor: []
            }];
        // Donut chart
        this.donutChartType = 'doughnut';
        this.donutChartColor = [{
                backgroundColor: []
            }];
        this.donutChartOptions = {
            responsive: true,
            legend: {
                position: 'top',
            },
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        const label = ctx.chart.data.labels[ctx.dataIndex];
                        return label;
                    },
                },
            }
        };
        this.StudentWiseChartLabels = [];
        this.StudentWiseChartData = [];
        this.GenderWiseChartLabels = [];
        this.GenderWiseChartData = [];
    }
    ngOnInit() {
    }
};
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    }),
    __metadata("design:paramtypes", [])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map