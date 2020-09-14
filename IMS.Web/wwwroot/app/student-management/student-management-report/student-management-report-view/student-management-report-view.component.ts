import { Component, OnInit } from '@angular/core';
import * as StudentManagementReport from '../student-management-report.model';
import { StudentManagementReportService } from '../student-management-report.service';
import { LoaderService } from '../../../../shared/loader-service';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '../../../../shared/snackbar-service';
import { ExcelAc, ExcelService } from '../../../../shared/excel.service';

@Component({
  moduleId: module.id,
  templateUrl: 'student-management-report-view.html'
})
export class StudentManagementReportViewComponent implements OnInit {
  reports: StudentManagementReport.ReportAc[] = StudentManagementReport.getStudentList();
  selectedOrder: number;
  initialData: any = {};
  academicYearFilterId: number;
  students: any[] = [];
  classWiseStudent: any[] = [];
  classFilterId: number;
  sectionFilterId: number;
  religionFilterId: number;
  genderFilterId: number;
  attendanceTypes: string[] = ['None', 'Present', 'Absent', 'Leave', 'Half Leave'];
  attendanceTypeSelect: string = this.attendanceTypes[0];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  staffIdFilter: number;
  staffs: any[] = [];
  examIdFilter: number;
  selectedMonth: string;
  allowedMonths: string[] = [];
  constructor(private studentManagementReportService: StudentManagementReportService, private loaderService: LoaderService,
    private router: Router, private activeRoute: ActivatedRoute, private snackBar: SnackbarService,
    private excelService: ExcelService) {
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(res => this.selectedOrder = +res.id);
    this.getInitialDataForReports();
  }

  getInitialDataForReports() {
    this.loaderService.toggleLoader(true);
    this.studentManagementReportService.getInitialDataForReports().then(res => {
      this.initialData = res.json();
      this.students = this.initialData.students;
      if (this.initialData.academicYears.length) {
        var data = this.initialData.academicYears.find(x => x.isActive === true);
        if (data) {
          this.academicYearFilterId = data.id;
        }
      }
      this.filterData();
      this.loaderService.toggleLoader(false);
    });
  }

