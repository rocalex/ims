import { Injectable } from "@angular/core";

@Injectable()
export class PrintService {

  constructor() { }

  print(htmlElementId: string) {
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

  download(htmlElementId: string) {
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
}