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
let SpecialCharacterDirective = class SpecialCharacterDirective {
    constructor(el) {
        this.el = el;
        this.regexStr = '^[a-zA-Z0-9_]*$';
    }
    onKeyPress(event) {
        return new RegExp(this.regexStr).test(event.key);
    }
    blockPaste(event) {
        this.validateFields(event);
    }
    validateFields(event) {
        setTimeout(() => {
            this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '').replace(/\s/g, '');
            event.preventDefault();
        }, 100);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SpecialCharacterDirective.prototype, "isAlphaNumeric", void 0);
__decorate([
    core_1.HostListener('keypress', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SpecialCharacterDirective.prototype, "onKeyPress", null);
__decorate([
    core_1.HostListener('paste', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [KeyboardEvent]),
    __metadata("design:returntype", void 0)
], SpecialCharacterDirective.prototype, "blockPaste", null);
SpecialCharacterDirective = __decorate([
    core_1.Directive({
        selector: '[specialIsAlphaNumeric]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], SpecialCharacterDirective);
exports.SpecialCharacterDirective = SpecialCharacterDirective;
//# sourceMappingURL=special-character.directive.js.map