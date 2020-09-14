export class ReportAc {
  Name: string;
  Url?: string;
  Type: string;
  Order: number;
}

export function getStaffList(): ReportAc[] {
  var list: ReportAc[] = [
    { Name: 'List Of Staff', Type: 'Report', Order: 1 },
    { Name: 'Class Wise Staff', Type: 'Report', Order: 2 },
    { Name: 'Religion Wise Staff', Type: 'Report', Order: 3 },
    //{ Name: 'Staff TimeTable', Type: 'Report', Order: 4 },
    { Name: 'Staff Attendance', Type: 'Report', Order: 5 },
    { Name: 'Consolidated Attendance', Type: 'Report', Order: 6 },
    { Name: 'Notice/Homework/Dairy', Type: 'Report', Order: 7 }
  ];
  return list;
}

export function getStaffChartList(): ReportAc[] {
  var list: ReportAc[] = [
    { Name: 'List Of Staff', Type: 'Report', Order: 1 },
    { Name: 'Class Wise Staff', Type: 'Report', Order: 2 },
    { Name: 'Religion Wise Staff', Type: 'Report', Order: 3 },
    { Name: 'Subject Wise Staff', Type: 'Report', Order: 4 },
    //{ Name: 'Staff Attendance', Type: 'Report', Order: 5 },
    { Name: 'Teaching Type Staff', Type: 'Report', Order: 6 }
  ];
  return list;
}