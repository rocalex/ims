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
const router_1 = require("@angular/router");
const loader_service_1 = require("../../../shared/loader-service");
let HostelManagementDashboardComponent = class HostelManagementDashboardComponent {
    constructor(loaderService, router) {
        this.loaderService = loaderService;
        this.router = router;
        this.totalHostelCount = 0;
        this.assignStudentCount = 0;
        this.inactiveHostelCount = 0;
        this.listUrl = 'list';
        // Donut chart
        this.donutChartLabels = [];
        this.donutChartData = [];
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
        // Hostel wise
        this.hostelWiseBarChartLabels = [];
        this.hostelWiseBarChartColor = [{
                backgroundColor: []
            }];
        this.hostelWiseBarChartData = [{
                data: [], label: ''
            }];
    }
    ngOnInit() {
    }
    getHostelDashboardData() {
        this.loaderService.toggleLoader(true);
    }
    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    handleEvent(action, event) {
        if (event.type === 'activity') {
            this.router.navigate(['staff', 'activities', event.type, event.id]);
        }
        else if (event.type === 'planner') {
            this.router.navigate(['staff', event.type, event.id]);
        }
    }
};
HostelManagementDashboardComponent = __decorate([
    core_1.Component({
        selector: 'app-hostel-management-dashboard',
        templateUrl: './hostel-management-dashboard.component.html',
        styleUrls: ['./hostel-management-dashboard.component.css']
    }),
    __metadata("design:paramtypes", [loader_service_1.LoaderService,
        router_1.Router])
], HostelManagementDashboardComponent);
exports.HostelManagementDashboardComponent = HostelManagementDashboardComponent;
//# sourceMappingURL=hostel-management-dashboard.component.js.map