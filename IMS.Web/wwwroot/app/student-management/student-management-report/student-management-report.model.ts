export class ReportAc {
  Name: string;
  Url?: string;
  Type: string;
  Order: number;
}

export function getStudentList(): ReportAc[] {
  var list: ReportAc[] = [
    { Name: 'List Of Student', Type: 'Report', Order: 1 },
    { Name: 'Class Wise Student', Type: 'Report', Order: 2 },
    { Name: 'Religion Wise Student', Type: 'Report', Order: 3 },
    { Name: 'Gender Wise Student', Type: 'Report', Order: 4 },
    { Name: 'Student Attendance', Type: 'Report', Order: 5 },
    { Name: 'Consolidated Attendance', Type: 'Report', Order: 6 },
    { Name: 'Notice/Homework/Dairy', Type: 'Report', Order: 7 },
    { Name: 'Student Result', Type: 'Report', Order: 8 }
  ];
  return list;
}

export function getStudentChartList(): ReportAc[] {
  var list: ReportAc[] = [
    { Name: 'List Of Student', Type: 'Chart', Order: 1 },
    { Name: 'Class Wise Student', Type: 'Chart', Order: 2 },
    { Name: 'Religion Wise Student', Type: 'Chart', Order: 3 },
    //{ Name: 'Student Attendance', Type: 'Chart', Order: 4 }
  ];
  return list;
}