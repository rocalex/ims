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
let CustomFileDirective = class CustomFileDirective {
    constructor(element) {
        this.element = element;
    }
    ngOnInit() {
        this.el = this.element.nativeElement;
        this.customFilelabel = this.el.parentNode.querySelector('.custom-file-label');
        this.defaultText = this.getDefaultText();
    }
    ngOnDestroy() {
        this.resetDefaultText();
    }
    _onInputChange(event) {
        console.log(event);
        if (this.customFilelabel) {
            let inputValue = this.getSelectedFiles(event.target);
            if (inputValue.length) {
                this.customFilelabel.innerHTML = inputValue;
            }
            else {
                this.resetDefaultText();
            }
        }
    }
    getDefaultText() {
        if (this.customFilelabel) {
            return this.customFilelabel.innerHTML;
        }
        return '';
    }
    resetDefaultText() {
        if (this.customFilelabel) {
            this.customFilelabel.innerHTML = this.defaultText;
        }
    }
    getSelectedFiles(input) {
        if (input.hasAttribute('multiple')) { /* && !!window.File*/
            return [].slice.call(input.files).map((file) => {
                return file.name;
            }).join(', ');
        }
        if (input.value.indexOf('fakepath') !== -1) {
            let splittedValue = input.value.split('\\');
            return splittedValue[splittedValue.length - 1];
        }
        return input.value;
    }
};
CustomFileDirective = __decorate([
    core_1.Directive({
        selector: '[type="file"]',
        host: {
            '(change)': '_onInputChange($event)',
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], CustomFileDirective);
exports.CustomFileDirective = CustomFileDirective;
//# sourceMappingURL=custom-file.directive.js.map