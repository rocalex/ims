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
let PrintService = class PrintService {
    constructor() { }
    print(htmlElementId) {
        let printContents, popupWin;
        printContents = document.getElementById(htmlElementId).innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`<html> 
            <head>
                <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'></link>
            </head> 
            <body onload="window.print();window.close()">${printContents}</body> 
            </html>`);
        popupWin.document.close();
    }
    download(htmlElementId) {
        let printContents, popupWin;
        printContents = document.getElementById(htmlElementId).innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`<html> 
            <head>
                <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'></link>
            </head> 
            <body onload="window.open();window.close()">${printContents}</body> 
            </html>`);
        popupWin.document.close();
    }
};
PrintService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], PrintService);
exports.PrintService = PrintService;
//# sourceMappingURL=print.service.js.map