  filterData() {
    var list = JSON.parse(JSON.stringify(this.students));
    if (this.classFilterId) {
      list = list.filter(x => x.currentClassId === this.classFilterId);
    }
    if (this.sectionFilterId) {
      list = list.filter(x => x.sectionId === this.sectionFilterId);
    }
    this.classWiseStudent = [];
    switch (this.selectedOrder) {
      case 1: {
        var activeStudent = list.filter(x => x.isActive === true);
        var inActiveStudent = list.filter(x => x.isActive === false);
        this.classWiseStudent.push({ name: 'Active Student', students: activeStudent });
        this.classWiseStudent.push({ name: 'In Active Student', students: inActiveStudent });
      } break;
      case 2: {
        var classes = JSON.parse(JSON.stringify(this.initialData.classes));
        if (this.classFilterId) {
          classes = this.initialData.classes.filter(x => x.id === this.classFilterId);
        }
        for (var i = 0; i < classes.length; i++) {
          var classData = classes[i];
          var studentData = list.filter(x => x.currentClassId === classData.id);
          this.classWiseStudent.push({ name: classData.name, students: studentData });
        }
      } break;
      case 3: {
        var religions = JSON.parse(JSON.stringify(this.initialData.religions));
        if (this.religionFilterId) {
          religions = this.initialData.religions.filter(x => x.id === this.religionFilterId);
        }
        for (var i = 0; i < religions.length; i++) {
          var religion = religions[i];
          var studentData = list.filter(x => x.religionId === religion.id);
          this.classWiseStudent.push({ name: religion.name, students: studentData });
        }
      } break;
      case 4: {
        var genders = JSON.parse(JSON.stringify(this.initialData.genders));
        if (this.genderFilterId) {
          genders = this.initialData.genders.filter(x => x.id === this.genderFilterId);
        }
        for (var i = 0; i < genders.length; i++) {
          var gender = genders[i];
          var studentData = list.filter(x => x.genderId === gender.id);
          this.classWiseStudent.push({ name: gender.name, students: studentData });
        }
      } break;
      case 5: {
        var attendances = this.initialData.attendances;
        if (this.attendanceTypeSelect) {
          attendances = attendances.filter(x => x.attendanceTypeDescription === this.attendanceTypeSelect);
        }
        for (var i = 0; i < attendances.length; i++) {
          attendances[i].attendanceDate = new Date(attendances[i].attendanceDate);
          attendances[i].month = attendances[i].attendanceDate.getMonth();
        }
        for (var monthIndex = 0; monthIndex < this.monthNames.length; monthIndex++) {
          var month = this.monthNames[monthIndex];
          var studentAttendanceDatas: any[] = [];
          var attendancesForFilter = attendances.filter(x => x.month === monthIndex);
          for (var j = 0; j < list.length; j++) {
            var studentData = list[j];
            var studentAttendance = attendancesForFilter.filter(x => x.studentId === studentData.id);
            studentAttendanceDatas.push({
              firstName: studentData.firstName, lastName: studentData.lastName, rollNumber: studentData.rollNumber,
              personalImage: studentData.personalImage, attendances: studentAttendance, currentClass: studentData.currentClass,
              gender: studentData.gender, admissionDate: studentData.admissionDate, dateOfBirth: studentData.dateOfBirth,
              mobileNumber: studentData.mobileNumber, religion: studentData.religion
            });
          }
          this.classWiseStudent.push({ name: month, students: studentAttendanceDatas });
        }
      } break;
      case 6: {
        this.monthsAllowed();
        for (var i = 0; i < this.initialData.attendances.length; i++) {
          this.initialData.attendances[i].attendanceDate = new Date(this.initialData.attendances[i].attendanceDate);
        }
        var classes = JSON.parse(JSON.stringify(this.initialData.classes));
        if (this.classFilterId) {
          classes = this.initialData.classes.filter(x => x.id === this.classFilterId);
        }
        var months = this.monthNames;
        if (this.selectedMonth) {
          months = months.filter(x => x === this.selectedMonth);
        }
        for (var i = 0; i < classes.length; i++) {
          var classData = classes[i];
          var studentData = list.filter(x => x.currentClassId === classData.id);
          var listToBind: any[] = [];
          for (var studentIndex = 0; studentIndex < studentData.length; studentIndex++) {
            var stud = studentData[studentIndex];
            var studentAttendanceData = {
              firstName: stud.firstName, lastName: stud.lastName, rollNumber: stud.rollNumber,
              personalImage: stud.personalImage, attendances: []
            }
            for (var monthIndex = 0; monthIndex < months.length; monthIndex++) {
              var monthCode = this.monthNames.findIndex(x => x === months[monthIndex]);
              var attendance = this.initialData.attendances.filter(x => x.studentId === stud.id && x.attendanceDate.getMonth() === monthCode
                && x.attendanceTypeDescription === 'Present' && x.periodOrderId === 0);
              var allowedDate = this.initialData.allowedDates.find(x => x.monthName === months[monthIndex]);
              studentAttendanceData.attendances.push({
                name: allowedDate.monthName, total: allowedDate.numberOfDays, present: attendance.length,
                percentage: ((attendance.length / allowedDate.numberOfDays) * 100)
              })
            }
            listToBind.push(studentAttendanceData);
          }
          this.classWiseStudent.push({ name: classData.name, students: listToBind });
        }
        console.log(this.classWiseStudent);
      } break;
      case 7: {
        if (this.staffIdFilter) {
          this.loaderService.toggleLoader(true);
          this.studentManagementReportService.getHomework(this.staffIdFilter, this.classFilterId, this.sectionFilterId).then(res => {
            var response = res.json();
            var homeworkList: any[] = [];
            for (var i = 0; i < response.length; i++) {
              var homeworkData = response[i];
              var dataToDisplay = { date: homeworkData.homeworkDate, byStaff: homeworkData.staff, message: [] }
              var message = [];
              for (var j = 0; j < homeworkData.homeworkMessageMappings.length; j++) {
                var homeworkMessage = homeworkData.homeworkMessageMappings[j];
                message.push({
                  message: homeworkMessage.message,
                  students: homeworkMessage.studentRecieveHomeworkMessageMappings.map(x => x.studentId)
                });
              }
              dataToDisplay.message = message;
              homeworkList.push(dataToDisplay);
            }
            this.classWiseStudent.push({ name: 'Homework', homeworks: homeworkList });
            var noticeList = [];
            for (var noticeIndex = 0; noticeIndex < this.initialData.notices.length; noticeIndex++) {
              var notice = this.initialData.notices[noticeIndex];
              var dataToDisplay = { date: notice.noticeDate, byStaff: notice.createdBy, message: [] }
              var message = [];
              message.push({
                message: notice.message,
                students: notice.circularNoticeRecipients.map(x => x.recipient)
              });
              dataToDisplay.message = message;
              noticeList.push(dataToDisplay);
            }
            this.classWiseStudent.push({ name: 'Notice', homeworks: noticeList });
            this.loaderService.toggleLoader(false);
          });
        }
      } break;
      case 8: {
        if (this.examIdFilter) {
          var classes = JSON.parse(JSON.stringify(this.initialData.classes));
          if (this.classFilterId) {
            classes = this.initialData.classes.filter(x => x.id === this.classFilterId);
          }
          if (this.sectionFilterId) {
            list = list.filter(x => x.sectionId === this.sectionFilterId);
          }
          for (var i = 0; i < classes.length; i++) {
            var classData = classes[i];
            var studentData = list.filter(x => x.currentClassId === classData.id);
            for (var studentIndex = 0; studentIndex < studentData.length; studentIndex++) {
              var stud = studentData[studentIndex];
              var score = this.initialData.examScores.filter(x => x.examId === this.examIdFilter && x.studentId === stud.id);
              var marks = score.map(x => x.mark);
              var total = 0;
              for (var markIndex = 0; markIndex < marks.length; markIndex++) {
                total += marks[markIndex];
              }
              stud.mark = total;
              stud.grade = this.getGrade((total / marks.length));
              stud.sgpa = this.getGrade((total / marks.length));
            }
            this.classWiseStudent.push({ name: classData.name, students: studentData });
          }
        }
      } break;
      default: {
        this.snackBar.showSnackbar('Report is under construction');
        this.router.navigate(['student', 'report', 'list']);
      } break;
    }
  }

