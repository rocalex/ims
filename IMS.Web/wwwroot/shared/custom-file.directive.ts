import { Directive, OnInit, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[type="file"]',
  host: {
    '(change)': '_onInputChange($event)',
  }
})
export class CustomFileDirective implements OnInit, OnDestroy {
  private el;
  private customFilelabel;
  private defaultText: string;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.el = this.element.nativeElement;
    this.customFilelabel = this.el.parentNode.querySelector('.custom-file-label');
    this.defaultText = this.getDefaultText();
  }

  ngOnDestroy() {
    this.resetDefaultText();
  }

  _onInputChange(event: Event) {
    console.log(event);
    if (this.customFilelabel) {
      let inputValue = this.getSelectedFiles(event.target);

      if (inputValue.length) {
        this.customFilelabel.innerHTML = inputValue;
      } else {
        this.resetDefaultText();
      }
    }
  }

  private getDefaultText() {
    if (this.customFilelabel) {
      return this.customFilelabel.innerHTML;
    }
    return '';
  }

  private resetDefaultText() {
    if (this.customFilelabel) {
      this.customFilelabel.innerHTML = this.defaultText;
    }
  }

  private getSelectedFiles(input) {
    if (input.hasAttribute('multiple')) {/* && !!window.File*/
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
}
