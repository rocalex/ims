"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NoWhitespaceDirective_1;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
/**
 * This validator works like "required" but it does not allow whitespace either
 *
 * @export
 * @class NoWhitespaceDirective
 * @implements {Validator}
 */
let NoWhitespaceDirective = NoWhitespaceDirective_1 = class NoWhitespaceDirective {
    constructor() {
        this.valFn = NoWhitespaceValidator();
    }
    validate(control) {
        return this.valFn(control);
    }
};
NoWhitespaceDirective = NoWhitespaceDirective_1 = __decorate([
    core_1.Directive({
        selector: '[NoSpaces]',
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: NoWhitespaceDirective_1, multi: true }]
    })
], NoWhitespaceDirective);
exports.NoWhitespaceDirective = NoWhitespaceDirective;
function NoWhitespaceValidator() {
    return (control) => {
        // messy but you get the idea
        let isWhitespace = (control.value || '').trim().length === 0;
        let isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': 'value is only whitespace' };
    };
}
//# sourceMappingURL=whitespace.directive.js.map