  reset(filter) {
    if (filter === 'Class') {
      this.classFilterId = undefined;
    } else if (filter === 'Section') {
      this.sectionFilterId = undefined;
    } else if (filter === 'Religion') {
      this.religionFilterId = undefined;
    } else if (filter === 'Gender') {
      this.genderFilterId = undefined;
    } else if (filter === 'AttendanceType') {
      this.attendanceTypeSelect = this.attendanceTypes[0];
    } else if (filter === 'Exam') {
      this.examIdFilter = undefined;
    } else if (filter === 'Month') {
      this.selectedMonth = undefined;
    }
    this.filterData();
  }

  exportExcel() {
    var data: ExcelAc[] = [
    ];
    for (var i = 0; i < this.classWiseStudent.length; i++) {
      var json: any[] = [];
      var parent = this.classWiseStudent[i];
      for (var j = 0; j < parent.students.length; j++) {
        var student = parent.students[j];
        if (this.selectedOrder === 5) {
          var dates = student.attendances.map(x => x.attendanceDate);
          var dateData: string = '';
          for (var dateIndex = 0; dateIndex < dates.length; dateIndex++) {
            dateData += dates[dateIndex].toDateString();
            if ((dates.length - 1) !== dateIndex) {
              dateData += ','
            }
          }
          json.push({
            RollNumber: student.rollNumber, Name: student.firstName + ' ' + student.lastName,
            Class: student.currentClass.name, Religion: (student.religion) ? student.religion.name : '',
            Gender: student.gender.name, AdmissionDate: student.admissionDate, DateOfBirth: student.dateOfBirth,
            MobileNumber: student.mobileNumber, Dates: dateData
          });
        } else if (this.selectedOrder === 8) {
          json.push({
            RollNumber: student.rollNumber, Name: student.firstName + ' ' + student.lastName,
            Class: student.currentClass.name, Religion: (student.religion) ? student.religion.name : '',
            Gender: student.gender.name, AdmissionDate: student.admissionDate, DateOfBirth: student.dateOfBirth,
            MobileNumber: student.mobileNumber, Mark: student.mark, Grade: student.grade, SGPA: student.sgpa
          });
        } else {
          json.push({
            RollNumber: student.rollNumber, Name: student.firstName + ' ' + student.lastName,
            Class: student.currentClass.name, Religion: (student.religion) ? student.religion.name : '',
            Gender: student.gender.name, AdmissionDate: student.admissionDate, DateOfBirth: student.dateOfBirth,
            MobileNumber: student.mobileNumber
          });
        }
      }
      data.push({ SheetName: parent.name, Data: json });
    }
    this.excelService.exportAsExcelFile(data);
  }

