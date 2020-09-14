export class RouteManagementResponse {
  Message: string;
  HasError: boolean;
  ErrorType: RouteManagementResponseType
}

export enum RouteManagementResponseType {
  Name,
  Code,
  Id
}

export class RouteStageMappingAc {
  FromPlaceId: number;
  ToPlaceId: number;
  Distance: number;
  DemoId: number;
}

export class AddRouteManagementAc {
  constructor() {
    this.RouteStageMappings = [];
  }
  Code: string;
  Name: string;
  StartDate: Date;
  RouteStageMappings: RouteStageMappingAc[];
}

export class UpdateRouteManagementAc {
  constructor() {
    this.RouteStageMappings = [];
  }
  Id: number;
  Code: string;
  Name: string;
  StartDate: Date;
  RouteStageMappings: RouteStageMappingAc[];
}