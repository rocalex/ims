import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  private academicYearSource = new BehaviorSubject(null);
  public currentAcademicYear = this.academicYearSource.asObservable();

  private currentUserNameSource = new BehaviorSubject('');
  public currentUserName = this.currentUserNameSource.asObservable();

  private permissionSource = new BehaviorSubject([]);
  public permission = this.permissionSource.asObservable();

  constructor() { }

  changeAcademicYear(academicYear: any) {
    this.academicYearSource.next(academicYear);
  }

  setCurrentUserName(userName: string) {
    this.currentUserNameSource.next(userName);
  }

  setPermission(permission: any[]) {
    this.permissionSource.next(permission);
  }
}