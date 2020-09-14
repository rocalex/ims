import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpService } from '../core/http.service';
import { Observable } from 'rxjs';
import { UserGroupFeatureParentEnum, UserGroupFeatureChildEnum } from './sidenav/sidenav.model';

@Injectable()
export class PermissionAuthGuard implements CanActivate {
  constructor(private httpService: HttpService) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var parent = next.data.parent as UserGroupFeatureParentEnum;
    var child = next.data.child as UserGroupFeatureChildEnum;
    var type = next.data.type as string;
    return this.isAllowedToUse(parent, child, type).then(res => {
      return res.json();
    })
  }

  isAllowedToUse(parent: UserGroupFeatureParentEnum, child: UserGroupFeatureChildEnum, type: string) {
    return this.httpService.get('api/home/permission' + '/' + parent + '/' + child + '/' + type);
  }
}