  isStaffIsAllowed(staffId: number) {
    if (this.classFilterId) {
      var staffAllowed = this.initialData.classSubjectMappings.filter(x => x.classId === this.classFilterId);
      var facultyIds = staffAllowed.map(x => x.facultyId);
      var alternateFacultyIds = staffAllowed.map(x => x.alternateFacultyId);
      var staffIds = [];
      for (var i = 0; i < facultyIds.length; i++) {
        staffIds.push(facultyIds[i]);
      }
      for (var i = 0; i < alternateFacultyIds.length; i++) {
        staffIds.push(alternateFacultyIds[i]);
      }
      var staff = staffIds.find(x => x === staffId);
      return (staff !== undefined);
    } else {
      return false;
    }
  }

  getStudent(id: number) {
    return this.students.find(x => x.id === id);
  }

  isExamIsAllowed(id: number) {
    var exam = this.initialData.classExams.find(x => x.classId === this.classFilterId && x.sectionId === this.sectionFilterId
      && x.examId === id);
    return (exam !== undefined);
  }

  getGrade(mark: number): string {
    var grades: any[] = [
      { name: 'F', minScore: 0, maxScore: 10 }, { name: 'D', minScore: 11, maxScore: 20 }, { name: 'C', minScore: 21, maxScore: 30 },
      { name: 'C+', minScore: 31, maxScore: 40 }, { name: 'B', minScore: 41, maxScore: 50 }, { name: 'B+', minScore: 51, maxScore: 60 },
      { name: 'B++', minScore: 61, maxScore: 70 }, { name: 'A', minScore: 71, maxScore: 80 }, { name: 'A+', minScore: 81, maxScore: 90 },
      { name: 'A++', minScore: 91, maxScore: 100 }
    ];
    mark = Math.ceil(mark);
    var grade = grades.find(x => x.minScore <= mark && x.maxScore >= mark);
    if (grade) {
      return grade.name;
    } else {
      return '';
    }
  }

  monthsAllowed() {
    this.allowedMonths = this.monthNames;
    if (this.selectedMonth) {
      this.allowedMonths = this.allowedMonths.filter(x => x === this.selectedMonth);
    }
  }

  getTotalClasses(attendances: any[]) {
    var total = 0;
    for (var i = 0; i < attendances.length; i++) {
      total += attendances[i].present;
    }
    return total;
  }

  getTotalClass() {
    var total = 0;
    for (var i = 0; i < this.initialData.allowedDates.length; i++) {
      var allowed = this.initialData.allowedDates[i];
      total += allowed.numberOfDays;
    }
    return total;
  }
}
