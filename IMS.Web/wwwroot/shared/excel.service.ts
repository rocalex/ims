import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(excelData: ExcelAc[]): void {
    var sheets: { [id: string]: XLSX.WorkSheet } = {};
    var sheetNames: string[] = [];
    for (var i = 0; i < excelData.length; i++) {
      var excel = excelData[i];
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excel.Data);
      sheets[excel.SheetName] = worksheet;
      sheetNames.push(excel.SheetName);
    }
    const workbook: XLSX.WorkBook = { Sheets: sheets , SheetNames: sheetNames };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer);
  }

  private saveAsExcelFile(buffer: any): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    const url = URL.createObjectURL(data);
    window.open(url);
  }
}

export class ExcelAc {
  SheetName: string;
  Data: any[];
}